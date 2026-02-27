import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const fetchTravel = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/travel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch travel");
  return response.json();
};

const Dashboard = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["travel"],
    queryFn: fetchTravel,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const total = data.length;

 const validRatings = data
  .map((item) => Number(item.rating))
  .filter((num) => !isNaN(num));

const validBudgets = data
  .map((item) => Number(item.budget))
  .filter((num) => !isNaN(num));

const avgRating =
  validRatings.length > 0
    ? validRatings.reduce((a, b) => a + b, 0) / validRatings.length
    : 0;

const highestBudget =
  validBudgets.length > 0 ? Math.max(...validBudgets) : 0;

const lowestBudget =
  validBudgets.length > 0 ? Math.min(...validBudgets) : 0;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold">Total Destinations</h3>
          <p className="text-xl mt-2">{total}</p>
        </div>

      <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h3 className="font-semibold">Average Rating</h3>
          <p className="text-xl mt-2">{avgRating.toFixed(1)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h3 className="font-semibold">Highest Budget</h3>
          <p className="text-xl mt-2">${highestBudget}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h3 className="font-semibold">Lowest Budget</h3>
          <p className="text-xl mt-2">${lowestBudget}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;