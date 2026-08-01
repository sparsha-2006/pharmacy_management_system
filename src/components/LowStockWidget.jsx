function LowStockWidget() {
  const lowStock = [
    { id: 1, name: "Benadryl", stock: 18 },
    { id: 2, name: "Crocin", stock: 12 },
    { id: 3, name: "Cetirizine", stock: 9 },
    { id: 4, name: "Amoxicillin", stock: 20 },
  ];

  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "20px", color: "#dc2626" }}>
        ⚠️ Low Stock Medicines
      </h2>

      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Remaining Stock</th>
          </tr>
        </thead>

        <tbody>
          {lowStock.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td style={{ color: "red", fontWeight: "bold" }}>
                {item.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockWidget;