import { Link } from "react-router-dom";
import {
  ChefHat,
  Package,
  Sparkles,
  Clock,
  ArrowRight,
  Leaf,
  Refrigerator,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} />
              AI-Powered Kitchen Assistant
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">

              Turn Your Pantry Into

              <span className="text-green-600">
                {" "}Delicious Meals
              </span>

            </h1>

            <p className="text-lg text-gray-600 mt-6 max-w-xl">

              Keep track of your ingredients, discover recipes with AI,
              and reduce food waste by cooking with what you already have.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/pantry"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Manage My Pantry
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/recipes"
                className="flex items-center gap-2 border-2 border-green-600 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                <Sparkles size={20} />
                Generate Recipes
              </Link>

            </div>

          </div>

          {/* Right Visual */}

          <div className="relative">

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="bg-green-100 p-3 rounded-xl">
                  <Refrigerator
                    className="text-green-600"
                    size={30}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-xl">
                    Your Smart Pantry
                  </h3>

                  <p className="text-gray-500">
                    Everything in one place
                  </p>
                </div>

              </div>

              {/* Ingredient Preview */}

              <div className="space-y-4">

                <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl">

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥚</span>

                    <div>
                      <p className="font-semibold">
                        Eggs
                      </p>

                      <p className="text-sm text-gray-500">
                        12 pcs
                      </p>
                    </div>
                  </div>

                  <span className="text-green-600 text-sm font-semibold">
                    Fresh
                  </span>

                </div>

                <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🍅</span>

                    <div>
                      <p className="font-semibold">
                        Tomatoes
                      </p>

                      <p className="text-sm text-gray-500">
                        5 pcs
                      </p>
                    </div>
                  </div>

                  <span className="text-orange-600 text-sm font-semibold">
                    Use Soon
                  </span>

                </div>

                <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🧀</span>

                    <div>
                      <p className="font-semibold">
                        Cheese
                      </p>

                      <p className="text-sm text-gray-500">
                        250 g
                      </p>
                    </div>
                  </div>

                  <span className="text-blue-600 text-sm font-semibold">
                    Fresh
                  </span>

                </div>

              </div>

              {/* AI Suggestion */}

              <div className="mt-6 bg-green-600 text-white rounded-xl p-5">

                <div className="flex items-center gap-2 font-semibold">
                  <Sparkles size={20} />
                  AI Suggestion
                </div>

                <p className="mt-2 text-green-50">
                  You have everything you need to make a delicious
                  cheese omelette!
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need for a Smarter Pantry
            </h2>

            <p className="text-gray-600 mt-3">
              PantryChef AI helps you organize, cook, and waste less.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {/* Feature 1 */}

            <div className="p-8 rounded-2xl bg-green-50 hover:shadow-lg transition">

              <div className="bg-green-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Package size={28} />
              </div>

              <h3 className="text-xl font-bold">
                Manage Your Pantry
              </h3>

              <p className="text-gray-600 mt-3">
                Keep all your ingredients organized and easily
                track quantities and expiry dates.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="p-8 rounded-2xl bg-purple-50 hover:shadow-lg transition">

              <div className="bg-purple-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Sparkles size={28} />
              </div>

              <h3 className="text-xl font-bold">
                AI Recipe Suggestions
              </h3>

              <p className="text-gray-600 mt-3">
                Let AI create delicious recipes using the ingredients
                you already have.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="p-8 rounded-2xl bg-orange-50 hover:shadow-lg transition">

              <div className="bg-orange-500 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <Leaf size={28} />
              </div>

              <h3 className="text-xl font-bold">
                Reduce Food Waste
              </h3>

              <p className="text-gray-600 mt-3">
                Track expiring ingredients and get smart suggestions
                to use them before they go to waste.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="bg-green-600 rounded-3xl p-12 text-white">

            <ChefHat
              size={50}
              className="mx-auto mb-5"
            />

            <h2 className="text-3xl font-bold">
              Ready to Cook Smarter?
            </h2>

            <p className="mt-4 text-green-100">
              Add your pantry ingredients and discover what you
              can cook today.
            </p>

            <Link
              to="/pantry"
              className="inline-flex items-center gap-2 mt-8 bg-white text-green-700 px-7 py-3 rounded-xl font-bold hover:bg-green-50 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}