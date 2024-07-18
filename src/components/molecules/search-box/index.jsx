"use client";
import React, { useState } from "react";
import GeneralInputBox from "@/components/atoms/general-input-box";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString()
  );
  const router = useRouter();

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (event) => {
    // if (event.key === 'Enter' && searchTerm.trim()) {
    //   router.push(`?search=${searchTerm}`);
    // }
  };

  return (
    <div>
      <GeneralInputBox
        label="Search By"
        placeholder="Name or Number"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleSearch}
        id="search-box"
        className=""
      />
    </div>
  );
};

export default SearchBox;
