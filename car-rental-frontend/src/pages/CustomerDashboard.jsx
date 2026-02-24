import { useEffect, useState } from "react";
import { getCars, getUserBookings } from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CarCard from "../components/CarCard";

function CustomerDashboard() {

  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    // If not logged in → redirect
    if (!user) {
      navigate("/");
      return;
    }

    loadData();

  }, []);

  const loadData = async () => {
    try {

      setLoading(true);

      const carRes = await getCars();
      setCars(carRes.data || []);

      if (user?.id) {
        const bookingRes = await getUserBookings(user.id);
        setBookings(bookingRes.data || []);
      }

    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load dashboard data ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="layout">
        <Sidebar />
        <div className="content">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <h1>Welcome, {user?.name}</h1>

        {/* Stats Section */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Cars</h3>
            <p>{cars.length}</p>
          </div>

          <div className="stat-card">
            <h3>My Bookings</h3>
            <p>{bookings.length}</p>
          </div>

          <div className="stat-card">
            <h3>Available Cars</h3>
            <p>{cars.filter(c => c.available).length}</p>
          </div>

        </div>

        {/* Cars Section */}
        <h2>Available Cars</h2>

        {cars.length === 0 ? (
          <p>No cars available right now.</p>
        ) : (
          <div className="grid">
            {cars.map(car => (
              <CarCard
                key={car.id}
                car={car}
              />
            ))}
          </div>
        )}

        {/* Booking History */}
        <h2>My Booking History</h2>

        {bookings.length === 0 ? (
          <p>You have not made any bookings yet.</p>
        ) : (
          <div className="grid">
            {bookings.map(b => (
              <div key={b.id} className="card">
                <h4>{b.car?.brand} {b.car?.model}</h4>
                <p>{b.startDate} → {b.endDate}</p>
                <p>Status: {b.status}</p>
                <p>Total: ₹{b.totalPrice}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default CustomerDashboard;