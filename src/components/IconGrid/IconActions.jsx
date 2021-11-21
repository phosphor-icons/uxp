import React from "react";

const IconActions = ({ isOpen, numSeleceted, onInsert, onClear }) => {
  return (
    <div className="icon-actions">
      <sp-action-button size="s" onClick={onInsert}>
        Insert ({numSeleceted})
      </sp-action-button>
      <sp-action-button size="s" onClick={onClear}>
        Clear
      </sp-action-button>
    </div>
  );
};

export default IconActions;
