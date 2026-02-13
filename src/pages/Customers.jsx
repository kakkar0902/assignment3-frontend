import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const Customers = () => {
  const fetchCustomers = async () => {
    const response = await fetch("http://localhost:3000/customers");
    const data = await response.json();
    return data;
  };

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customerCache"],
    queryFn: fetchCustomers,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Customers</h1>
      <p>Welcome to the admin Customers.</p>
      <Outlet context={{ customers, isLoading, error }} />
    </div>
  );
};

export default Customers;
