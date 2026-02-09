import { useForm } from "react-hook-form";
 
 
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
 
  const onSubmit = (data) => {
    // Add registration logic here
    alert(`Registered as ${data.firstName} ${data.lastName} (${data.email})`);
  };
 
  const password = watch('password', '');
 
  return (
    <div className="add-customer-form-container" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: 4 }}>First Name</label>
          <input
            {...register('firstName', { required: 'First Name required' })}
            id="firstName"
            type="text"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="given-name"
          />
          {errors.firstName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.firstName.message}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: 4 }}>Last Name</label>
          <input
            {...register('lastName', { required: 'Last Name required' })}
            id="lastName"
            type="text"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="family-name"
          />
          {errors.lastName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.lastName.message}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            {...register('email', { required: 'Email required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
            id="email"
            type="email"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="email"
          />
          {errors.email && <span style={{ color: 'red', fontSize: '10px' }}>{errors.email.message}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>Password</label>
          <input
            {...register('password', { required: 'Password required' })}
            id="password"
            type="password"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="new-password"
          />
          {errors.password && <span style={{ color: 'red', fontSize: '10px' }}>{errors.password.message}</span>}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 4 }}>Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Confirm Password required',
              validate: value => value === password || 'Passwords do not match'
            })}
            id="confirmPassword"
            type="password"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <span style={{ color: 'red', fontSize: '10px' }}>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};
 
export default Register;
 