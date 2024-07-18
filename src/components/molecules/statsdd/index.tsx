import Dropdown from "@/components/atoms/dropdown";

const StatsDD = () => {
  const options = [
    "HP",
    "Attack",
    "Defense",
    "Speed",
    "Sp. Attack",
    "Sp. Def.",
  ];

  return (
    <div className=" flex">
      <Dropdown label="Stats" options={options} />
    </div>
  );
};

export default StatsDD;
