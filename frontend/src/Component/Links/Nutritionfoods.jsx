import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const API_URL =
  "https://nutrismart-backend-cm7b.onrender.com/api/foods";

const NutritionFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All India");
  const [selectedNutrient, setSelectedNutrient] = useState("All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success) {
          setFoods(data.foods || []);
        }
      } catch (error) {
        console.error("Failed to load nutrition foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        food.title?.toLowerCase().includes(searchText) ||
        food.description?.toLowerCase().includes(searchText) ||
        food.target_name?.toLowerCase().includes(searchText);

      const matchesRegion =
        selectedRegion === "All India" ||
        food.region === selectedRegion ||
        food.region === "Common";

      const matchesNutrient =
        selectedNutrient === "All" ||
        food.nutrient_type?.toLowerCase() ===
          selectedNutrient.toLowerCase();

      return matchesSearch && matchesRegion && matchesNutrient;
    });
  }, [foods, search, selectedRegion, selectedNutrient]);

  const visibleFoods = filteredFoods.slice(0, 60);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        paddingBottom: "80px",
      }}
    >
      {/* Header */}
      <section
        style={{
          padding: "70px 20px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--accent-text)",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          NutriSmart Database
        </p>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            margin: 0,
          }}
        >
          Nutrition <span style={{ color: "#22c55e" }}>Foods</span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "18px auto 0",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          Explore nutrition information from the NutriSmart food database.
        </p>
      </section>

      {/* Filters */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 35px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "min(100%, 350px)",
              padding: "13px 16px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              outline: "none",
            }}
          />

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              padding: "13px 16px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="All India">All India</option>
            <option value="North">North India</option>
            <option value="South">South India</option>
            <option value="East">East India</option>
            <option value="West">West India</option>
          </select>

          <select
            value={selectedNutrient}
            onChange={(e) => setSelectedNutrient(e.target.value)}
            style={{
              padding: "13px 16px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="All">All Nutrients</option>
            <option value="Proteins">Proteins</option>
            <option value="Carbohydrates">Carbohydrates</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Minerals">Minerals</option>
          </select>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          Showing {visibleFoods.length} of {filteredFoods.length} matching foods
        </p>
      </section>

      {/* Foods */}
      <section
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "var(--text-secondary)",
            }}
          >
            Loading nutrition database...
          </div>
        ) : visibleFoods.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "var(--text-secondary)",
            }}
          >
            No foods found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "22px",
            }}
          >
            {visibleFoods.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.015, 0.3),
                }}
                whileHover={{ y: -5 }}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  padding: "22px",
                  boxShadow: "0 8px 25px var(--shadow-color)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    alignItems: "flex-start",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "19px",
                        fontWeight: 800,
                      }}
                    >
                      {food.title}
                    </h3>

                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {food.nutrient_type || "Nutrition"}
                    </p>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "5px 9px",
                      borderRadius: "999px",
                      background: "rgba(34,197,94,0.12)",
                      color: "#16a34a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {food.region || "Common"}
                  </span>
                </div>

                {food.description && (
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "var(--text-secondary)",
                      minHeight: "40px",
                    }}
                  >
                    {food.description}
                  </p>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "9px",
                    marginTop: "18px",
                  }}
                >
                  <NutritionValue
                    label="Calories"
                    value={'${food.calories ?? 0} kcal'}
                  />

                  <NutritionValue
                    label="Protein"
                    value={'${food.protein ?? 0} g'}
                  />

                  <NutritionValue
                    label="Carbs"
                    value={'${food.carbs ?? 0} g'}
                  />

                  <NutritionValue
                    label="Fat"
                    value={'${food.fat ?? 0} g'}
                  />
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    paddingTop: "13px",
                    borderTop: "1px solid var(--border-color)",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Recommended for:{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {food.target_name}
                  </strong>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const NutritionValue = ({ label, value }) => (
  <div
    style={{
      padding: "10px",
      borderRadius: "10px",
      background: "var(--bg-primary)",
    }}
  >
    <div
      style={{
        fontSize: "10px",
        color: "var(--text-secondary)",
        marginBottom: "3px",
      }}
    >
      {label}
    </div>

    <strong style={{ fontSize: "13px" }}>{value}</strong>
  </div>
);

export default NutritionFoods;