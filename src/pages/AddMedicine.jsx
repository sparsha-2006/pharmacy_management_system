import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddMedicine() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    low_stock_threshold: 20,
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      await api.post("/medicines", {
        name: form.name,
        category: form.category,
        stock: Number(form.stock),
        price: Number(form.price),
        low_stock_threshold: Number(form.low_stock_threshold),
        description: form.description,
      });

      alert("Medicine Added Successfully!");

      setForm({
        name: "",
        category: "",
        stock: "",
        price: "",
        low_stock_threshold: 20,
        description: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to add medicine");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Add Medicine" />

        <h1 style={{ marginBottom: 30 }}>
          Add Medicine
        </h1>

        <div
          className="card"
          style={{
            maxWidth: "760px",
            margin: "auto",
            padding: "40px",
          }}
        >
          <h2 style={{ marginBottom: 35 }}>
            💊 Add New Medicine
          </h2>

          <form onSubmit={addMedicine}>

            <div style={{ marginBottom: 25 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                Medicine Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Medicine Name"
                value={form.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Tablet / Syrup / Capsule"
                value={form.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                Stock
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Enter Stock"
                value={form.stock}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={form.price}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            {/* Hidden fields required by backend */}

            <input
              type="hidden"
              name="low_stock_threshold"
              value={form.low_stock_threshold}
            />

            <input
              type="hidden"
              name="description"
              value={form.description}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "20px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add Medicine
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddMedicine;