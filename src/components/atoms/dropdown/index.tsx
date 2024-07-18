"use client";
import React, { useState, useRef, useEffect, RefObject } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StatsDropdownContent from "@/components/organisms/stats-dropdown-content";
import { DropdownProps, StatValues } from "./Dropdown.types";
import { FaAngleDown } from "react-icons/fa6";

export const initialStatValues: StatValues = {
  hp: [0, 210],
  attack: [0, 210],
  defense: [0, 210],
  "special-attack": [0, 210],
  "special-defense": [0, 210],
  speed: [0, 210],
};

const Dropdown: React.FC<DropdownProps> = ({
  label = "Select",
  options = [],
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
  const paramName = label.toLowerCase().replace(/\s+/g, "");

  const [statValues, setStatValues] = useState<StatValues>(initialStatValues);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const selectedValues = params.get(paramName)
      ? params.get(paramName)?.split(",")
      : [];
    setSelectedOptions(selectedValues || []);

    const updatedStatValues: StatValues = { ...initialStatValues };
    Object.keys(initialStatValues).forEach((stat) => {
      const paramValue = params.get(stat);
      if (paramValue) {
        updatedStatValues[stat as keyof StatValues] = paramValue
          .split(",")
          .map(Number) as [number, number];
      }
    });
    setStatValues(updatedStatValues);
  }, [searchParams, paramName]);

  const handleOptionChange = (option: string, checked: boolean) => {
    setSelectedOptions((prevOptions) => {
      let updatedOptions;
      if (checked) {
        updatedOptions = [...prevOptions, option];
      } else {
        updatedOptions = prevOptions.filter((opt) => opt !== option);
      }
      updateURL(updatedOptions);
      return updatedOptions;
    });
  };

  const updateURL = (options: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (options.length > 0) {
      params.set(paramName, options?.join(","));
    } else {
      params.delete(paramName);
    }
    router.push(`/?${params.toString()}`);
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return label;
    } else if (selectedOptions.length === 1) {
      return selectedOptions[0];
    } else {
      return `${selectedOptions[0]} + ${selectedOptions.length - 1} more`;
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    option: string
  ) => {
    const { key, target } = event;

    if (key === "Enter" || key === " ") {
      event.preventDefault();
      handleOptionChange(option, !selectedOptions.includes(option));
      return;
    }

    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      const sibling =
        key === "ArrowDown"
          ? (target as HTMLElement).nextSibling
          : (target as HTMLElement).previousSibling;
      if (sibling) (sibling as HTMLElement).focus();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleApply = (newStatValues: StatValues) => {
    setStatValues(newStatValues);
    updateStatParams(newStatValues);
    setIsOpen(false);
  };

  const updateStatParams = (values: StatValues) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(values).forEach((stat) => {
      if (
        JSON.stringify(values[stat as keyof StatValues]) !==
        JSON.stringify(initialStatValues[stat as keyof StatValues])
      ) {
        params.set(stat, values[stat as keyof StatValues]?.join(","));
      } else {
        params.delete(stat);
      }
    });
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full" ref={dropdownRef}>
      <p className=" text-[12px] flex ml-2" id={`${paramName}-toggle`}>
        {label}
      </p>
      <div
        id={`${paramName}-toggle`}
        className={`${
          isOpen ? "bg-white" : "bg-filterbg"
        } w-full md:w-[164px] p-2.5 mt-[1px] rounded-md cursor-pointer border`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">{getDisplayText()}</span>
          <FaAngleDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && label !== "Stats" && (
          <div
            className="mt-4 bg-white rounded-md shadow-lg border absolute w-[200px] ml-[-45px] p-2 z-10"
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                key={option}
                className={`flex items-center ${
                  isOpen && index !== options.length - 1
                    ? "border-b border-darkblue"
                    : ""
                } p-1 text-darkblue`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionChange(option, !selectedOptions.includes(option));
                }}
                onKeyDown={(e) => handleOptionKeyDown(e, option)}
                tabIndex={0}
                role="option"
                aria-selected={selectedOptions.includes(option)}
              >
                <input
                  type="checkbox"
                  id={`${paramName}-${option}`}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  className="mr-2"
                  tabIndex={-1}
                />
                <label
                  htmlFor={`${paramName}-${option}`}
                  className="ml-2 text-sm"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        {isOpen && label === "Stats" && (
          <StatsDropdownContent
            initialValues={statValues}
            onApply={handleApply}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
