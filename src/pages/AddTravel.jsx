import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddTravel = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/travel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add travel");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel"] });
      reset();
      navigate("/admin/travel");
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Travel</h1>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg">
        <form
          onSubmit={handleSubmit((data) => addMutation.mutate(data))}
          className="space-y-4"
        >
          <input
            {...register("destination", { required: true })}
            placeholder="Destination"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            {...register("country", { required: true })}
            placeholder="Country"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="number"
            {...register("rating", { required: true })}
            placeholder="Rating"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="number"
            {...register("budget", { required: true })}
            placeholder="Budget"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Add Travel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTravel;