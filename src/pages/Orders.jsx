import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";

const orders = [
  {
    id: 101,
    customer: "Rahul",
    medicine: "Paracetamol",
    quantity: 2,
    total: 40,
    status: "Delivered",
  },
  {
    id: 102,
    customer: "Sneha",
    medicine: "Dolo 650",
    quantity: 1,
    total: 35,
    status: "Pending",
  },
  {
    id: 103,
    customer: "Kiran",
    medicine: "Benadryl",
    quantity: 3,
    total: 285,
    status: "Delivered",
  },
];

function Orders() {
  return (
    <>
      <Sidebar />

      <div className="page">
        <Navbar title="Orders" />

        <h1 style={{ marginBottom: 25 }}>
          Customer Orders
        </h1>

        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
}

export default Orders;