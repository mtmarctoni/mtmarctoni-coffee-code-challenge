"use client";

import React from "react";

// Overloaded props for type-safe handling
type InputFieldBaseProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  rightSymbol?: string;
  className?: string;
};

type StringInputProps = InputFieldBaseProps & {
  type?: "text" | "textarea";
  value: string;
  onChange: (value: string) => void;
};

type NumberInputProps = InputFieldBaseProps & {
  type: "number";
  value: number;
  onChange: (value: number) => void;
};

type Props = StringInputProps | NumberInputProps;

export default function InputField(props: Props) {
  const {
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    rightSymbol,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    
    if (type === "number") {
      // For number inputs, convert to number or keep as 0 for invalid input
      if (rawValue === "") {
        (onChange as (value: number) => void)(0);
      } else {
        const numValue = Number(rawValue);
        if (!isNaN(numValue)) {
          (onChange as (value: number) => void)(numValue);
        }
        // If invalid number, don't update (let user continue typing)
      }
    } else {
      // For text/textarea, always string
      (onChange as (value: string) => void)(rawValue);
    }
  };

  // Conditionally set border color if value is present
  const hasValue = type === "number" ? value !== 0 : value !== "";
  const borderColorClass = hasValue ? "border-text" : "border-muted";
  const inputClassName = `w-full box-border bg-input border ${borderColorClass} rounded-lg px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-accent focus:border-accent transition-all duration-300`;

  // Additional classes to hide number input spinners
  const numberInputClassName = type === "number" 
    ? `${inputClassName} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
    : inputClassName;

  return (
    <div className={`w-full font-tertiary`}>
      <label className="block text-sm text-muted mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea
          className={`${inputClassName} min-h-[56px]`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <div className="relative">
          <input
            className={numberInputClassName}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            type={type === "number" ? "number" : "text"}
            required={required}
                          step={type === "number" ? "0.01" : undefined}
                          
          />
          {rightSymbol && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text text-sm">{rightSymbol}</span>
          )}
        </div>
      )}
    </div>
  );
}
