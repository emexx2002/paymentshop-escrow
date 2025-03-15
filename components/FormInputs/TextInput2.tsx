'use client'
import React from "react";
import { FieldAttributes, useField } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface TextInputProps extends FieldAttributes<any> {
  label?: string;
  name: string;
  rightIcon?: any;
  tooltip?: string;
  wrapperClass?: string;
  onRightIconClick?: () => void;
}

const TextInput = ({
  leftIcon,
  tooltip,
  rightIcon,
  wrapperClass,
  label,
  name, // name must contain a value and not an empty string
  onRightIconClick,
  ...restProps
}: TextInputProps) => {
  const [field, meta, helpers] = useField(name);

  const handlePhoneChange = (value: string) => {
    helpers.setValue(value);
  };

  const handlePhoneBlur = () => {
    helpers.setTouched(true);
  };
  return (
    <div className={`flex flex-col ${wrapperClass} w-full text-xs md:text-sm lg:text-base`}>
      <div className="flex w-full justify-between items-center gap-1">
      {label && (
        <label
          htmlFor={restProps?.id || name}
          className='font-normal text-sm  capitalize mb-1'
        >
          {label}
        </label>
      )}

      {
        tooltip && (
          <div className="group relative mb-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div className="invisible  text-xs group-hover:visible absolute z-10 w-64 p-2 text-gray-500 bg-white border rounded shadow-lg">
                {tooltip}
            </div>
        </div>
        )
      }
      </div>
      

      <div className='relative'>
        {name === "phone" || name === "backUpPhoneNumber" ? (
          <PhoneInput
            country={"ng"}
            onlyCountries={["ng"]}
            areaCodes={{ ng: ['234'] }}
            value={field.value}
            inputClass={`w-full h-[44px] text-sm !border-none !w-full`}
            containerClass={`w-full rounded-[10px] border ${meta.touched && meta.error
                ? "border-red-600"
                : "border-[#D0D5DD]"
              } p-1.5`}
            buttonClass={` !border-none !bg-white`}
            placeholder='+23420202020'
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
          />
        ) : (
          <input
            className={`w-full h-[44px] text-sm  py-2.5 focus:outline-none appearance-none no-arrows ${rightIcon ? "pr-11 pl-3" : "px-3"} rounded-[10px] bg-white border ${meta.touched && meta.error
                ? "border-red-600"
                : "border-[#D0D5DD]"
              }`}
            {...field}
            {...restProps}
          />
        )}

        {rightIcon && (
          <i
            onClick={() => (onRightIconClick ? onRightIconClick() : null)}
            className='absolute top-1/2 -translate-y-1/2 right-2.5 cursor-pointer'
          >
            {rightIcon}
          </i>
        )}
      </div>
      {meta.touched && meta.error ? (
        <small className='text-red-600 mt-1 text-[10px]'>{meta.error}</small>
      ) : null}
    </div>
  );
};

export default TextInput;
