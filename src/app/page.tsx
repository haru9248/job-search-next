
import JobListClient from './components/JobListClient';
import { supabase } from '../lib/supabase'

type Job = {
  id: number;
  category: string;
  salary: number;
  title: string;
};

const fetchJobs = async (): Promise<Job[]> => {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) throw new Error(error.message);
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