"use client";

import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  isTextArea?: boolean;
  options?: string[]; // for select input
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  error,
  isTextArea = false,
  options,
}: FormInputProps) {
  // Uses brand-border (hairline border) by default, and active focus maps to brand-gold
  const inputClass = `w-full bg-brand-surface border ${
    error ? "border-brand-gold" : "border-brand-border"
  } focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-ivory px-4 py-3.5 rounded-none font-inter text-sm transition-all duration-300 placeholder:text-brand-muted/40 focus:outline-none`;

  return (
    <div className="flex flex-col gap-2 w-full text-left font-inter">
      <label htmlFor={name} className="font-inter font-bold uppercase tracking-wider text-xxs text-brand-muted flex justify-between items-center">
        <span>
          {label} {required && <span className="text-brand-gold font-inter">*</span>}
        </span>
        {error && <span className="text-brand-gold text-xxs font-inter tracking-normal normal-case font-medium">{error}</span>}
      </label>

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${inputClass} resize-none`}
        />
      ) : options ? (
        <div className="relative">
          <select
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            {placeholder && (
              <option value="" disabled className="bg-brand-surface text-brand-muted/50">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt} value={opt} className="bg-brand-surface text-brand-ivory">
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-muted">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  );
}
