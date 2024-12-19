
"use client"

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

type Job = {
  id: number;
  category: string;
  salary: number;
  title: string;
};

type JobListClientProps = {
  jobs: Job[];
};

const JobListClient = ({ jobs }: JobListClientProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number>(300);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 10;

  
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const isCategoryMatch = selectedCategories.length
        ? selectedCategories.includes(job.category)
        : true;
      const isSalaryMatch = job.salary >= selectedSalary;
      return isCategoryMatch && isSalaryMatch;
    });
    setFilteredJobs(filtered);
  }, [selectedCategories, selectedSalary, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="flex">
      <Sidebar
        categories={['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護']}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedSalary={selectedSalary}
        setSelectedSalary={setSelectedSalary}
      />

      <div className="p-3 w-full">
        <h2 className="text-xl font-bold">求人一覧</h2>
        <p className="mb-3">該当件数：{filteredJobs.length}件</p>
        {currentJobs.length === 0 ? (
          <div>求人情報はまだありません。</div>
        ) : (
          <ul>
            {currentJobs.map((job) => (
              <li key={job.id} className="border-2 mb-2 w-full p-2 rounded-md">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>カテゴリ：{job.category}</p>
                <p className="mb-10">年収：{job.salary}万円</p>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center gap-2">
          
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀︎
          </button>
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
          >
            ▶︎
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListClient;