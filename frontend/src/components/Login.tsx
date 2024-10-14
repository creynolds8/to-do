import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onSubmit: (user: {id: number; email: string}) => void;
};

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {      
      const response = await axios.post("/api/login", { email, password });      
      onSubmit({...response.data});
      setEmail("");
      setPassword("");
      navigate("/todos")
    } catch (error) {
      console.error("Error submitting form", error)
      setError(`Sorry, there was an error logging in. 
        Please check your login information and try again`)
    };
  };
  
  return (
    <>
      <>{error}</>
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-xl">Login:</h1>
        <form className="flex flex-col items-center gap-2" onSubmit={handleLogin}>
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <div>
            <input className="me-2" type="checkbox" name="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button className="button success" type="submit">
            Login!
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;