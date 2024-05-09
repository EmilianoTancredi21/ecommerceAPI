import { createContext, useState } from "react";

export const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <FilterContext.Provider
      value={{
        filterOpen,
        setFilterOpen,
        handleFilterClose,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
