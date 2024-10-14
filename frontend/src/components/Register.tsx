import axios from "axios";
import { useState } from "react";

interface RegisterProps {
  onSubmit: (user: {id: number; email: string}) => void
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {email, password});
      onSubmit({...response.data})
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setError("");
    } catch (error) {
      console.error("Error registering user")
      setError("There was an error registering a new user")
    }
  };

  return (
    <>
      {error}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl">Register:</h1>
        <form className="flex flex-col gap-2" onSubmit={handleRegister}>
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}  
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}  
          />
          <input
            className="p-1 border-2 rounded outline-gray-400"
            type="text"
            name="passwordconfirm"
            placeholder="Re-type Password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}  
          />
          <button className="button success" type="submit">Register!</button>
        </form>
      </div>
    </>
  );
};

export default Register;