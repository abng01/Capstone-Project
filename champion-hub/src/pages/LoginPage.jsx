import { useUser } from "../components/context/UserContext";
import { useState } from "react";

export default function LoginPage() {
  const { login, user, logout } = useUser();
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    try {
      await login({ username });
      alert("Logged in!");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}
