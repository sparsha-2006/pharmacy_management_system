import { FaEdit, FaTrash } from "react-icons/fa";

const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Tablet",
    stock: 120,
    price: 20
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Capsule",
    stock: 65,
    price: 120
  },
  {
    id: 3,
    name: "Dolo 650",
    category: "Tablet",
    stock: 35,
    price: 35
  },
  {
    id: 4,
    name: "Benadryl",
    category: "Syrup",
    stock: 18,
    price: 95
  }
];

function MedicineTable() {
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
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td>{med.category}</td>

              <td
                style={{
                  color: med.stock < 30 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {med.stock}
              </td>

              <td>₹{med.price}</td>

              <td>
                <FaEdit
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    marginRight: 20,
                  }}
                />

                <FaTrash
                  style={{
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineTable;