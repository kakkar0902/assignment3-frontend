import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { setToken } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Add authentication logic here
    loginMutation.mutate(data);
    navigate('/admin/home');
  };

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
      });

      // Unsuccessful response handling
      if(!response.ok) throw new Error(response.statusText);

      // Successful response handling
      return response.json();
    },
    onSuccess: (data) => {
      // Store jwt in context
      setToken(data.accessToken)
    },
    onError: (err) => {
      console.error(err);
    }
  })



  return (
    <div className="add-customer-form-container" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            {...register('email', { required: 'Email required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
            id="email"
            type="email"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="email"
          />
          {errors.email && <span style={{ color: 'red', fontSize: '10px' }}>{errors.email.message}</span>}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>Password</label>
          <input
            {...register('password', { required: 'Password required' })}
            id="password"
            type="password"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="current-password"
          />
          {errors.password && <span style={{ color: 'red', fontSize: '10px' }}>{errors.password.message}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
