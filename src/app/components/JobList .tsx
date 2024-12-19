
import JobListClient from './JobListClient';

type Job = {
  id: number;
  category: string;
  salary: number;
  title: string;
};

const fetchJobs = async (): Promise<Job[]> => {
    const response = await fetch('http://localhost:3000/api/jobs');
    if (!response.ok) {
        throw new Error('求人情報の取得に失敗しました。');
    }
    return response.json();
};

const JobList =  async () => {
   
    const jobs = await fetchJobs();

  return (
    <div>
        <JobListClient jobs={jobs} />
    </div>
  );
};

export default JobList;