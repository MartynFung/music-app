import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef, useCallback, JSX } from "react";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
  debounceTimeMs: number; // Time in milliseconds to debounce
  placeholder?: string;
}

export function SearchInput({
  searchValue,
  setSearchValue,
  debounceTimeMs,
  placeholder = "Search",
}: Props): JSX.Element {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(inputValue);
    }, debounceTimeMs);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchValue, debounceTimeMs]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        inputValue === ""
      ) {
        setIsOpen(false);
      }
    },
    [inputValue]
  );

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      {!isOpen && (
        <button
          className="font-medium px-4 py-2 h-10 rounded-lg hover:bg-gray-100 hover:shadow-md text-rose-500"
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="flex cursor-pointer hover:brightness-75 transition"
            width={15}
          />
        </button>
      )}

      {isOpen && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="w-40 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 ease-in-out h-10 text-gray-800"
          placeholder={placeholder}
          autoFocus
        />
      )}
    </div>
  );
}
