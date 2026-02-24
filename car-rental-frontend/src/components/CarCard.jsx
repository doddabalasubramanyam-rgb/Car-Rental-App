import { useState } from "react";
import BookingModal from "./BookingModal";

function CarCard({ car }) {

  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="card car-card">
      <div className="car-header">
        <h3>{car.brand} {car.model}</h3>
        <span className={car.available ? "status-available" : "status-booked"}>
          {car.available ? "Available" : "Booked"}
        </span>
      </div>

      <p className="price">₹ {car.pricePerDay} / day</p>

      {car.available && user?.role === "CUSTOMER" && (
        <button onClick={() => setOpen(true)}>Book Now</button>
      )}

      {open && (
        <BookingModal
          carId={car.id}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default CarCard;