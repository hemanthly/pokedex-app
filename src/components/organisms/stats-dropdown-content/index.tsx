import React, { useState, useEffect, useRef } from "react";
import ReactSlider from "react-slider";
import cn from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { STAT_LABELS } from "@/utils/constants";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  StatValues,
  initialStatValues,
} from "@/components/atoms/dropdown/Dropdown.types";

type StatsDropdownContentProps = {
  initialValues: StatValues;
  onApply: (values: StatValues) => void;
  onClose: () => void;
};

const StatsDropdownContent: React.FC<StatsDropdownContentProps> = ({
  initialValues,
  onApply,
  onClose,
}) => {
  const [values, setValues] = useState<StatValues>(
    initialValues || initialStatValues
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const applyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newValues: StatValues = { ...initialStatValues };

    (Object.keys(initialStatValues) as (keyof StatValues)[]).forEach((stat) => {
      const param = params.get(stat);
      if (param) {
        const numValues = param.split(",").map(Number) as [number, number];
        newValues[stat] = numValues;
      }
    });

    setValues(newValues);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSliderChange = (
    stat: keyof StatValues,
    newValues: [number, number]
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [stat]: newValues,
    }));
  };

  const handleReset = () => {
    setValues(initialStatValues);
    updateStatParams(initialStatValues);
  };

  const handleApply = () => {
    onApply(values);
    updateStatParams(values);
    onClose();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const updateStatParams = (values: StatValues) => {
    const params = new URLSearchParams(window.location.search);
    (Object.keys(values) as (keyof StatValues)[]).forEach((stat) => {
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

  const isChanged = JSON.stringify(values) !== JSON.stringify(initialStatValues);

  return (
    <div
      className="sm:absolute sm:mt-4 sm:bg-white sm:rounded-md sm:shadow-lg sm:border w-[100%] sm:w-[600px] sm:ml-[-445px] h-auto sm:p-4 px-6 z-50"
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
          ref={closeButtonRef}
          type="button"
          className="flex items-center justify-center"
          onClick={onClose}
          aria-label="Close"
        >
          <IoCloseCircleOutline size={28} />
        </button>
      </div>
      <h2 className="sr-only">Adjust Pokémon Stats</h2>
      {(Object.keys(STAT_LABELS) as (keyof StatValues)[]).map((stat) => (
        <div key={stat} className="flex flex-col sm:grid sm:grid-cols-8 p-2">
          <label
            htmlFor={`slider-${stat}`}
            className="col-span-2 sm:pl-2 text-sm mb-1 sm:mb-0"
          >
            {STAT_LABELS[stat]}
          </label>
          <div className="flex items-center border-black border-[1px] rounded-lg col-span-6 bg-background py-[2px]">
            <p className="px-2 text-sm">0</p>
            <ReactSlider
              key={values[stat]?.join(",")}
              min={0}
              max={210}
              defaultValue={values[stat]}
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
                  tabIndex={0}
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
      <div className="flex justify-end p-3">
        <button
          ref={resetButtonRef}
          type="button"
          className={cn("text-xs px-1 py-1 mr-4 sm:px-4 sm:py-2 border rounded", {
            "opacity-50 cursor-not-allowed": !isChanged,
          })}
          onClick={handleReset}
          onKeyDown={(e) => handleKeyDown(e, handleReset)}
          aria-label="Reset all sliders to default values"
          disabled={!isChanged}
        >
          Reset
        </button>
        <button
          ref={applyButtonRef}
          type="button"
          className={cn("text-xs mr-1 px-1 py-1 sm:mr-4 sm:px-4 sm:py-2 border rounded bg-darkblue text-white", {
            "opacity-50 cursor-not-allowed": !isChanged,
          })}
          onClick={handleApply}
          onKeyDown={(e) => handleKeyDown(e, handleApply)}
          aria-label="Apply current slider values"
          disabled={!isChanged}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default StatsDropdownContent;