import React from "react";
import Stats from "@/components/detail-sections/stats";
import BasicInfo from "@/components/detail-sections/basic-info";
import EvolutionChain from "@/components/detail-sections/evolution-chain";
import MobileDetailPagination from "@/components/detail-sections/mobile-detail-pagination";
import PokemonDetailHead from "@/components/detail-sections/pokemon-detail-card";

const PokemonDetail = ({ data, id, prevNextData }: any) => {

  const cmToFeetAndInches = (cm: number) => {
    const cmPerInch = 2.54;
    const cmPerFoot = 30.48;

    const feet = Math.floor(cm / cmPerFoot);
    const inches = Math.round((cm % cmPerFoot) / cmPerInch);

    return `${feet}'${inches}''`;
  };
  
  const basicInfoData = {
    height: data.pokemonbasicInfo.height,
    weight: data.pokemonbasicInfo.weight,
    genders: data.genders,
    eggGroups: data.eggGroups,
    abilities: data.pokemonbasicInfo.abilities,
    types: data.pokemonbasicInfo.types,
    weakAgainst: data.weakAgainst,
  };

  const pokemonDetailInfo = {
    name: data.pokemonbasicInfo.name,
    id: data.pokemonbasicInfo.id,
    imageUrl: data.pokemonbasicInfo.imgUrl,
    types: data.pokemonbasicInfo.types,
    description: data.description,
    prevNextData: prevNextData,
  }
  
  return (
    <main className=" flex justify-center bg-[#3b3f61]">
      <article className="w-full bg-background sm:w-[65%]">
        <PokemonDetailHead {...pokemonDetailInfo}/>
        <BasicInfo {...basicInfoData} />
        <Stats statsData={data.pokemonbasicInfo.stats}></Stats>
        <EvolutionChain evoChainData={data.evolutionChain}/>
        <MobileDetailPagination data={prevNextData} id={id}></MobileDetailPagination>
      </article>
    </main>

  );
};

export default PokemonDetail;




        {/* <section className="w-full h-[300px] flex flex-row">
          <div className="mr-6">
            <figure
              className="border-black border border-dotted bg-red-300 w-fit p-6 justify-center rounded cursor-pointer"
              tabIndex={0}
            >
              <div className="flex justify-center items-center w-[200px] h-[250px]">
                <Image
                  src={data.pokemonbasicInfo.imgUrl}
                  width={199}
                  height={277}
                  alt={data.pokemonbasicInfo.name}
                  className="rounded object-contain h-24 w-24 hover:scale-110 duration-300"
                />
              </div>
              <figcaption className="sr-only">
                {data.pokemonbasicInfo.name}
              </figcaption>
            </figure>
          </div>
          <div>
            <header className="mb-10 flex flex-row">
              <h2 className="px-6">
                {data.pokemonbasicInfo.name.toUpperCase()}
              </h2>
              <p className="px-3 border-x-4 border-black">
                {data.pokemonbasicInfo.id.toString().padStart(3, "0")}
              </p>
              <nav className="flex flex-row gap-2 ml-3">
                <button
                  className="p-4 mr-4 bg-yellow-200"
                  onClick={async () => {
                    const prevId = Number(id) - 1;
                    const prevPokemonData = await fetchPokemonDetailsById(prevId); // Replace with your actual fetch logic

                    if (prevPokemonData) {
                      // router.push(
                      //   `/pokemon-detail/${prevPokemonData.name}/${prevId}`
                      // );
                    }
                  }}
                  aria-label="Previous Pokemon"
                >
                  Prev
                </button>
                <button
                  className="p-4 mr-4 bg-yellow-200"
                  onClick={() => router.push("/")}
                  aria-label="Close"
                >
                  Close
                </button>
                <button
                  className="p-4 mr-4 bg-yellow-200"
                  onClick={async () => {
                    const nextId = Number(id) + 1;

                    const nextPokemonData = await fetchPokemonDetailsById(nextId); 

                    if (nextPokemonData) {
                      // router.push(
                      //   `/pokemon-detail/${nextPokemonData.name}/${nextId}`
                      // );
                    }
                  }}
                  aria-label="Next Pokemon"
                >
                  Next
                </button>
              </nav>
            </header>
            <p className="w-full text-wrap">{data.description}</p>
            <span className="text-black font-bold">...read more</span>
          </div>
        </section> */}
