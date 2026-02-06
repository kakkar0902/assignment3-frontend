const CustomerDetails = () => {

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: 600,
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Customer Details</h2>
      <div style={{ lineHeight: 1.8 }}>
        <div><strong>ID:</strong></div>
        <div><strong>Name:</strong></div>
        <div><strong>Email:</strong></div>
        <div><strong>Phone:</strong></div>
        <div><strong>Member Since:</strong></div>
        <div><strong>Status:</strong></div>
        <div style={{ marginTop: '1rem' }}>
          <strong>Address:</strong>
          <div style={{ marginLeft: '1rem' }}>
            <div><strong>Street:</strong></div>
            <div><strong>City:</strong></div>
            <div><strong>Province:</strong></div>
            <div><strong>Postal Code:</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;