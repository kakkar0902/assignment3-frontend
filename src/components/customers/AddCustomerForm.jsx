import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//import { useState } from 'react';

const AddCustomerForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm() 

  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: async (newCustomer) => {
    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    return response.json();
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["customerCache"] });
    navigate("/admin/customers");
  },

  onError: (error) => {
    console.error(error);
  },
});

  // const [firstName, setFirstName] = useState('')
 // const [lastName, setLastName] = useState('')
 // const [status, setStatus] = useState('active')

//function handleSubmit(event){
 //event.preventDefault()

//send to api endpoint


 //console.log({
   // firstName,
   // lastName,
 // })
 //}

 
function processData(data){
  console.log(data)

  mutation.mutate(data);
}

  return (
    <div className="add-customer-form-container" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Customer</h2>
      <form onSubmit={handleSubmit(processData)}>  
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: 4 }}>First Name</label>
          <input {...register("firstName", { required: "First name is required" })} id='firstName' type="text" name="firstName" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          { errors.firstName && <span style={{ color: 'red', fontSize: '10px' }}>{errors.firstName.message} </span> }
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: 4 }}>Last Name</label>
          <input {...register("lastName", { required: "Last name is required" })} id='lastName' type="text" name="lastName" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          { errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message} </span> }
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input {...register("email")} type="email" id="email" name="email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="status" style={{ display: 'block', marginBottom: 4 }}>Status</label>
          <select {...register("status")} id="status" name="status" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={{ flex: 1, padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
            Add Customer
          </button>
          <button
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
