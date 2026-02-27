import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (data) => {
    console.log(data)
      const response = await fetch(
        "https://assignment2-restapi-kakkar0902.onrender.com/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/admin/home");
    },
    onError: (error) => {
      console.error("Registration Error:", error.message);
    },
  });

  const onSubmit = (formData) => {
    const { confirmPassword, ...dataToSubmit } = formData;
    registerMutation.mutate(dataToSubmit);
  };

  const password = watch("password", "");

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          {...register("firstName", { required: "First Name required" })}
          placeholder="First Name"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <input
          {...register("lastName", { required: "Last Name required" })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("password", { required: "Password required" })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("confirmPassword", {
            required: "Confirm Password required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;