import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useAuthContext();


  const mutation = useMutation({
    mutationFn: async (data) => {
      // Placeholder for mutation function to add a customer
      const response = fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      return (await response).json();
    },
    onSuccess: () => {
      console.log('Mutation completed successfully');
      queryClient.invalidateQueries({queryKey: ['customerCache']});
      navigate('/admin/customers');
    },
    onError: (error) => {
      console.log('Error adding customer:', error);
    }
  });

  function processData(data){
    console.log('Form Data Submitted: ', data);

    mutation.mutate(data);

  }

  return (
    <div className="add-customer-form-container" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Customer</h2>
      <form onSubmit={handleSubmit(processData)}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: 4 }}>First Name</label>
          <input {...register('firstName', { required: true })} type="text" id="firstName" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.firstName && <span style={{ color: 'red', fontSize: 10 }}>First name is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: 4 }}>Last Name</label>
          <input {...register('lastName', { required: true })} type="text" id="lastName" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.lastName && <span style={{ color: 'red', fontSize: 10 }}>Last name is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input {...register('email', { required: true })} type="text" id="email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.email && <span style={{ color: 'red', fontSize: 10 }}>Email is required</span>}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="status" style={{ display: 'block', marginBottom: 4 }}>Status</label>
          <select {...register('status')} id="status" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={{ flex: 1, padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
            Add Customer
          </button>
          <button
            type="button"
            style={{ flex: 1, padding: 10, background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
