import { Link } from "react-router-dom";

const user = true

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 mb-4 bg-gray-300">
        <span className="text-xl">
          To-Done!
        </span>
          {user ? 
          <Link to={'/'} className="button bg-red-500">
            <button onClick={() => {console.log("logout")}}>
              Logout
            </button>
          </Link> :
          <Link to={'/login'} className="button bg-green-500">Login</Link>}  
      </nav>
    </>
  );
};

export default Navbar;