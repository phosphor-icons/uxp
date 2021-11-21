import "./styles.css";
import React, { Suspense } from "react";

import Toolbar from "./components/Toolbar";
import IconGrid from "./components/IconGrid";
import Footer from "./components/Footer";

const Panel = ({ selection }) => {
  return (
    <div className="app">
      <Toolbar />
      <Suspense fallback={<div>Loading...</div>}>
        <IconGrid selection={selection} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Panel;
