"use client";
import { useRouter } from "next/navigation";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
const MobileDetailPagination = ({ data, id}: any) => {
  
  const router = useRouter();

  const handlePrev = (currentId: number) => {
    const prevId = Number(currentId) - 1;

    if(prevId > 0){
        router.push(
            `/pokemon-detail/${data.prevPokemon.name}/${prevId}`
          );
    }
  };

  const handleNext = (currentId: number) => {
    const nextId = Number(currentId) + 1;
    router.push(
        `/pokemon-detail/${data.nextPokemon.name}/${nextId}`
      );
  };

  return (
    <div className=" sm:hidden">
      <div className="flex justify-evenly w-full px-4 my-6">
        {data.prevPokemon && id > 1 && (
          <button
            className="flex items-center bg-blue-900 text-white py-2 px-4 rounded-md w-36"
            onClick={() => handlePrev(id)}
          >
            <GoArrowLeft className="mr-2" />
            {data.prevPokemon.name}
          </button>
        )}
        {data.nextPokemon && (
          <button
            className="flex items-center bg-blue-900 text-white py-2 px-4 rounded-md w-36"
            onClick={() => handleNext(id)}
          >
            {data.nextPokemon.name}
            <GoArrowRight className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileDetailPagination;
