import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const inventory = [
  {
    id: 1,
    name: "Paracetamol",
    stock: 120,
  },
  {
    id: 2,
    name: "Dolo 650",
    stock: 40,
  },
  {
    id: 3,
    name: "Benadryl",
    stock: 18,
  },
  {
    id: 4,
    name: "Crocin",
    stock: 12,
  },
];

function Inventory() {
  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Inventory" />

        <div className="card">

          <h2 style={{ marginBottom: "20px" }}>
            Medicine Inventory
          </h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.name}</td>

                  <td
                    style={{
                      color: item.stock < 30 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stock}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default Inventory;