function CustomerTable({ customers }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {customers &&
          customers.map((customer) => {
            return (
              <>
                <tr key={customer.id}>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.status}</td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
}

export default CustomerTable;
