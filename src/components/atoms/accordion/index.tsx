"use client";
import React, { useState, useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import StatsDropdownContent from "@/components/organisms/stats-dropdown-content";
import { AccordionProps } from "@/types";
import {
  StatValues,
  initialStatValues,
} from "@/components/atoms/dropdown/Dropdown.types";

const Accordion: React.FC<AccordionProps> = ({ title, items, paramName }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [statValues, setStatValues] = useState<StatValues>(initialStatValues);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValues = params.get(paramName)
      ? params.get(paramName)?.split(",")
      : [];
    setCheckedItems(selectedValues as string[]);

    if (title === "Stats") {
      const updatedStatValues: StatValues = { ...initialStatValues };
      (Object.keys(initialStatValues) as Array<keyof StatValues>).forEach(
        (stat) => {
          const paramValue = params.get(stat);
          if (paramValue) {
            const values = paramValue.split(",").map(Number);
            if (values.length === 2) {
              updatedStatValues[stat] = values as [number, number];
            }
          }
        }
      );
      setStatValues(updatedStatValues);
    }
  }, [searchParams, paramName, title]);

  const handleItemChange = (itemLabel: string, checked: boolean) => {
    setCheckedItems((prevItems) => {
      let updatedItems;
      if (checked) {
        updatedItems = [...prevItems, itemLabel];
      } else {
        updatedItems = prevItems.filter((item) => item !== itemLabel);
      }
      updateURL(updatedItems);
      return updatedItems;
    });
  };

  const updateURL = (items: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (items.length > 0) {
      params.set(paramName, items?.join(","));
    } else {
      params.delete(paramName);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleApply = (newStatValues: StatValues) => {
    setStatValues(newStatValues);
    updateStatParams(newStatValues);
    setIsOpen(false);
  };

  const updateStatParams = (values: StatValues) => {
    const params = new URLSearchParams(searchParams.toString());
    (Object.keys(values) as Array<keyof StatValues>).forEach((stat) => {
      if (
        JSON.stringify(values[stat]) !== JSON.stringify(initialStatValues[stat])
      ) {
        params.set(stat, values[stat]?.join(","));
      } else {
        params.delete(stat);
      }
    });
    router.push(`/?${params.toString()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    itemLabel: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemChange(itemLabel, !checkedItems.includes(itemLabel));
    }
  };

  const firstCheckedItem = checkedItems.length > 0 ? checkedItems[0] : "";

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full flex justify-between items-center p-4 ${
          !isOpen ? "border-b border-gray-300" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls={`content-${title}`}
        id={`accordion-${title}`}
      >
        <span className="text-lg font-medium">{title}</span>
        <span className="text-sm text-gray-500">
          {firstCheckedItem &&
            `${firstCheckedItem} + ${checkedItems.length - 1} More`}
        </span>
        <span>{isOpen ? <FiMinusCircle /> : <GoPlusCircle />}</span>
      </button>
      {isOpen && title !== "Stats" && (
        <div
          id={`content-${title}`}
          className="p-4"
          role="region"
          aria-labelledby={`accordion-${title}`}
        >
          <div className="grid grid-cols-2 gap-2">
            {items.map((item, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.label)}
                  onChange={() =>
                    handleItemChange(
                      item.label,
                      !checkedItems.includes(item.label)
                    )
                  }
                  onKeyDown={(e) => handleOptionKeyDown(e, item.label)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {isOpen && title === "Stats" && (
        <StatsDropdownContent
          initialValues={statValues}
          onApply={handleApply}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Accordion;
