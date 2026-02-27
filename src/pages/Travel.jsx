import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";


const API_URL = import.meta.env.VITE_API_URL;

const fetchTravel = async () => {
  const response = await fetch(`${API_URL}/travel`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

const Travel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useAuthContext();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["travel"],
    queryFn: fetchTravel,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/travel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel"] });
    },
  });

  const handleProtected = (callback) => {
    if (!token) {
      navigate("/login");
    } else {
      callback();
    }
  };

  if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;

  if (error) return <div className="p-6 text-red-600">Error loading data</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Travel Management</h1>

        <button
          onClick={() => handleProtected(() => navigate("/travel/add"))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          Add Travel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Destination
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Country
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Budget
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => {
              const travelId = item._id || item.id;

              return (
                <tr key={travelId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">
                    {item.destination}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.country}</td>
                  <td className="px-6 py-4 text-gray-700">{item.rating}</td>
                  <td className="px-6 py-4 text-gray-700">${item.budget}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() =>
                        handleProtected(() =>
                          navigate(`/travel/edit/${travelId}`),
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleProtected(() => deleteMutation.mutate(travelId))
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        handleProtected(() =>
                          navigate(`/travel/view/${travelId}`),
                        )
                      }
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Travel;
