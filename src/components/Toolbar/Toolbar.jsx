import React from "react";

import "./Toolbar.css";
import StyleInput from "./StyleInput.jsx";
import SearchInput from "./SearchInput.jsx";

const Toolbar = () => {
  return (
    <div className="toolbar" id="toolbar">
      <StyleInput />
      <SearchInput />
      <sp-divider size="small"></sp-divider>
    </div>
  );
};

export default Toolbar;
