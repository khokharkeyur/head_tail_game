import React from "react";

const InputField = ({ label, type, name, formik }) => {
  return (
    <div className="mb-4">
      <label className="">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        placeholder={`Enter your ${label}`} 
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default InputField;
