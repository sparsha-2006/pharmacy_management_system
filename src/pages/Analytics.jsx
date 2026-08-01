import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";

function Analytics() {
  return (
    <>
      <Sidebar />

      <div className="page">

        <Navbar title="Analytics" />

        <Charts />

      </div>
    </>
  );
}

export default Analytics;