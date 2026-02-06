import { useParams, useOutletContext } from "react-router-dom";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const { customers } = useOutletContext();

  const customer = customers.find(c => c.id == customerId);

  if (!customer) {
    return <p style={{ padding: "2rem" }}>Customer not found</p>;
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "2rem",
      margin: "2rem auto",
      maxWidth: 600,
    }}>
      <h2>Customer Details</h2>

      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Member Since:</strong> {customer.memberSince}</p>
      <p><strong>Status:</strong> {customer.status}</p>

      <h3>Address</h3>
      <p><strong>Street:</strong> {customer.address.street}</p>
      <p><strong>City:</strong> {customer.address.city}</p>
      <p><strong>Province:</strong> {customer.address.province}</p>
      <p><strong>Postal Code:</strong> {customer.address.postalCode}</p>
    </div>
  );
};

export default CustomerDetails;
