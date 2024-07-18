import React from "react";
import Dropdown from "@/components/atoms/dropdown";

const GenderDD = () => {
  const options = ["Male", "Female", "Genderless"];

  return (
    <div className=" flex">
      <Dropdown label="Gender" options={options} />
    </div>
  );
};

export default GenderDD;
