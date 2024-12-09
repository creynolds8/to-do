import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface NavbarProps {
  user: { id: number; email: string } | null
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await api.post("/api/logout");
      handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out.")
    }
  }
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 min-h-16 bg-gray-300">
        <Link to={"/"}>
          <span className="text-xl">
            To-Done!
          </span>
        </Link>
          {user &&
          <>
            User Id: {user.id}
            <Link to={"/"} className="button danger hover:bg-red-500">
              <button onClick={onLogout}>
                Logout
              </button>
            </Link> 
          </>
          
          // <Link to={"/login"} className="button success bg-green-500">Login</Link>
          }  
      </nav>
    </>
  );
};

export default Navbar;