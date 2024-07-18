import React from "react";
import Dropdown from "../../atoms/dropdown";

const TypeDD = () => {
  const options = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock"];

  return (
    <div className=" flex">
      <Dropdown label="Type" options={options} />
    </div>
  );
};

export default TypeDD;
