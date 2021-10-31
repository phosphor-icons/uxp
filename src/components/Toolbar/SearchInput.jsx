import React, { useState } from "react";
import useDebounce from "react-use/esm/useDebounce";
import { X, HourglassHigh } from "phosphor-react";

import { useIconSearch } from "../../state";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const { query, search } = useIconSearch();
  void query;

  const [isReady] = useDebounce(() => search(value), 250, [value]);

  const handleCancelSearch = () => {
    setValue("");
    // Should cancel pending debounce timeouts and immediately clear query
    // without causing lag!
    // search("");
  };

  return (
    <label id="search-input">
      <span>SEARCH</span>
      <input
        aria-label="Search for an icon"
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        onKeyPress={({ currentTarget, key }) =>
          key === "Enter" && currentTarget.blur()
        }
      />
      {value ? (
        isReady() ? (
          <X className="clear-icon" size={18} onClick={handleCancelSearch} />
        ) : (
          <HourglassHigh className="wait-icon" size={18} />
        )
      ) : null}
    </label>
  );
};

export default SearchInput;
