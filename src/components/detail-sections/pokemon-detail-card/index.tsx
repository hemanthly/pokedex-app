"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { pokemonEvo } from "@/types";
import GenericModal from "@/components/atoms/generic-modal";
import { getGradientClass } from "@/components/molecules/pokemon-card";

interface PokemonDetailHeadProps {
  name: string;
  id: number;
  imageUrl: string;
  types: string[];
  description: string;
  prevNextData: { prevPokemon: pokemonEvo; nextPokemon: pokemonEvo };
}

const PokemonDetailHead = ({
  name,
  id,
  imageUrl,
  description,
  prevNextData,
  types,
}: PokemonDetailHeadProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0 });
  const readMoreRef = useRef<HTMLSpanElement>(null);

  const handleNavigation = (id: number, name: string) => {
    router.push(`/pokemon-detail/${name}/${id}`);
  };

  useEffect(() => {
    if (isModalOpen && readMoreRef.current) {
      const rect = readMoreRef.current.getBoundingClientRect();
      setModalPosition({ top: rect.bottom });
    }
  }, [isModalOpen]);

  const gradientClass = getGradientClass(types);

  return (
    <div>
      <header className="w-full px-6 flex flex-col md:flex-row md:justify-between mt-5 md:hidden">
        <div className="flex justify-between w-full md:w-auto">
          <h1 className="text-xl md:text-3xl font-bold">
            {name.toUpperCase()}
          </h1>
          <button
            className="text-2xl md:hidden"
            onClick={() => router.push("/")}
            aria-label="Close"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <span className="text-lg md:text-2xl font-medium md:border-l md:border-r md:border-black md:px-2">
          {id.toString().padStart(3, "0")}
        </span>
        <nav
          className="hidden md:flex items-center space-x-4"
          aria-label="Pokemon navigation"
        >
          <button
            className={`text-2xl ${
              id === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              handleNavigation(
                prevNextData.prevPokemon.id,
                prevNextData.prevPokemon.name
              )
            }
            disabled={id === 1}
            aria-label="Previous Pokemon"
          >
            <BsArrowLeftCircle />
          </button>
          <button
            className="text-2xl"
            onClick={() => router.push("/")}
            aria-label="Close"
          >
            <AiOutlineCloseCircle />
          </button>
          <button
            className={`text-2xl ${
              id === 1302 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              handleNavigation(
                prevNextData.nextPokemon.id,
                prevNextData.nextPokemon.name
              )
            }
            disabled={id === 1302}
            aria-label="Next Pokemon"
          >
            <BsArrowRightCircle />
          </button>
        </nav>
      </header>
      <section className="grid grid-cols-6 gap-4 px-6 mt-4 md:gap-8">
        <div
          className={`relative rounded-lg flex justify-center items-center border-black border-dashed border-2 shadow-md col-span-3 md:col-span-2 ${gradientClass}`}
          aria-label={`${name} image`}
        >
          <Image
            src={imageUrl}
            alt={`pokemon-${id}-name`}
            width={140}
            height={220}
            className="mx-auto px-4 py-10"
          />
        </div>
        <article className="col-span-3 md:col-span-4">
          <header className="hidden md:block mb-5">
            <div className="w-full px-6 flex flex-col md:flex-row md:justify-between mt-5 md:mt-0 md:pl-0">
              <div className="flex justify-between w-full md:w-auto">
                <h1 className="text-xl md:text-3xl font-bold">
                  {name.toUpperCase()}
                </h1>
                <button
                  className="text-2xl md:hidden"
                  onClick={() => router.push("/")}
                  aria-label="Close"
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>
              <span className="text-lg md:text-2xl font-medium md:border-l md:border-r md:border-black md:px-6">
                {id.toString().padStart(3, "0")}
              </span>
              <nav
                className="hidden md:flex items-center space-x-4"
                aria-label="Pokemon navigation"
              >
                <button
                  className={`text-2xl ${
                    id === 1 ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    handleNavigation(
                      prevNextData.prevPokemon.id,
                      prevNextData.prevPokemon.name
                    )
                  }
                  disabled={id === 1}
                  aria-label="Previous Pokemon"
                >
                  <BsArrowLeftCircle />
                </button>
                <button
                  className="text-2xl"
                  onClick={() => router.push("/")}
                  aria-label="Close"
                >
                  <AiOutlineCloseCircle />
                </button>
                <button
                  className={`text-2xl ${
                    id === 1302 ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    handleNavigation(
                      prevNextData.nextPokemon.id,
                      prevNextData.nextPokemon.name
                    )
                  }
                  disabled={id === 1302}
                  aria-label="Next Pokemon"
                >
                  <BsArrowRightCircle />
                </button>
              </nav>
            </div>
          </header>
          <p>
            {description}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              ref={readMoreRef}
              tabIndex={0}
              role="button"
              aria-expanded={isModalOpen}
              aria-controls="descriptionModal"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
            >
              ...read more
            </span>
          </p>
        </article>
      </section>

      <GenericModal
        id="descriptionModal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customClasses="bg-darkblue text-white w-[90%] md:w-[61%] mx-8"
        customStyles={{ top: modalPosition.top }}
      >
        <div className="p-4">{description}</div>
      </GenericModal>
    </div>
  );
};

export default PokemonDetailHead;
