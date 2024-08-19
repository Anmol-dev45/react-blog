import React, { useId } from "react";

const Select = ({ options = [], label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-md border-2 border-gray-700 outline-none focus:bg-gray-100 duration-300 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
