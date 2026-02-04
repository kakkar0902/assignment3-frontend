import { useQuery } from "@tanstack/react-query";
import CustomerTable from "../components/customers/CustomerTable";
import { FaSpinner } from "react-icons/fa";

const fetchCustomers = async () => {
  const response = await fetch("http://localhost:3000/customers");
  const data = await response.json();
  return data;
};

const Customers = () => {
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
      {error ? (
        <p className="text-red-500">
          Error fetching customers: {error.message}
        </p>
      ) : isLoading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" />
          <p>Loading customers...</p>
        </div>
      ) : (
        <CustomerTable customers={customers} />
      )}
    </div>
  );
};

export default Customers;

 