import { useEffect, useMemo, useState } from "react";
import {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from "../services/googleSheet";

import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  Clock,
  Layers,
  X,
} from "lucide-react";


export default function Pantry() {

  // ===============================
  // STATE
  // ===============================

  const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingItem, setEditingItem] = useState(null);


  const emptyForm = {
    id: Date.now(),
    ingredient: "",
    quantity: "",
    unit: "",
    purchaseDate: "",
    expiryDate: "",
    category: "",
  };

  const [form, setForm] = useState(emptyForm);


  // ===============================
  // LOAD INGREDIENTS
  // ===============================

  async function loadIngredients() {

    try {

      setLoading(true);

      const data = await getIngredients();

      setIngredients(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load pantry");

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadIngredients();

  }, []);


  // ===============================
  // FORM CHANGE
  // ===============================

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }


  // ===============================
  // ADD / UPDATE
  // ===============================

  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.ingredient.trim()) {

      toast.error("Please enter an ingredient");

      return;

    }


    try {

      if (editingItem) {

        const result = await updateIngredient({
          ...form,
          row: editingItem._row,
        });

        if (result.success) {

          toast.success("Ingredient updated!");

        } else {

          toast.error(result.message || "Update failed");

        }

      } else {

        const result = await addIngredient(form);

        if (result.success) {

          toast.success("Ingredient added!");

        } else {

          toast.error(result.message || "Failed to add ingredient");

        }

      }


      setForm({
        ...emptyForm,
        id: Date.now(),
      });

      setEditingItem(null);

      setShowForm(false);

      await loadIngredients();


    } catch (error) {

      console.error(error);

      toast.error("Something went wrong");

    }

  }


  // ===============================
  // EDIT
  // ===============================

  function handleEdit(item) {

    setEditingItem(item);

    setForm({
      id: item.ID || Date.now(),
      ingredient: item.Ingredient || "",
      quantity: item.Quantity || "",
      unit: item.Unit || "",
      purchaseDate: formatDate(item.PurchaseDate),
      expiryDate: formatDate(item.ExpiryDate),
      category: item.Category || "",
    });

    setShowForm(true);

  }


  // ===============================
  // DELETE
  // ===============================

  async function handleDelete(item) {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${item.Ingredient}?`
    );

    if (!confirmed) return;


    try {

      const result = await deleteIngredient(item._row);

      if (result.success) {

        toast.success("Ingredient deleted!");

        await loadIngredients();

      } else {

        toast.error(result.message || "Delete failed");

      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete ingredient");

    }

  }


  // ===============================
  // FORMAT DATE
  // ===============================

  function formatDate(date) {

    if (!date) return "";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toISOString().split("T")[0];

  }


  // ===============================
  // EXPIRY STATUS
  // ===============================

  function getExpiryStatus(expiryDate) {

    if (!expiryDate) {

      return {
        label: "No expiry date",
        className: "bg-gray-100 text-gray-600",
      };

    }


    const today = new Date();

    today.setHours(0, 0, 0, 0);


    const expiry = new Date(expiryDate);

    expiry.setHours(0, 0, 0, 0);


    const difference =
      Math.ceil(
        (expiry - today) /
        (1000 * 60 * 60 * 24)
      );


    if (difference < 0) {

      return {
        label: "Expired",
        className: "bg-red-100 text-red-700",
      };

    }


    if (difference <= 3) {

      return {
        label: "Expiring Soon",
        className: "bg-orange-100 text-orange-700",
      };

    }


    return {
      label: "Fresh",
      className: "bg-green-100 text-green-700",
    };

  }


  // ===============================
  // CATEGORIES
  // ===============================

  const categories = useMemo(() => {

    const uniqueCategories = ingredients
      .map((item) => item.Category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];

  }, [ingredients]);


  // ===============================
  // FILTER
  // ===============================

  const filteredIngredients = useMemo(() => {

    return ingredients.filter((item) => {

      const matchesSearch =
        item.Ingredient
          ?.toLowerCase()
          .includes(search.toLowerCase());


      const matchesCategory =
        categoryFilter === "All" ||
        item.Category === categoryFilter;


      return matchesSearch && matchesCategory;

    });

  }, [ingredients, search, categoryFilter]);


  // ===============================
  // DASHBOARD STATS
  // ===============================

  const expiringSoonCount = ingredients.filter((item) => {

    const status = getExpiryStatus(item.ExpiryDate);

    return status.label === "Expiring Soon";

  }).length;


  const categoryCount =
    new Set(
      ingredients
        .map((item) => item.Category)
        .filter(Boolean)
    ).size;


  // ===============================
  // UI
  // ===============================

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-6 md:p-8">


        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-900">
              My Pantry
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your ingredients and keep track of expiry dates.
            </p>

          </div>


          <button
            onClick={() => {

              setEditingItem(null);

              setForm({
                ...emptyForm,
                id: Date.now(),
              });

              setShowForm(true);

            }}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >

            <Plus size={20} />

            Add Ingredient

          </button>

        </div>


        {/* DASHBOARD CARDS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">


          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Total Ingredients
                </p>

                <p className="text-3xl font-bold mt-2">
                  {ingredients.length}
                </p>

              </div>

              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <Package size={25} />
              </div>

            </div>

          </div>


          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Expiring Soon
                </p>

                <p className="text-3xl font-bold mt-2">
                  {expiringSoonCount}
                </p>

              </div>

              <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                <Clock size={25} />
              </div>

            </div>

          </div>


          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Categories
                </p>

                <p className="text-3xl font-bold mt-2">
                  {categoryCount}
                </p>

              </div>

              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <Layers size={25} />
              </div>

            </div>

          </div>


        </div>


        {/* SEARCH + FILTER */}

        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">

          <div className="flex flex-col md:flex-row gap-4">


            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>


            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>


          </div>

        </div>


        {/* INGREDIENTS */}

        {loading ? (

          <div className="text-center py-20">

            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto">
            </div>

            <p className="mt-4 text-gray-500">
              Loading your pantry...
            </p>

          </div>

        ) : filteredIngredients.length === 0 ? (

          <div className="bg-white rounded-2xl p-12 text-center">

            <Package
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-bold mt-4">
              No ingredients found
            </h2>

            <p className="text-gray-500 mt-2">
              Add ingredients to start building your pantry.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">


            {filteredIngredients.map((item, index) => {

              const expiryStatus =
                getExpiryStatus(item.ExpiryDate);


              return (

                <div
                  key={item._row || index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"
                >


                  {/* TOP */}

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-xl font-bold text-gray-900">
                        {item.Ingredient}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {item.Quantity} {item.Unit}
                      </p>

                    </div>


                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${expiryStatus.className}`}
                    >
                      {expiryStatus.label}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div className="mt-5 space-y-2 text-sm text-gray-600">

                    <p>
                      <strong>Category:</strong>{" "}
                      {item.Category || "Not specified"}
                    </p>

                    <p>
                      <strong>Purchase Date:</strong>{" "}
                      {formatDate(item.PurchaseDate) || "N/A"}
                    </p>

                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {formatDate(item.ExpiryDate) || "N/A"}
                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex gap-3 mt-6 pt-5 border-t">

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition"
                    >

                      <Pencil size={16} />

                      Edit

                    </button>


                    <button
                      onClick={() =>
                        handleDelete(item)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
                    >

                      <Trash2 size={16} />

                      Delete

                    </button>

                  </div>


                </div>

              );

            })}


          </div>

        )}


      </div>


      {/* ADD / EDIT MODAL */}

      {showForm && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">


            {/* MODAL HEADER */}

            <div className="flex justify-between items-center p-6 border-b">

              <h2 className="text-2xl font-bold">

                {editingItem
                  ? "Edit Ingredient"
                  : "Add Ingredient"}

              </h2>


              <button
                onClick={() => {

                  setShowForm(false);

                  setEditingItem(null);

                }}
                className="text-gray-500 hover:text-gray-800"
              >

                <X size={25} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 grid md:grid-cols-2 gap-5"
            >


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Ingredient
                </label>

                <input
                  name="ingredient"
                  value={form.ingredient}
                  onChange={handleChange}
                  placeholder="e.g. Eggs"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>

                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Unit
                </label>

                <input
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  placeholder="e.g. pieces, kg, liters"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Dairy"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Purchase Date
                </label>

                <input
                  type="date"
                  name="purchaseDate"
                  value={form.purchaseDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

              </div>


              {/* BUTTONS */}

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => {

                    setShowForm(false);

                    setEditingItem(null);

                  }}
                  className="px-5 py-3 border rounded-xl"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                >

                  {editingItem
                    ? "Update Ingredient"
                    : "Add Ingredient"}

                </button>

              </div>


            </form>

          </div>

        </div>

      )}

    </div>

  );

}