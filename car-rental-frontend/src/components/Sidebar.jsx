import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🚗 Car Rental</h2>

      <div className="user-info">
        <p><strong>{user?.name}</strong></p>
        <p>{user?.role}</p>
      </div>

      <div className="sidebar-menu">
        {user?.role === "CUSTOMER" && (
          <>
            <button>Dashboard</button>
            <button>My Bookings</button>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <button>Dashboard</button>
            <button>Manage Cars</button>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;