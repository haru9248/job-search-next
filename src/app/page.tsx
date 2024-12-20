
import JobListClient from './components/JobListClient';

type Job = {
  id: number;
  category: string;
  salary: number;
  title: string;
};

const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch('https://job-search-next-git-main-harus-projects-1560d214.vercel.app/api/jobs');
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await response.json();
  console.log("Fetched jobs:", data);
  return data;
};

export default async function JobList () {
   
    const jobs = await fetchJobs();

  return (
    <div>
        <JobListClient jobs={jobs} />
    </div>
  );
};