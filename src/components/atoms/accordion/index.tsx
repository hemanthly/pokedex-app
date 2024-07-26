"use client";
import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { AccordionProps } from "@/types";
import {
  StatValues,
  initialStatValues,
} from "@/components/atoms/dropdown/Dropdown.types";
import { STAT_LABELS } from "@/utils/constants";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactSlider from "react-slider";
import cn from "classnames";

interface ExtendedAccordionProps extends AccordionProps {
  isOpen: boolean;
  toggleAccordion: (accordionTitle: string) => void;
  onFilterChange: (paramName: string, values: string[] | StatValues) => void;
}

const Accordion: React.FC<ExtendedAccordionProps> = ({
  title,
  items,
  paramName,
  isOpen,
  toggleAccordion,
  onFilterChange,
}) => {
  const searchParams = useSearchParams();
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
      onFilterChange(paramName, updatedItems);
      return updatedItems;
    });
  };

  const handleApply = (newStatValues: StatValues) => {
    setStatValues(newStatValues);
    onFilterChange(paramName, newStatValues);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordion(title);
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

  const handleSliderChange = (
    stat: keyof StatValues,
    newValues: [number, number]
  ) => {
    setStatValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [stat]: newValues,
      };
      onFilterChange(paramName, updatedValues);
      return updatedValues;
    });
  };

  return (
    <div className="w-full mb-3 ">
      <button
        onClick={() => toggleAccordion(title)}
        onKeyDown={handleKeyDown}
        className={`w-full flex justify-between items-center p-4 rounded-md border-darkblue border-[1px] ${
          isOpen ? 'rounded-b-none border-b-0' : ''
        }`}
        aria-expanded={isOpen}
        aria-controls={`content-${title}`}
        id={`accordion-${title}`}
      >
        <span className="text-lg font-medium">
          {title}{" "}
          <span className=" text-base text-darkblue border-l-2 ml-2 font-normal pl-2 ">
            {!firstCheckedItem && `Select`}
          </span>
          <span className=" text-base font-normal ">
            {firstCheckedItem && ` ${firstCheckedItem}`}
          </span>
          <span className=" text-base text-darkblue font-bold">
            {" "}
            {firstCheckedItem && ` + ${checkedItems.length - 1} More`}
          </span>
        </span>

        <span>
          {isOpen ? <FiMinusCircle size={25} /> : <GoPlusCircle size={25} />}
        </span>
      </button>
      {isOpen && title !== "Stats" && (
        <div
          id={`content-${title}`}
          className={`p-4 flex justify-center rounded-md border-darkblue border-[1px] ${
            isOpen ? 'rounded-t-none border-t-0' : ''
          }`}
          role="region"
          aria-labelledby={`accordion-${title}`}
        >
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
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
        <div
        className={`sm:absolute sm:mt-4 sm:bg-white sm:rounded-md sm:shadow-lg sm:border w-[100%] sm:w-[600px] sm:ml-[-445px] h-auto sm:p-4 px-6 z-50 rounded-md border-darkblue border-[1px] pb-4 ${
          isOpen ? 'rounded-t-none border-t-0' : ''
        }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="dialog-label"
          aria-modal="true"
        >
          <div className="hidden px-4 sm:py-2 sm:flex justify-between items-center">
            <h2 id="dialog-label" className="font-bold text-lg">
              Select Stats
            </h2>
            <button
              type="button"
              className="flex items-center justify-center"
              onClick={() => {
                toggleAccordion(title);
              }}
              aria-label="Close"
            >
              <IoCloseCircleOutline size={28} />
            </button>
          </div>
          <h2 className="sr-only">Adjust Pokémon Stats</h2>
          {(Object.keys(STAT_LABELS) as (keyof StatValues)[]).map((stat) => (
            <div
              key={stat}
              className="flex flex-col sm:grid sm:grid-cols-8 p-2"
            >
              <label
                htmlFor={`slider-${stat}`}
                className="col-span-2 sm:pl-2 text-sm mb-1 sm:mb-0"
              >
                {STAT_LABELS[stat]}
              </label>
              <div className="flex items-center border-black border-[1px] rounded-lg col-span-6 bg-background py-[2px]">
                <p className="px-2 text-sm">0</p>
                <ReactSlider
                  key={statValues[stat]?.join(",")}
                  min={0}
                  max={210}
                  defaultValue={statValues[stat]}
                  className={cn("relative border px-6 py-2 h-2 w-full")}
                  renderTrack={(props, state) => {
                    let className = "";
                    if (state.index === 0) {
                      className = "bg-ice";
                    } else if (state.index === state.value.length) {
                      className = "bg-ice";
                    } else {
                      className = "bg-indigo-900 rounded-lg";
                    }
                    return (
                      <div
                        {...props}
                        className={cn({
                          "h-2 top-1/2 -translate-y-1/2": true,
                          [className]: true,
                        })}
                      ></div>
                    );
                  }}
                  renderThumb={(props, state) => (
                    <div
                      {...props}
                      className="rounded-md w-8 h-4 flex items-center justify-center text-white bg-indigo-900 -translate-y-1/2 text-xs"
                      aria-label={`Thumb for ${STAT_LABELS[stat]}`}
                    >
                      {state.valueNow}
                    </div>
                  )}
                  renderMark={(props) => (
                    <div
                      {...props}
                      className={cn({
                        "top-1/2 -translate-y-1/2": true,
                        "w-1/5 h-1/5": true,
                        "rounded-full bg-indigo-500": true,
                      })}
                    ></div>
                  )}
                  pearling
                  minDistance={10}
                  onAfterChange={(newValues) =>
                    handleSliderChange(stat, newValues as [number, number])
                  }
                />
                <p className="px-2 text-sm">210</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;