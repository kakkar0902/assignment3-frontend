import { useForm } from "react-hook-form";
import { useAuthContext } from "../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        "https://assignment2-restapi-kakkar0902.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/admin/home");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4f46e5, #9333ea)",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        background: "#ffffff",
        padding: "40px",
        width: "320px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Login
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <a href="/register">Register</a>
      </form>
    </div>
  </div>
);
}

export default Login;