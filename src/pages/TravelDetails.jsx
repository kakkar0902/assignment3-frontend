import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const fetchTravels = async () => {
  const response = await fetch(`${API_URL}/travel`);
  if (!response.ok) throw new Error("Failed to fetch travel data");
  return response.json();
};

const TravelDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["travel"],
    queryFn: fetchTravels,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading travel</div>;

  const travel = data.find(
    (item) => String(item.id || item._id) === String(id)
  );

  if (!travel) return <div>Travel not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Travel Details</h2>
      <p><strong>Destination:</strong> {travel.destination}</p>
      <p><strong>Country:</strong> {travel.country}</p>
      <p><strong>Rating:</strong> {travel.rating}</p>
      <p><strong>Budget:</strong> ${travel.budget}</p>
    </div>
  );
};

export default TravelDetails;