import { useEffect, useState } from "react";
import { getCars, addCar, deleteCar } from "../services/api";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {

  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    pricePerDay: ""
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };

 const handleAdd = async () => {
  try {
    await addCar({
      brand: car.brand,
      model: car.model,
      pricePerDay: Number(car.pricePerDay),
      available: true
    });

    alert("Car Added Successfully ✅");
    loadCars();

  } catch (error) {
    console.error(error);
    alert("Failed to add car ❌");
  }
};

  const handleDelete = async (id) => {
    await deleteCar(id);
    loadCars();
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">

        <h1>Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Cars</h3>
            <p>{cars.length}</p>
          </div>

          <div className="stat-card">
            <h3>Available</h3>
            <p>{cars.filter(c => c.available).length}</p>
          </div>

          <div className="stat-card">
            <h3>Booked</h3>
            <p>{cars.filter(c => !c.available).length}</p>
          </div>
        </div>

        {/* Add Car Section */}
        <h2>Add New Car</h2>
        <div className="card add-car-form">
          <input
            placeholder="Brand"
            value={car.brand}
            onChange={e => setCar({...car, brand:e.target.value})}
          />
          <input
            placeholder="Model"
            value={car.model}
            onChange={e => setCar({...car, model:e.target.value})}
          />
          <input
            type="number"
            placeholder="Price Per Day"
            value={car.pricePerDay}
            onChange={e => setCar({...car, pricePerDay:e.target.value})}
          />
          <button onClick={handleAdd}>Add Car</button>
        </div>

        {/* Car List */}
        <h2>Manage Cars</h2>
        <div className="grid">
          {cars.map(c => (
            <div key={c.id} className="card">
              <h4>{c.brand} {c.model}</h4>
              <p>₹{c.pricePerDay} / day</p>
              <p>{c.available ? "Available" : "Booked"}</p>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;