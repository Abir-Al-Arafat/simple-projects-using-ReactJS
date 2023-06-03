import { useState } from "react";
import Form from "./components/Form";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
// import "./App.css";

function App() {
  // dummy expense list
  const expensesList = [
    { id: 1, description: "aaa", amount: 10, category: "Groceries" },
    { id: 2, description: "bbb", amount: 50, category: "Utilities" },
    { id: 3, description: "ccc", amount: 30, category: "Entertainment" },
    { id: 4, description: "ddd", amount: 20, category: "Utilities" },
  ];

  // expenses and category
  const [expenses, setExpenses] = useState(expensesList);
  const [selectedCategory, setSelectedCategory] = useState("");

  // visible expenses
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  // checking the existence of expenses
  if (expenses.length === 0) return <Form></Form>;

  return (
    <div>
      <Form></Form>
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
