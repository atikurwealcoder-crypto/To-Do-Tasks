import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Delete01Icon,
  CancelCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
const SearchField = () => {
  const [animationData, setAnimationData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [results, setResults] = useState([]);
  const [isSimilar, setIsSimilar] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // console.log("search text", searchText);

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
      item.label.toLowerCase().includes(query)
    );

    setResults(filtered);
  };

  // recent search section handler
  const addToRecent = (item) => {
    setRecentSearches((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) return prev;

      return [item, ...prev].slice(0, 5);
    });

    setSearchText("");
    setResults([]);
  };

  // single search item remover
  const removeRecent = (id) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  // all search item remover
  const clearAll = () => setRecentSearches([]);

  return (
    <div className="w-89.5 min-h-52 rounded-md bg-[#27272A] p-3.75 space-y-5">
      <div className="space-y-1">
        {/* Search Input */}
        <div className="bg-[#3F3F46] flex items-center rounded-4xl py-1.5 pl-3 pr-1.5">
          <HugeiconsIcon
            icon={Search01Icon}
            className="text-[#E4E4E7] w-5 h-5"
          />
          <Input
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search animation or page"
            className=" text-white w-82 h-10 placeholder:text-[#A1A1AA] text-base font-normal leading-5 shadow-none "
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
          <div className="bg-[#424348] rounded-md">
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => addToRecent(item)}
                className="w-full text-left px-3 py-2 text-sm text-[#b5b7bd]"
              >
                {item.label}
              </button>
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
      <div className="space-y-2 w-82">
        <div className="flex justify-between items-center">
          <p className="text-sm font-normal leading-4.5 text-[#FAFAFA]">Recent Searches</p>
          {recentSearches.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm font-normal leading-4.5 text-[#FAFAFA]"
            >
              Clear All
            </button>
          )}
        </div>

        {recentSearches.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm text-[#A1A1AA] space-y-3"
          >
            <span>{item.label}</span>
            <Button
             onClick={() => removeRecent(item.id)}
             className="bg-[#3F3F46] w-5 h-5 rounded-full"
             >
              <HugeiconsIcon
                icon={Delete01Icon}
                className="w-4 h-4 text-[#A1A1AA]"
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchField;
