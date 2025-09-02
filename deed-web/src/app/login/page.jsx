"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/profile");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>Login</button>
      <p style={styles.text}>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => router.push("/signup")}>
          Signup here
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10, textAlign: "center" },
  title: { marginBottom: 20 },
  input: { width: "100%", padding: 10, margin: "10px 0", borderRadius: 5, border: "1px solid #ccc" },
  button: { width: "100%", padding: 10, backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: 5, cursor: "pointer" },
  text: { marginTop: 10 },
  link: { color: "blue", cursor: "pointer" },
};
