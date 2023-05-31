"use client";

import React from "react";
import ReactSelect from "react-select";

interface Props {
  value?: Record<string, any>;
  label: string;
  options: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
  disabled?: boolean;
}

const Select = ({ value, label, options, onChange, disabled }: Props) => {
  return (
    <div className="z-[100]">
      <label className="text-sm text-gray-900 font-medium leading-6">
        {label}
      </label>

      <ReactSelect
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        options={options}
        isMulti
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        classNames={{
          control: () => "text-sm",
        }}
      />
    </div>
  );
};

export default Select;
