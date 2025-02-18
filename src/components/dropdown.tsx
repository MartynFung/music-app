import React, { useState, useEffect, useRef } from 'react';

export interface DropdownOption {
    id: string;
    value: string;
}

interface Props {
    options: DropdownOption[];
    selectedOption: string | null;
    handleSelectedOption: (value: string) => void;
}

export function Dropdown({ options, selectedOption, handleSelectedOption: setSelectedOption }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option: DropdownOption) => {
        setSelectedOption(option.value);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    // Attach event listener only when dropdown is open
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

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                {selectedOption ? selectedOption : "Select an option"}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg right-0">
                    <ul className="py-2 text-gray-700">
                        {options.map((option: DropdownOption) => (
                            <li key={option.id}>
                                <button
                                    onClick={() => handleOptionClick(option)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                    disabled={option.id === "placeholder"}
                                >
                                    {option.value}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
