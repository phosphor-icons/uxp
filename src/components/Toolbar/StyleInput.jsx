import React from "react";
import { PencilLine } from "phosphor-react";

import { useIconWeight } from "../../state";
import { IconStyle } from "../../lib";

const options = [
  {
    key: "Thin",
    value: IconStyle.THIN,
    icon: <PencilLine size={24} weight="thin" />,
  },
  {
    key: "Light",
    value: IconStyle.LIGHT,
    icon: <PencilLine size={24} weight="light" />,
  },
  {
    key: "Regular",
    value: IconStyle.REGULAR,
    icon: <PencilLine size={24} weight="regular" />,
  },
  {
    key: "Bold",
    value: IconStyle.BOLD,
    icon: <PencilLine size={24} weight="bold" />,
  },
  {
    key: "Fill",
    value: IconStyle.FILL,
    icon: <PencilLine size={24} weight="fill" />,
  },
  {
    key: "Duotone",
    value: IconStyle.DUOTONE,
    icon: <PencilLine size={24} weight="duotone" />,
  },
];

const StyleInput = () => {
  const { weight, setWeight } = useIconWeight();

  return (
    <label>
      <span>WEIGHT</span>
      <select value={weight} onChange={(e) => setWeight(e.target.value)}>
        {options.map(({ key, value }) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </label>
  );
};

export default StyleInput;
