import React, { useRef, useCallback, useEffect } from "react";
import btoa from "abab/lib/btoa";
import { IconContext, SmileyXEyes } from "phosphor-react";

import { useIconSearch, useIconWeight } from "../../state";

// const { localFileSystem: fs, formats } = require("uxp").storage;

const IconGrid = () => {
  const { weight } = useIconWeight();
  const { query, results } = useIconSearch();

  useEffect(() => {
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });
  }, []);

  const handleCopyToWorkspace = async (event, name) => {
    // const PS = require("photoshop");
    // const layer = await PS.app.activeDocument.createLayer({ name });
    const sceneGraph = require("scenegraph");

    const svg = event.currentTarget.outerHTML;
    console.info(
      { pluginMessage: { type: "insert", payload: { name, svg } } },
      "*"
    );
  };

  const handleDragStart = useCallback((e) => {
    console.log(e);

    // const svg = new XMLSerializer().serializeToString(
    //   e.target.querySelector("svg")
    // );
    const dataUrl = `data:image/svg+xml;base64,${btoa(
      // svg
      e.currentTarget.innerHTML
    )}`;
    e.dataTransfer.setData("text/uri-list", dataUrl);

    console.log({ raw: e.currentTarget.innerHTML, dataUrl });

    // const tempFolder = await fs.getTemporaryFolder();
    // const imageFile = await tempFolder.createFile(`temp${e.timeStamp}.svg`, {
    //   overwrite: true,
    // });
    // await imageFile.write(e.currentTarget.innerHTML, { format: formats.utf8 });
    // console.log({ imageFile });
    // e.dataTransfer.setData("text/uri-list", imageFile.nativePath);
  }, []);

  const handleDragEnd = useCallback((e, name) => {
    const { clientX, clientY, view } = e.nativeEvent;
    if (!!view && view.length === 0) return;

    const payload = {
      name,
      svg: e.currentTarget.innerHTML,
      dropPosition: { clientX, clientY },
      windowSize: {
        width: window.outerWidth,
        height: window.outerHeight,
      },
    };

    console.info({ pluginMessage: { type: "drop", payload } }, "*");
  }, []);

  if (!results.length)
    return (
      <div className="empty-state">
        <SmileyXEyes size={128} weight="duotone" color="#2C2C2C" />
        <p>
          No results for <code>"{query}"</code>
        </p>
      </div>
    );

  return (
    <div className="grid">
      <IconContext.Provider value={{ weight, size: 24 }}>
        {results.map(({ Icon }) => (
          <div
            draggable
            className="icon-wrapper"
            onDragStart={handleDragStart}
            onDragEnd={(e) => handleDragEnd(e, Icon.displayName)}
            key={Icon.displayName}
            title={Icon.displayName}
          >
            <Icon
              className="icon"
              key={Icon.displayName}
              onClick={(event) =>
                handleCopyToWorkspace(event, Icon.displayName)
              }
            />
          </div>
        ))}
      </IconContext.Provider>
    </div>
  );
};

export default IconGrid;
