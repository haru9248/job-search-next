import React from 'react';

type SidebarProps = {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSalary: number;
  setSelectedSalary: (salary: number) => void;
};

const Sidebar = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedSalary,
  setSelectedSalary,
}: SidebarProps) => {

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prevCategories) => {
          return prevCategories.includes(category)
            ? prevCategories.filter((cat) => cat !== category)
            : [...prevCategories, category];
        });
      };


  return (
    <div className="bg-gray-100 h-[180vh] p-3 w-[30vh]">
      <div>
        <h3 className="text-xl font-bold mb-2">求人カテゴリ</h3>
        <ul className="mb-3">
          {categories.map((category) => (
            <li key={category}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-1"
              />
              <label htmlFor={category}>{category}</label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">年収</h3>
        <select
          value={selectedSalary}
          onChange={(e) => setSelectedSalary(Number(e.target.value))}
          className="appearance-none rounded-none w-full border-2 p-1"
        >
          <option value={300}>300万円以上</option>
          <option value={400}>400万円以上</option>
          <option value={500}>500万円以上</option>
          <option value={600}>600万円以上</option>
          <option value={700}>700万円以上</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;