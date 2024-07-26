"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  StatValues,
  initialStatValues,
} from "@/components/atoms/dropdown/Dropdown.types";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  pendingFilters: Record<string, string[] | StatValues>;
  onApply: () => void;
  onReset: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  pendingFilters,
  onApply,
  onReset
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnyFilterSelected, setIsAnyFilterSelected] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onClose();
      }
    };

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = modalRef.current?.querySelectorAll(
      focusableElements
    )[0] as HTMLElement;
    const focusableContent =
      modalRef.current?.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent?.[
      focusableContent.length - 1
    ] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      const isTabPressed = e.key === "Tab";

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", trapFocus);

    firstFocusableElement?.focus();

    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", trapFocus);

      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const hasFilters = Object.values(pendingFilters).some(value => 
      Array.isArray(value) ? value.length > 0 : 
      Object.values(value as StatValues).some(statValue => 
        JSON.stringify(statValue) !== JSON.stringify(initialStatValues[statValue as keyof StatValues])
      )
    );
    setIsAnyFilterSelected(hasFilters);
  }, [pendingFilters]);

  const handleReset = () => {
    onReset();
  };

  const handleSubmit = () => {
    onApply();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-[100%] z-20"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg w-11/12 p-5 h-[97%] flex flex-col relative"
      >
        <div className="p-4 border-b border-gray-300 flex justify-between">
          <h2 id="filter-modal-title" className="text-xl font-semibold">
            Filters
          </h2>
          <button
            aria-label="Close"
            className="absolute top-4 right-8 text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mt-4 h-[83%] overflow-y-auto">{children}</div>
        <div className="flex justify-between p-4 border-t border-gray-300 absolute bottom-0 w-11/12 z-50">
        <button
          className={`bg-white text-black border border-black px-10 py-2 rounded-md ${!isAnyFilterSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="reset"
          onClick={handleReset}
          disabled={!isAnyFilterSelected}
        >
          Reset
        </button>
        <button
          className={`bg-gray-800 text-white px-10 py-2 rounded-md ${!isAnyFilterSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          onClick={handleSubmit}
          disabled={!isAnyFilterSelected}
        >
          Apply
        </button>
      </div>
      </div>
    </div>
  );
};

export default FilterModal;