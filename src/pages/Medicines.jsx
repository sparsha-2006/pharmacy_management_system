import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MedicineTable from "../components/MedicineTable";

function Medicines() {
  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Medicines" />

        <h1 style={{ marginBottom: 25 }}>
          Medicine Inventory
        </h1>

        <MedicineTable />
      </div>
    </>
  );
}

export default Medicines;