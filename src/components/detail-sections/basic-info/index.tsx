import React from "react";
import {
  TEXT_HEIGHT,
  TEXT_WEIGHT,
  TEXT_GENDERS,
  TEXT_EGG_GROUPS,
  TEXT_ABILITIES,
  TEXT_TYPES,
  TEXT_WEAK_AGAINST
} from "@/utils/constants";

export interface BasicInfoProps {
  height: number;
  weight: number;
  genders: string[];
  eggGroups: string[];
  abilities: string[];
  types: string[];
  weakAgainst: string[];
}

export const typeColors: { [key: string]: string } = {
  normal: "bg-normal",
  fighting: "bg-fighting",
  flying: "bg-flying",
  poison: "bg-poison",
  ground: "bg-ground",
  rock: "bg-rock",
  bug: "bg-bug",
  ghost: "bg-ghost",
  steel: "bg-steel",
  fire: "bg-fire",
  water: "bg-water",
  grass: "bg-grass",
  electric: "bg-electric",
  psychic: "bg-psychic",
  ice: "bg-ice",
  dragon: "bg-dragon",
  dark: "bg-dark",
  fairy: "bg-fairy",
  unknown: "bg-unknown",
};

const cmToFeetAndInches = (cm: number) => {
  const inches = cm / 2.54;
  const feet = Math.floor(inches / 12);
  const remainderInches = Math.round(inches % 12);
  return `${feet}'${remainderInches}"`;
};

const BasicInfo = ({
  height,
  weight,
  genders,
  eggGroups,
  abilities,
  types,
  weakAgainst,
}: BasicInfoProps) => {
  return (
    <section className="p-6 mt-6">
      <h2 className="sr-only">Next Basic Information of this pokemon</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 ">
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_HEIGHT}</h3>
          <p className="text-gray-700">{cmToFeetAndInches(height * 10)}</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_WEIGHT}</h3>
          <p className="text-gray-700">{weight / 10} kg</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_GENDERS}</h3>
          <p className="text-gray-700">{genders?.join(", ")}</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_EGG_GROUPS}</h3>
          <p className="text-gray-700">{eggGroups?.join(", ")}</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_ABILITIES}</h3>
          <p className="text-gray-700">{abilities?.join(", ")}</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <h3 className="font-semibold text-darkblue">{TEXT_TYPES}</h3>
          <div className="flex flex-row flex-start flex-wrap">
            {types.map((type: string) => (
              <p
                key={type}
                className={`text-darkblue px-1 border-[1px] flex justify-center items-center pb-[3px] border-darkblue rounded-md mr-2 mb-2 ${
                  typeColors[type.toLowerCase()] || "bg-unknown"
                }`}
              >
                {type}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-2">
          <h3 className="font-semibold text-darkblue">{TEXT_WEAK_AGAINST}</h3>
          <div className="flex flex-row flex-wrap">
            {weakAgainst.map((weakness: string) => (
              <p
                key={weakness}
                className={`text-darkblue px-1 border-[1px] border-darkblue pb-[3px] rounded-md mr-2 mb-2 ${
                  typeColors[weakness.toLowerCase()] || "bg-unknown"
                }`}
              >
                {weakness}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
