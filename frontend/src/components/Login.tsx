import axios from "axios";
import { useState } from "react";

interface LoginProps {
  onSubmit: (user: {id: number; email: string}) => void;
};

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {      
      const response = await axios.post('/api/login', { email, password });
      onSubmit({...response.data});
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error submitting form", error)
    }
  };
  
  return (
    <>
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-xl">Login:</h1>
        <form className="flex flex-col items-center gap-2" onSubmit={handleLogin}>
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="text"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="text"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <button className="button success" type="submit">
            Login!
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;