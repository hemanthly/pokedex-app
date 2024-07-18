"use client";

import { useState, KeyboardEvent } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import FilterModal from "../filter-modal";
import Accordion from "../accordion";
import { GENDER_ITEMS, STAT_ITEMS, TYPE_ITEMS } from "@/utils/constants";

const FilterIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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

  return (
    <div className="h-[96%]">
      <button
        aria-label="Open filters"
        className="bg-slate-800 rounded-md px-4 py-2 ml-3 justify-center items-center block sm:hidden"
        onClick={handleOpenModal}
        onKeyDown={handleKeyDown}
      >
        <TbAdjustmentsHorizontal
          size={30}
          color="white"
          className="align-bottom"
        />
      </button>
      <div className="block sm:hidden">
        <FilterModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="flex flex-col md:hidden h-full overflow-scroll">
            <Accordion
              title="Type"
              items={TYPE_ITEMS}
              paramName="type"
              isOpen={openAccordion === "Type"}
              toggleAccordion={toggleAccordion}
            />
            <Accordion
              title="Gender"
              items={GENDER_ITEMS}
              paramName="gender"
              isOpen={openAccordion === "Gender"}
              toggleAccordion={toggleAccordion}
            />
            <Accordion
              title="Stats"
              items={STAT_ITEMS}
              paramName="stats"
              isOpen={openAccordion === "Stats"}
              toggleAccordion={toggleAccordion}
            />
          </div>
        </FilterModal>
      </div>
    </div>
  );
};

export default FilterIcon;
