import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef, JSX } from "react";

export interface DropdownOption {
  id: string;
  value: string;
}

interface Props {
  options: DropdownOption[];
  selectedOptionId: string | null;
  handleSelectedOption: (value: string) => void;
  placeholderText?: string;
  menuTitleText?: string;
  icon?: IconProp;
}

export function Dropdown({
  options,
  selectedOptionId,
  handleSelectedOption: setSelectedOption,
  placeholderText = "Select an option",
  menuTitleText = "Sort By:",
  icon,
}: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function renderShowDropdownButton() {
    return (
      <button
        onClick={toggleDropdown}
        className={`px-4 py-2 font-medium text-rose-500 rounded-lg hover:bg-gray-100 hover:shadow-md ${isOpen && "shadow-md bg-gray-100"} transition flex gap-2 items-center`}
      >
        {selectedOptionId ? selectedOptionId : placeholderText}
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size="lg"
            className="flex cursor-pointer hover:brightness-75 transition"
            width={15}
          />
        )}
      </button>
    );
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {renderShowDropdownButton()}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg right-0 z-10">
          <ul className="py-2 text-gray-700">
            <li key={"placeholder"}>
              <button
                className="w-full text-left px-4 py-2 text-gray-400"
                disabled
              >
                {menuTitleText}
              </button>
            </li>
            {options.map((option: DropdownOption) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <li key={option.id}>
                  <button
                    onClick={() => handleOptionClick(option)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${isSelected && "font-bold"}`}
                    disabled={isSelected}
                  >
                    {option.value}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
