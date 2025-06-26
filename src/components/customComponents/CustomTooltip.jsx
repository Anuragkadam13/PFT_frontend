import React from "react";
import { formatAbbreviatedNumber } from "../utils/NumberFormatter";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const displayValue = formatAbbreviatedNumber(payload[0].value);
    return (
      <div className="bg-white shadow-md rounded-lg p-2 ">
        <p className="text-xs font-semibold mb-1 text-black">
          {payload[0].name}
        </p>
        <p className="text-xs text-gray-600">
          Amount
          <span className="text-xs font-medium text-gray-900 ml-3">
            {displayValue}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
