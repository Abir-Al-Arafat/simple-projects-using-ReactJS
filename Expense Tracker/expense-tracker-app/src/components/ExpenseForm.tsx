import { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { categories } from "../categories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// validation and shape using zod
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 letters" }),
  amount: z.number({ invalid_type_error: "Amount field is required" }),
});

// interface FormData {
//   name: string;
//   age: number;
// }

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  console.log(errors);
  const onSubmit = (data: FieldValues) => {
    console.log(data.description, data.amount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      {/* options */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select className="form-select" id="category">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {/* <option value="groceries">Groceries</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option> */}
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
