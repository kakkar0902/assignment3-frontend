import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>First Name</label>
              <input
                style={styles.input}
                {...register("firstName", { required: "First name required" })}
              />
              {errors.firstName && (
                <p style={styles.error}>{errors.firstName.message}</p>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label>Last Name</label>
              <input
                style={styles.input}
                {...register("lastName", { required: "Last name required" })}
              />
              {errors.lastName && (
                <p style={styles.error}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              style={styles.input}
              {...register("email", {
                required: "Email required",
              })}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                style={styles.input}
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p style={styles.error}>{errors.password.message}</p>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                style={styles.input}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p style={styles.error}>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  card: {
    width: "500px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  row: {
    display: "flex",
    gap: "15px",
  },
  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  loginText: {
    marginTop: "15px",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;
