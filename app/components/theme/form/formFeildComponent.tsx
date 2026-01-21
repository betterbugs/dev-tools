"use client";

import { useEffect, useState } from "react";

export const FormGroup: any = ({ children, className = "" }: any) => {
  return <div className={`ant-form-item ${className}`}>{children}</div>;
};

interface InputFieldProps {
  register: any;
  formState: any;
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  prefix?: any;
  suffix?: any;
  addonBefore?: any;
  addonAfter?: any;
  autoFocus?: boolean;
  defaultChecked?: boolean;
  onChange?: (d: any) => void;
  onBlur?: (d: any) => void;
  onClick?: (d: any) => void;
}

interface TextAreaFieldProps {
  register: any;
  formState: any;
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  showError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  type?: string;
  onChange?: (d: any) => void;
}

export const InputField = (props: InputFieldProps) => {
  const {
    register,
    formState,
    prefix,
    suffix,
    id,
    type = "text",
    label,
    placeholder,
    defaultValue,
    className,
    autoCapitalize,
    // addonBefore,
    autoComplete,
    minLength,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
    value,
    defaultChecked,
    onChange = null,
    onClick = null,
    onBlur,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    return () => {
      setError(null);
    };
  }, [formState, id]);

  return (
    <>
      {label && (
        <div className="block pb-1">
          <label htmlFor={id} className="font-medium">
            {label}
          </label>
        </div>
      )}
      <div className="flex  items-center relative">
        {prefix && (
          <span className="ant-input-prefix absolute z-[1] left-[10px]">
            {prefix}
          </span>
        )}
        <input
          {...register(id)}
          {...{
            id,
            type,
            className: `ant-input input-field ${className} ${
              prefix && "pl-10"
            } ${error ? "ant-input-status-error" : ""}`,
            // addonBefore,
            defaultValue,
            autoComplete,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            readOnly,
            value,
            defaultChecked,
          }}
          autoCapitalize="sentences"
          onKeyUp={(e: any) => {
            if (onChange) {
              onChange(e);
            }
          }}
          onBlur={(e: any) => {
            if (onBlur) {
              onBlur(e);
            }
          }}
          onClick={(e: any) => {
            if (onClick) {
              onClick(e);
            }
          }}
        />
        {suffix && (
          <span className="ant-input-suffix absolute z-[1] right-[10px]">
            {suffix}
          </span>
        )}
      </div>
      {showError && error && (
        <span className="ant-typography ant-typography-danger text-red block mt-1">
          {error}
        </span>
      )}
    </>
  );
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    register,
    formState,
    id,
    label,
    placeholder,
    defaultValue,
    className = "!h-[68px]",
    autoCapitalize,
    autoComplete,
    minLength,
    rows,
    maxLength,
    min,
    max,
    showError = true,
    disabled,
    readOnly,
    onChange = null,
  } = props;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (
      formState &&
      formState?.errors &&
      formState?.errors[id] &&
      formState?.errors[id].message
    ) {
      setError(formState?.errors[id].message);
    }
    return () => {
      setError(null);
    };
  }, [formState, id]);

  return (
    <>
      {label && (
        <div className="block pb-1 font-medium">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="">
        <textarea
          {...register(id)}
          {...{
            id,
            className: `${className} ${error ? "input-status-error" : ""}`,
            defaultValue,
            autoCapitalize,
            autoComplete,
            placeholder,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            rows,
            readOnly,
          }}
          onKeyUp={(e: any) => {
            if (onChange) {
              onChange(e);
            }
          }}
        />
        {showError && error && (
          <span className="typography typography-danger font-semibold text-red block pt-2">
            {error}
          </span>
        )}
      </div>
    </>
  );
};
