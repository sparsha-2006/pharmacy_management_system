import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();

  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Order Details" />

        <div className="card">
          <h2>Order #{id}</h2>

          <br />

          <p>
            Customer : Rahul Sharma
          </p>

          <p>
            Medicine : Paracetamol
          </p>

          <p>
            Quantity : 2
          </p>

          <p>
            Total : ₹40
          </p>

          <p>
            Status : Delivered
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;