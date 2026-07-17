import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RibbonStrip } from '../components/ui/RibbonStrip';
import { DetailsModal } from '../components/ui/DetailsModal';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { HowItWorks } from '../components/sections/HowItWorks';
import { DiagnosticQuiz } from '../features/diagnostic/DiagnosticQuiz';
import { CoursesList } from '../components/sections/CoursesList';
import { JobsList } from '../components/sections/JobsList';
import { Footer } from '../components/sections/Footer';
import { getCourses, getJobs, type Course, type Job } from '../services/catalog';
import { useAuth } from '../features/auth/AuthContext';

export function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>([]); const [jobs, setJobs] = useState<Job[]>([]);
  const [coursesError, setCoursesError] = useState(''); const [jobsError, setJobsError] = useState('');
  const [loadingCourses, setLoadingCourses] = useState(false); const [loadingJobs, setLoadingJobs] = useState(false);
  const [selected, setSelected] = useState<Course | Job | null>(null);
  
  const requestResults = () => {
    setShowResults(true);
    if (!isAuthenticated) navigate('/login');
  };

  useEffect(() => { 
    if (!isAuthenticated || !showResults) return; 
    setLoadingCourses(true); setLoadingJobs(true); 
    getCourses().then(setCourses).catch((error: Error) => setCoursesError(error.message)).finally(() => setLoadingCourses(false)); 
    getJobs().then(setJobs).catch((error: Error) => setJobsError(error.message)).finally(() => setLoadingJobs(false)); 
    window.setTimeout(() => document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' }), 0); 
  }, [isAuthenticated, showResults]);

  return <><RibbonStrip /><Header /><main><Hero /><Stats /><HowItWorks /><DiagnosticQuiz onResultsRequested={requestResults} />{showResults && isAuthenticated && <><CoursesList courses={courses} loading={loadingCourses} error={coursesError} onSelect={setSelected} /><JobsList jobs={jobs} loading={loadingJobs} error={jobsError} onSelect={setSelected} /></>}</main><Footer /><DetailsModal item={selected} type={selected && 'workload' in selected ? 'course' : 'job'} onClose={() => setSelected(null)} /></>;
}
