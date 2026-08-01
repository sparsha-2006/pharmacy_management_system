import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddMedicine() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later replace this with your backend API
    console.log(formData);

    toast.success("Medicine Added Successfully!");

    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
    });
  };

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Add Medicine" />

        <div
          className="card"
          style={{
            maxWidth: "650px",
            margin: "30px auto",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>
            💊 Add New Medicine
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Medicine Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Medicine Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Tablet / Syrup / Capsule"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={formData.stock}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <button
              type="submit"
              className="btn-primary"
              style={{
                marginTop: "20px",
                width: "100%",
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default AddMedicine;