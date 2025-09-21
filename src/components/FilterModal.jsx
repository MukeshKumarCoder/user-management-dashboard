import React, { useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const FilterModal = ({ isOpen, onClose, filters, setFilters, onApply }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
  });

  useEffect(() => {
    reset({
      firstName: filters.firstName || "",
      lastName: filters.lastName || "",
      email: filters.email || "",
      department: filters.department || "",
    });
  }, [filters, reset]);

  const onFormSubmit = (data) => {
    const trimmedFilters = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      department: data.department.trim(),
    };
    setFilters(trimmedFilters);
    onApply();
  };

  if (!isOpen) return null;

  const filterFields = [
    { key: "firstName", label: "First Name", type: "text" },
    { key: "lastName", label: "Last Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "department", label: "Department", type: "text" },
  ];

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Filter Users</h2>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-3"
      >
        {filterFields.map(({ key, label, type }) => (
          <div key={key} className="flex flex-col">
            <input
              type={type}
              placeholder={label}
              {...register(key, {
                ...(key === "email" && {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }),
              })}
              className={`w-full px-3 py-2 border rounded-md outline-none ${
                errors[key] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[key] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[key].message}
              </span>
            )}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid} // Disable if form is invalid
            className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterModal;
