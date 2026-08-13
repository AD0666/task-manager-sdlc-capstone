import { useEffect, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export default function SearchFilterBar({ status, search, onStatusChange, onSearchChange }) {
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  return (
    <div className="filter-bar" data-testid="search-filter-bar">
      <label>
        Search
        <input
          type="search"
          data-testid="search-input"
          placeholder="Search title or description"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </label>

      <label>
        Status
        <select
          data-testid="status-filter"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
