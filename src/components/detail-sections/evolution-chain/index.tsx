import { getGradientClass } from "@/components/molecules/pokemon-card";
import { EVOLUTION_CHAIN_TITLE } from "@/utils/constants";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

const EvolutionChain = ({ evoChainData }: any) => {
  return (
    <section className="w-full h-auto mt-10 rounded-lg p-4 bg-background">
      <h2 className="font-bold tracking-widest mb-4 text-center">
        {EVOLUTION_CHAIN_TITLE}
      </h2>
      <div className="flex items-center justify-between w-full">
        {evoChainData?.map((evo: any, index: any) => {
          const gradientClass = getGradientClass(evo.types);
          const typesText = evo.types?.join(" and ") || "unknown type";

          return (
            <div key={evo.id} className="flex items-center flex-grow">
              <div
                className={`flex flex-col items-center justify-center h-[160px] md:h-[210px] rounded-lg border-black border-dashed border-2 shadow-md flex-grow text-center ${gradientClass}`}
              >
                <Image
                  src={evo.imgUrl}
                  alt={`pokemon-${evo.id}-name`}
                  width={80}
                  height={80}
                  className="mx-auto"
                />
                <p className="hidden sm:block text-center mt-2">{evo.name}</p>
                <p className="hidden sm:block text-center mt-1">{evo.id}</p>
              </div>
              {index < evoChainData.length - 1 && (
                <div className="flex items-center justify-center w-12 h-full">
                  <GoArrowRight className="text-gray-500" size={24} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EvolutionChain;
