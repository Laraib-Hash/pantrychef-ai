import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  ChefHat,
  Home,
  Package,
  Sparkles,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [mobileMenu, setMobileMenu] = useState(false);


  // ===============================
  // DARK MODE
  // ===============================

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);


  // ===============================
  // NAV LINK STYLE
  // ===============================

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-green-700 text-white"
        : "text-green-100 hover:bg-green-700 hover:text-white"
    }`;


  return (

    <nav className="bg-green-600 dark:bg-gray-900 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 py-4">

        <div className="flex justify-between items-center">


          {/* LOGO */}

          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 text-xl font-bold"
          >

            <ChefHat size={30} />

            PantryChef AI

          </Link>


          {/* DESKTOP NAVIGATION */}

          <div className="hidden md:flex items-center gap-2">

            <NavLink
              to="/"
              className={linkClass}
            >
              <Home size={18} />
              Home
            </NavLink>


            <NavLink
              to="/pantry"
              className={linkClass}
            >
              <Package size={18} />
              My Pantry
            </NavLink>


            <NavLink
              to="/recipes"
              className={linkClass}
            >
              <Sparkles size={18} />
              AI Recipes
            </NavLink>


            {/* DARK MODE */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-green-700 dark:hover:bg-gray-700 transition"
              title="Toggle dark mode"
            >

              {darkMode ? (
                <Sun size={22} />
              ) : (
                <Moon size={22} />
              )}

            </button>

          </div>


          {/* MOBILE BUTTONS */}

          <div className="md:hidden flex items-center gap-2">


            {/* DARK MODE */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-green-700 transition"
            >

              {darkMode ? (
                <Sun size={22} />
              ) : (
                <Moon size={22} />
              )}

            </button>


            {/* MENU */}

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="p-2 rounded-lg hover:bg-green-700 transition"
            >

              {mobileMenu ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}

            </button>

          </div>

        </div>


        {/* MOBILE NAVIGATION */}

        {mobileMenu && (

          <div className="md:hidden mt-4 pb-2 space-y-2">

            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className={linkClass}
            >

              <Home size={18} />

              Home

            </NavLink>


            <NavLink
              to="/pantry"
              onClick={() => setMobileMenu(false)}
              className={linkClass}
            >

              <Package size={18} />

              My Pantry

            </NavLink>


            <NavLink
              to="/recipes"
              onClick={() => setMobileMenu(false)}
              className={linkClass}
            >

              <Sparkles size={18} />

              AI Recipes

            </NavLink>

          </div>

        )}

      </div>

    </nav>

  );
}