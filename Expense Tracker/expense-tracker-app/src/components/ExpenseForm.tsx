import { useForm } from "react-hook-form";
import categories from "../categories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// validation and shape using zod
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 letters" })
    .max(50),
  amount: z.number({ invalid_type_error: "Amount field is required" }),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Select a category.",
    }),
  }),
});

// setting a type
type ExpenseFormData = z.infer<typeof schema>;

// shape using interface
interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handles data
        onSubmit(data);
        // resets form input fields
        reset();
      })}
      className="mb-5"
    >
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
        {/* error checking */}
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
        {/* error checking */}
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      {/* options */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} className="form-select" id="category">
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
        {/* error checking */}
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
