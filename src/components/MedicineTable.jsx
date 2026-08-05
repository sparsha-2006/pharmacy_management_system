import { useEffect, useState } from "react";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MedicineTable() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
  try {
    const res = await api.get("/medicines");

    console.log("Response:", res.data);
    console.log("Data:", res.data.data);
    console.log("Is Array:", Array.isArray(res.data.data));

    setMedicines(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

    fetchMedicines();
  }, []);

  const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this medicine?"
  );

  if (!confirmDelete) return;

  setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
};

  
console.log(medicines);
console.log(Array.isArray(medicines));
  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {medicines.map((medicine) => (
    <tr key={medicine.id}>
      <td>{medicine.id}</td>
      <td>{medicine.name}</td>
      <td>{medicine.category}</td>
      <td>{medicine.stock}</td>
      <td>{medicine.price}</td>

      <td>
        <FaEdit style={{ color: "blue" }} />

        <FaTrash
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDelete(medicine.id)}
        />
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}