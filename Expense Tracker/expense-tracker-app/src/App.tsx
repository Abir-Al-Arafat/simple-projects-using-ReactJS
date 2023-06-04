import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import categories from "./data/categories";
import expensesList from "./data/expenseList";

function App() {
  // dummy expense list
  // const expensesList = [
  //   { id: 1, description: "Cereals", amount: 10, category: "Groceries" },
  //   { id: 2, description: "Cable", amount: 50, category: "Utilities" },
  //   { id: 3, description: "Concert", amount: 30, category: "Entertainment" },
  //   { id: 4, description: "Internet Bill", amount: 20, category: "Utilities" },
  // ];

  // expenses and categories
  const [expenses, setExpenses] = useState(expensesList);
  const [selectedCategory, setSelectedCategory] = useState("");

  // visible expenses
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  // checking the existence of expenses
  if (expenses.length === 0)
    return (
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      ></ExpenseForm>
    );

  return (
    <div>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      ></ExpenseForm>
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((e) => e.id !== id));
        }}
      />
    </div>
  );
}

export default App;
