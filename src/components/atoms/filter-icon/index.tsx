"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";
import FilterModal from "../filter-modal";
import Accordion from "../accordion";
import { GENDER_ITEMS, STAT_ITEMS, TYPE_ITEMS } from "@/utils/constants";
import { StatValues, initialStatValues } from "@/components/atoms/dropdown/Dropdown.types";

const FilterIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [hasFilters, setHasFilters] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<Record<string, string[] | StatValues>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const type = params.get("type");
    const gender = params.get("gender");
    const hasStats = Array.from(params.keys()).some(key => Object.keys(initialStatValues).includes(key));
    setHasFilters(!!type || !!gender || hasStats);

    // Initialize pendingFilters with current URL params
    const initialFilters: Record<string, string[] | StatValues> = {};
    if (type) initialFilters.type = type.split(',');
    if (gender) initialFilters.gender = gender.split(',');
    if (hasStats) {
      const statValues: StatValues = { ...initialStatValues };
      Object.keys(initialStatValues).forEach(stat => {
        const value = params.get(stat);
        if (value) {
          statValues[stat as keyof StatValues] = value.split(',').map(Number) as [number, number];
        }
      });
      initialFilters.stats = statValues;
    }
    setPendingFilters(initialFilters);
  }, [searchParams]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenModal();
    }
  };

  const toggleAccordion = (accordionTitle: string) => {
    setOpenAccordion((prevOpen) => (prevOpen === accordionTitle ? null : accordionTitle));
  };

  const handleFilterChange = (paramName: string, values: string[] | StatValues) => {
    setPendingFilters(prev => ({ ...prev, [paramName]: values }));
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        } else {
          params.delete(key);
        }
      } else if (key === 'stats') {
        Object.entries(value).forEach(([stat, range]) => {
          if (JSON.stringify(range) !== JSON.stringify(initialStatValues[stat as keyof StatValues])) {
            params.set(stat, range.join(","));
          } else {
            params.delete(stat);
          }
        });
      }
    });
    router.push(`/?${params.toString()}`);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setPendingFilters({});
    router.push("/");
    setIsModalOpen(false);
  };

  return (
    <div className="h-[96%] relative">
      <button
        aria-label="Open filters"
        className="bg-slate-800 rounded-md px-4 py-2 ml-3 justify-center items-center block sm:hidden relative"
        onClick={handleOpenModal}
        onKeyDown={handleKeyDown}
      >
        <TbAdjustmentsHorizontal
          size={30}
          color="white"
          className="align-bottom"
        />
        {hasFilters && (
          <BsFillCheckCircleFill
            size={12}
            color="#5fff59"
            className="absolute top-2 right-2"
          />
        )}
      </button>
      <div className="block sm:hidden">
        <FilterModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          pendingFilters={pendingFilters}
          onApply={handleApply}
          onReset={handleReset}
        >
          <div className="flex flex-col md:hidden h-full overflow-scroll">
            <Accordion
              title="Type"
              items={TYPE_ITEMS}
              paramName="type"
              isOpen={openAccordion === "Type"}
              toggleAccordion={toggleAccordion}
              onFilterChange={handleFilterChange}
            />
            <Accordion
              title="Gender"
              items={GENDER_ITEMS}
              paramName="gender"
              isOpen={openAccordion === "Gender"}
              toggleAccordion={toggleAccordion}
              onFilterChange={handleFilterChange}
            />
            <Accordion
              title="Stats"
              items={STAT_ITEMS}
              paramName="stats"
              isOpen={openAccordion === "Stats"}
              toggleAccordion={toggleAccordion}
              onFilterChange={handleFilterChange}
            />
          </div>
        </FilterModal>
      </div>
    </div>
  );
};

export default FilterIcon;