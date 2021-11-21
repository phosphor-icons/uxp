import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import btoa from "abab/lib/btoa";
import { IconContext, SmileyXEyes } from "phosphor-react";
import { pathThatSvg } from "path-that-svg";

import { useIconSearch, useIconSelections, useIconWeight } from "../../state";
import IconActions from "./IconActions.jsx";

const application = require("application");
const { localFileSystem: fs } = require("uxp").storage;

const IconGrid = ({ selection }) => {
  const { weight } = useIconWeight();
  const { query, results } = useIconSearch();
  const { pending, addPending, removePending, clearPending } =
    useIconSelections();
  const pendingNames = useMemo(() => pending.map((i) => i.name), [pending]);
  // const [filePath, setFilePath] = useState(null);

  useEffect(() => {
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });
  }, []);

  const handlePrepareFile = async (e, name) => {
    const svgString = e.currentTarget.innerHTML;

    if (pendingNames.includes(name)) {
      removePending(name);
    } else {
      try {
        const tempFolder = await fs.getTemporaryFolder();
        const imageFile = await tempFolder.createFile(`${name}.svg`, {
          overwrite: true,
        });
        await imageFile.write(svgString);
        addPending(name, imageFile.nativePath);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDragStart = useCallback(
    (e) => {
      console.log(pending.map((p) => p.url).join("\n"));

      if (!pending.length) return;
      e.dataTransfer.setData(
        "text/uri-list",
        pending.map((p) => p.url).join("\n")
      );
    },
    [pending]
  );

  const handleDragEnd = useCallback((e, name) => {
    clearPending();
  }, []);

  const handleInsertToArtboard = useCallback((e, name) => {
    const svgString = e.currentTarget.innerHTML;
    console.log({ svgString });

    application.editDocument(
      { editLabel: `Importing ${name}` },
      async (selection) => {
        try {
          // const data = await pathThatSvg(svgString);
          // console.log({ data });

          const tempFolder = await fs.getTemporaryFolder();
          const imageFile = await tempFolder.createFile(`${name}.svg`, {
            overwrite: true,
          });
          await imageFile.write(svgString);

          console.log({ imageFile, selection });
          selection.insertionParent.addChild();
          console.log("imported file");
        } catch (e) {
          console.error(e);
        }
      }
    );
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
      {!!pending.length && (
        <IconActions
          isOpen={!!pending.length}
          numSeleceted={pending.length}
          onInsert={undefined}
          onClear={clearPending}
        />
      )}
      <IconContext.Provider value={{ weight, size: 24 }}>
        {results.map(({ Icon }) => {
          const isPending = pendingNames.includes(Icon.displayName);
          return (
            <div
              draggable={isPending}
              className={`icon-wrapper ${isPending ? "pending" : ""}`}
              onClick={(e) => handlePrepareFile(e, Icon.displayName)}
              onDragStart={handleDragStart}
              onDragEnd={(e) => handleDragEnd(e, Icon.displayName)}
              // onMouseEnter={(e) => handlePrepareFile(e, Icon.displayName)}
              key={Icon.displayName}
              title={Icon.displayName}
            >
              <Icon className="icon" key={Icon.displayName} />
            </div>
          );
        })}
      </IconContext.Provider>
    </div>
  );
};

export default IconGrid;
