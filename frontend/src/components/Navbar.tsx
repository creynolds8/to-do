import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  user: { id: number; email: string } | null
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/');
  }
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 mb-4 bg-gray-300">
        <span className="text-xl">
          To-Done!
        </span>
          {user ?
          <>
            {user.id} {user.email}
            <Link to={'/'} className="button danger hover:bg-red-500">
              <button onClick={onLogout}>
                Logout
              </button>
            </Link> 
          </>
          :
          <Link to={'/login'} className="button bg-green-500">Login</Link>}  
      </nav>
    </>
  );
};

export default Navbar;