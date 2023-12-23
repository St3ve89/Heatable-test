'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

interface SearchBarProps {
  search?: string;
}

export default function SearchBar({ search }: SearchBarProps) {
  const [text, setText] = useState(search || '');
  const router = useRouter();

  useEffect(() => {
    if (!search) {
      router.push(`/`);
    } else {
      router.push(`/?search=${search}`);
    }
  }, [search, router]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const handleButtonClick = () => {
    performSearch();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBackClick = () => {
    if (text) {
      setText('');
    }
    router.push(`/`);
  };

  const performSearch = () => {
    if (text) {
      router.push(`/?search=${text}`);
      setText('');
    } else {
      router.push(`/`);
    }
  };
  return (
    <div className="flex items-center space-x-2 max-w-max">
      <input
        type="text"
        spellCheck="false"
        placeholder="Search by name or number"
        autoComplete="off"
        value={text}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
        className="flex-1 max-w-full p-2 bg-opacity-30 bg-gray-500 border border-gray-300 rounded-full text-sm text-gray-600 outline-none"
      />

      <button
        type="button"
        className="p-2 bg-opacity-30 bg-gray-500 border border-gray-300 rounded-full transition duration-300 hover:bg-opacity-60"
        onClick={handleButtonClick}
      >
        🔍
      </button>
      {search && <Button onClick={handleBackClick}>Go back to all</Button>}
    </div>
  );
}
