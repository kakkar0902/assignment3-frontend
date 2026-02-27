import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Travel Dashboard
      </h2>

      {!token ? (
        <div>
          <button
            onClick={() => navigate("/login")}
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;