import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  PlusCircle,
  Trash2,
  Calendar,
  Tag,
  DollarSign,
  Pencil,
} from "lucide-react";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setExpenses(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount, category, date }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle("");
        setAmount("");
        setDate("");
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to Delete this Expense")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/expenses/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            amount,
            category,
            date,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setEditingId(null);
        setTitle("");
        setAmount("");
        setCategory("Food");
        setDate("");

        fetchExpenses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalExpense = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cards for Stats */}
      <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-md flex justify-between items-center">
        <div>
          <p className="text-indigo-100 text-sm uppercase font-semibold tracking-wider">
            Total Balance Spent
          </p>
          <h3 className="text-3xl font-bold mt-1">
            ₹{totalExpense.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <DollarSign className="h-8 w-8" />
        </div>
      </div>

      {/* Main Grid: Form + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PlusCircle className="text-indigo-600" /> Add New Expense
          </h2>
          <form
            onSubmit={editingId ? handleUpdateExpense : handleAddExpense}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Rent, Groceries..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
            >
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>
        </div>

        {/* Expense Tracking List Layout */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Expense Records
          </h2>
          {expenses.length === 0 ? (
            <div className="bg-gray-50 text-center py-12 rounded-xl border border-dashed text-gray-500">
              There are no expenses to display. Use the form to add some!
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:shadow-md"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-indigo-500" />{" "}
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-purple-500" />{" "}
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 border-t sm:border-none pt-2 sm:pt-0">
                    <span className="text-xl font-bold text-red-600">
                      ₹{item.amount}
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setTitle(item.title);
                        setAmount(item.amount);
                        setCategory(item.category);

                        setDate(
                          new Date(item.date).toISOString().split("T")[0],
                        );
                      }}
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"
                      title="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
