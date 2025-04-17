import { useState } from "react";
import { ChipProps } from "./chip.props";
import { ChipContainer } from "./chip.styles";

export const Chip = ({ textColor, bgColor, label }: ChipProps) => {
  return (
    <ChipContainer textColor={textColor} bgColor={bgColor} label={label}>
        <span>{label}</span>
    </ChipContainer>
  );
};
