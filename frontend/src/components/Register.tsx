import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface RegisterProps {
  onSubmit: (user: {id: number; email: string}) => void
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      try {        
        const response = await api.post("/api/register", {email, password}, { withCredentials: true });
        onSubmit({...response.data})
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setError("");
        navigate("/todos");
      } catch (error) {
        console.error("Error registering user");
        setError("There was an error registering a new user");
      };
    } else {
      setError("Passwords must match. Please double-check and try again.");
    }
  };

  return (
    <>
      {error}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl">Register:</h1>
        <form className="flex flex-col gap-2" onSubmit={handleRegister} >
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}  
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}  
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type={showPassword ? "text" : "password"}
            name="passwordconfirm"
            placeholder="Re-type Password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}  
          />
          <div>
            <input className="me-2" type="checkbox" name="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button className="button success" type="submit">Register!</button>
        </form>
      </div>
    </>
  );
};

export default Register;