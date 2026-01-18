import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Delete01Icon,
  CancelCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";

const SearchField = ({
  property = {},
  value = [],
  onClearAll = () => {},
  onRemoveRecent = () => {},
  onUpdateValue = () => {},
  onDelete = () => {},
  onDisabledUpdate = () => {},
}) => {
  const {
    title = "Recent Searches",
    placeholder="Search animation or page",
    allClearLabel="Clear All",
    ...rest
  } = property || {};

  const [animationData, setAnimationData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [results, setResults] = useState([]);
  const [isSimilar, setIsSimilar] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    fetch("/animationData.json")
      .then((res) => res.json())
      .then((json) => setAnimationData(json))
      .catch(console.error);
  }, []);

  // search field handler
  const handleSearch = (value) => {
    const query = value.trim().toLowerCase();

    setSearchText(value);
    setIsSimilar(true);

    if (!query) {
      setSearchText("");
      setResults([]);
      setIsSimilar(false);
      return;
    }

    const filtered = animationData.filter((item) =>
      item.label.toLowerCase().includes(query),
    );

    setResults(filtered);
  };

  // recent search section handler
  const addToRecent = (item) => {
    setRecentSearches((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) return prev;

      return [item, ...prev];
    });

    onUpdateValue(item);
    setSearchText("");
    setResults([]);
  };

  return (
    <div className="w-89.5 min-h-52 rounded-md bg-[#27272A] p-3.75 space-y-5">
      <div className="space-y-1">
        {/* Search Input */}
        <div className="bg-[#3F3F46] flex items-center rounded-4xl py-1.5 pl-3 pr-1.5 w-82 h-10">
          <HugeiconsIcon
            icon={Search01Icon}
            className="text-[#E4E4E7] w-5 h-5"
          />
          <Input
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className=" text-[#FAFAFA] placeholder:text-[#A1A1AA] placeholder:text-base text-base font-normal leading-5 shadow-none flex-1"
          />

          {isFocused && (
            <Button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSearchText("")}
              className="bg-[#52525B] w-7 h-7 rounded-full"
            >
              <HugeiconsIcon
                icon={CancelCircleIcon}
                className="text-[#E55F42] w-3.5 h-3.5"
              />
            </Button>
          )}
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="bg-[#424348] rounded-md max-h-36 overflow-y-auto">
            {results.map((item) => (
              <Button
                key={item.id}
                onClick={() => addToRecent(item)}
                className="w-full justify-start px-3 text-sm text-[#b5b7bd] font-normal hover:bg-[#52525B]"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {isSimilar && searchText.trim() !== "" && results.length === 0 && (
          <p className="text-sm text-[#A1A1AA] text-center py-2">
            No similar data found
          </p>
        )}
      </div>

      {/* Recent Searches */}
      <div className="space-y-4 w-82 max-h-29.5 overflow-y-auto px-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-normal leading-4.5 text-[#FAFAFA]">
            {title}
          </p>
          {recentSearches.length > 0 && (
            <button
              onClick={() => {
                onClearAll(console.log("All Clear button clicked"));
              }}
              className="text-sm font-normal leading-4.5 text-[#FAFAFA] cursor-pointer"
            >
              {allClearLabel}
            </button>
          )}
        </div>

        <div className="space-y-3 overflow-y-auto">
          {recentSearches.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm text-[#A1A1AA]"
            >
              <span>{item.label}</span>
              <button
                onClick={() => {
                  onRemoveRecent(console.log("Remove recent button clicked"));
                }}
                className="bg-[#3F3F46] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
              >
                <HugeiconsIcon
                  icon={Delete01Icon}
                  className="w-2.5 h-2.5 text-[#E4E4E7]"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchField;
