import { useState } from "react";
import { bookCar } from "../services/api";

function BookingModal({ carId, close }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  });

  const handleBooking = async () => {
    try {

      if (!dates.startDate || !dates.endDate) {
        alert("Please select both dates");
        return;
      }

      if (dates.endDate <= dates.startDate) {
        alert("End date must be after start date");
        return;
      }

      await bookCar(user.id, carId, {
        startDate: dates.startDate,
        endDate: dates.endDate
      });

      alert("Booking Successful ✅");
      close();
      window.location.reload();

    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking Failed ❌ Check console");
    }
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <h3>Select Rental Dates</h3>

        <label>Start Date</label>
        <input
          type="date"
          value={dates.startDate}
          onChange={(e) =>
            setDates({ ...dates, startDate: e.target.value })
          }
        />

        <label>End Date</label>
        <input
          type="date"
          value={dates.endDate}
          onChange={(e) =>
            setDates({ ...dates, endDate: e.target.value })
          }
        />

        <div className="modal-buttons">
          <button onClick={handleBooking}>
            Confirm Booking
          </button>

          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;