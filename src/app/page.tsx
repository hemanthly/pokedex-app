import { fetchPokemonList } from "../api/api";
import PokemonList from "../components/pages/pokemon-list";
import Header from "../components/molecules/header";
import SearchBox from "../components/molecules/search-box";
import TypeDD from "../components/molecules/typedd";
import GenderDD from "../components/molecules/genderdd";
import StatsDD from "../components/molecules/statsdd";
import FilterIcon from "../components/atoms/filter-icon";

async function getData(page: number = 1, limit: number = 18) {
  const res = await fetchPokemonList(page, limit);
  return res;
}

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page ? parseInt(searchParams?.page, 10) : 1;
  const data = await getData(page);

  return (
    <div className="bg-background w-full h-[130vh] py-10">
      <Header />
      <div className="mt-8 mb-6 md:mb-2 mx-5 md:mx-6 lg:mx-8  flex items-center justify-center">
        <div className="flex-grow md:flex-grow-0 md:w-[49%] mb-4 md:mb-0">
          <SearchBox />
        </div>
        <div className=" mb-4 max-h-[80%]">
          <FilterIcon />
        </div>
        <div className="hidden sm:flex sm:flex-grow sm:space-x-4 sm:ml-8 sm:justify-between">
          <TypeDD />
          <GenderDD />
          <StatsDD />
        </div>
      </div>
      <PokemonList data={data} currentPage={page} query={query} />
    </div>
  );
};

export default Home;
