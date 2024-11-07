import { Button } from "../ui/button";

interface FilterButtonProps {
  filter: string;
  isActive: boolean;
  onClick?: () => void;
}

const FilterButton = ({ filter, onClick, isActive }: FilterButtonProps) => {
  return (
    <Button
      onClick={onClick}
      data-testid="filter-button"
      className={`rounded-3xl  text-text hover:bg-filterButton ${
        isActive ? "bg-filterButton" : "bg-transparent"
      }`}
    >
      {filter}
    </Button>
  );
};

export default FilterButton;
