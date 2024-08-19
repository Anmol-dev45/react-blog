import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`w-full px-3 py-2 rounded-md border-2 border-gray-700 outline-none focus:bg-gray-100 duration-300 ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
