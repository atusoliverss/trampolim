import { apiConfig } from '../config/api';
import { request } from './api';

type JsonRecord = Record<string, unknown>;
const text = (data: JsonRecord, keys: string[]) => keys.map((key) => data[key]).find((value): value is string | number => typeof value === 'string' || typeof value === 'number')?.toString() ?? '';
const list = (value: unknown) => Array.isArray(value) ? value.map(String) : typeof value === 'string' ? value.split(/\n|,|;/).map((item) => item.trim()).filter(Boolean) : [];
const collection = (payload: unknown, keys: string[]) => {
  if (Array.isArray(payload)) return payload as JsonRecord[];
  const record = payload as JsonRecord;
  return (keys.map((key) => record?.[key]).find(Array.isArray) ?? []) as JsonRecord[];
};

export type Course = { id: string; title: string; description: string; workload: string; institution: string; category: string; image?: string; platformUrl?: string; raw: JsonRecord };
export type Job = { id: string; title: string; company: string; description: string; location: string; modality: string; salary?: string; requirements: string[]; benefits: string[]; whatsapp?: string; applicationUrl?: string; raw: JsonRecord };

export async function getCourses(): Promise<Course[]> {
  const payload = await request<unknown>(apiConfig.coursesUrl);
  return collection(payload, ['data', 'cursos', 'courses', 'content', 'results']).map((raw, index) => ({
    id: text(raw, ['id', '_id', 'codigo']) || String(index), title: text(raw, ['titulo', 'title', 'nome']), description: text(raw, ['descricao', 'description', 'resumo']), workload: text(raw, ['cargaHoraria', 'carga_horaria', 'duracao', 'workload']), institution: text(raw, ['instituicao', 'institution', 'provedor', 'provider']), category: text(raw, ['categoria', 'category', 'area']), image: text(raw, ['imagem', 'image', 'imagemUrl', 'imageUrl']) || undefined, platformUrl: text(raw, ['link', 'url', 'platformUrl', 'linkPlataforma']) || undefined, raw,
  }));
}

export async function getJobs(): Promise<Job[]> {
  const payload = await request<unknown>(apiConfig.jobsUrl);
  return collection(payload, ['data', 'vagas', 'jobs', 'content', 'results']).map((raw, index) => ({
    id: text(raw, ['id', '_id', 'codigo']) || String(index), title: text(raw, ['cargo', 'titulo', 'title', 'nome']), company: text(raw, ['empresa', 'company', 'nomeEmpresa']), description: text(raw, ['descricao', 'description', 'resumo']), location: text(raw, ['localizacao', 'location', 'cidade']), modality: text(raw, ['modalidade', 'modality', 'tipo']), salary: text(raw, ['salario', 'salary', 'faixaSalarial']) || undefined, requirements: list(raw.requisitos ?? raw.requirements), benefits: list(raw.beneficios ?? raw.benefits), whatsapp: text(raw, ['whatsapp', 'telefoneContato', 'telefone']) || undefined, applicationUrl: text(raw, ['linkCandidatura', 'applicationUrl', 'link', 'url']) || undefined, raw,
  }));
}
