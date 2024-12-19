'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const JobPostPage: React.FC = () => {

  const categories = [
    {id: 1, name: '事務'},
    {id: 2, name: 'エンジニア'},
    {id: 3, name: '営業'},
    {id: 4, name: 'デザイン'},
    {id: 5, name: 'マーケティング'},
    {id: 6, name: '財務・経理'},
    {id: 7, name: '人事'},
    {id: 8, name: 'カスタマーサポート'},
    {id: 9, name: '製造'},
    {id: 10, name: '医療・介護'},
  ];

  const [formData, setFormData] = useState({ category: 0,
    salary: '',
    title: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const { category, salary, title } =formData;

      if(!category || !salary || !title) {
        setErrorMessage('全て入力してください');
        return;
      }

      if(isNaN(Number(salary))) {
        setErrorMessage('年収には半角数字のみを入力してください');
        return;
      }

      const salaryNumber = Number(salary);

    try {
      const categoryName = categories.find(cat => cat.id === Number(category))?.name || '';
        const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryName, salary: salaryNumber, title }),
      });

      if(res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || '求人投稿に失敗しました');
      }
    } catch (error) {
      console.error('求人送信エラー:', error);
      throw new Error('求人の送信に失敗しました。');
    }
  };

  return (
    <div className="pl-7 pt-3">
      <h1 className="text-2xl font-bold mb-5">求人投稿</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <form method="POST" onSubmit={handleSubmit}>
        <p className="mb-2">求人カテゴリ選択</p>
        <select name="category" id="category" value={formData.category} onChange={handleChange}
        className="appearance-none border-2 rounded-none p-1 w-1/3">
          <option value={0} disabled>カテゴリを選択　▼</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <p className="mt-2 mb-2">年収(万円)</p>
        <input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange} className="rounded-none appearance-none border-2 w-1/3 p-1"/>

        <p className="mb-2 mt-2">求人タイトル</p>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="appearance-none rounded-none border-2 w-3/4 p-1"/>

         <div>
        <button type="submit" className="bg-blue-400 text-white w-1/3 p-2 mt-10">
          投稿
        </button>
         </div>
      </form>
      </div>
  );
};

export default JobPostPage;