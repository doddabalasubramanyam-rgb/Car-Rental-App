import { useEffect, useState } from "react";
import { getUserBookings } from "../services/api";

function BookingHistory() {

  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getUserBookings(user.id)
        .then(res => setBookings(res.data));
    }
  }, []);

  if (!bookings.length) {
    return <p>No bookings yet.</p>;
  }

  return (
    <div className="booking-history">
      <h2>My Bookings</h2>

      <div className="grid">
        {bookings.map(b => (
          <div key={b.id} className="card booking-card">
            <h4>{b.car.brand} {b.car.model}</h4>

            <p>
              📅 {b.startDate} → {b.endDate}
            </p>

            <p>
              💰 ₹{b.totalPrice}
            </p>

            <span className="status-confirmed">
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;