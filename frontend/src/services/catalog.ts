import { apiConfig } from "../config/api";
import { request } from "./api";

type JsonRecord = Record<string, unknown>;
const text = (data: JsonRecord, keys: string[]) =>
  keys
    .map((key) => data[key])
    .find(
      (value): value is string | number =>
        typeof value === "string" || typeof value === "number",
    )
    ?.toString() ?? "";
const list = (value: unknown) => {
  const arr = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value
          .split(/\n|,|;/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
  return Array.from(new Set(arr));
};
const collection = (payload: unknown, keys: string[]) => {
  if (Array.isArray(payload)) return payload as JsonRecord[];
  const record = payload as JsonRecord;
  return (keys.map((key) => record?.[key]).find(Array.isArray) ??
    []) as JsonRecord[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  workload: string;
  institution: string;
  category: string;
  image?: string;
  platformUrl?: string;
  raw: JsonRecord;
};
export type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  modality: string;
  salary?: string;
  requirements: string[];
  benefits: string[];
  whatsapp?: string;
  applicationUrl?: string;
  raw: JsonRecord;
};

export async function getCourses(): Promise<Course[]> {
  const payload = await request<unknown>(apiConfig.coursesUrl);
  return collection(payload, [
    "data",
    "cursos",
    "courses",
    "content",
    "results",
  ]).map((raw, index) => ({
    id: text(raw, ["id", "_id", "codigo"]) || String(index),
    title: text(raw, ["titulo", "title", "nome"]),
    description: text(raw, ["descricao", "description", "resumo"]),
    workload: text(raw, [
      "cargaHoraria",
      "carga_horaria",
      "duracao",
      "workload",
    ]),
    institution: text(raw, [
      "instituicao",
      "institution",
      "provedor",
      "provider",
    ]),
    category: text(raw, ["categoria", "category", "area"]),
    image: text(raw, ["imagem", "image", "imagemUrl", "imageUrl"]) || undefined,
    platformUrl:
      text(raw, ["link", "url", "platformUrl", "linkPlataforma"]) || undefined,
    raw,
  }));
}

export async function getJobs(): Promise<Job[]> {
  const payload = await request<unknown>(apiConfig.jobsUrl);
  const rawJobs = collection(payload, [
    "data",
    "vagas",
    "jobs",
    "content",
    "results",
  ]).map((raw, index) => {
    const vagaData = (raw.vaga as JsonRecord) || raw;
    return {
      id: text(vagaData, ["id", "_id", "codigo"]) || String(index),
      title: text(vagaData, ["cargo", "titulo", "title", "nome"]),
      company: text(vagaData, ["empresa", "company", "nomeEmpresa"]),
      description: text(vagaData, ["descricao", "description", "resumo"]),
      location: text(vagaData, ["localizacao", "location", "cidade", "local"]),
      modality: text(vagaData, ["modalidade", "modality", "tipo", "periodo"]),
      salary: text(vagaData, ["salario", "salary", "faixaSalarial"]) || undefined,
      requirements: list(vagaData.requisitos ?? vagaData.requirements),
      benefits: list(vagaData.beneficios ?? vagaData.benefits),
      whatsapp:
        text(vagaData, ["whatsapp", "telefoneContato", "telefone", "contatos"]) || undefined,
      applicationUrl:
        text(vagaData, ["linkCandidatura", "applicationUrl", "link", "url"]) ||
        undefined,
      raw: vagaData,
    };
  });
  const uniqueJobsMap = new Map<string, Job>();
  for (const job of rawJobs) {
    const key = `${job.title}-${job.company}`;
    if (!uniqueJobsMap.has(key)) {
      uniqueJobsMap.set(key, job);
    }
  }
  return Array.from(uniqueJobsMap.values());
}
