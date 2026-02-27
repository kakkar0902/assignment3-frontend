import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

const API_URL = "https://assignment2-restapi-kakkar0902.onrender.com";

const fetchTravel = async () => {
  const response = await fetch(`${API_URL}/travel`);
  if (!response.ok) throw new Error("Failed to fetch travel");
  return response.json();
};

const Travel = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingId, setEditingId] = useState(null);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["travel"],
    queryFn: fetchTravel,
  });

  const addMutation = useMutation({
    mutationFn: async (newTravel) => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/travel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTravel),
      });

      if (!response.ok) throw new Error("Failed to add");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTravel) => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/travel/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTravel),
        }
      );

      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel"] });
      setEditingId(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/travel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel"] });
    },
  });

  const onSubmit = (formData) => {
    if (editingId) {
      updateMutation.mutate(formData);
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setValue("destination", item.destination);
    setValue("country", item.country);
    setValue("rating", item.rating);
    setValue("budget", item.budget);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h1>Travel</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("destination", { required: true })} placeholder="Destination" />
        <input {...register("country", { required: true })} placeholder="Country" />
        <input type="number" {...register("rating", { required: true })} placeholder="Rating" />
        <input type="number" {...register("budget", { required: true })} placeholder="Budget" />

        <button type="submit">
          {editingId ? "Update Travel" : "Add Travel"}
        </button>
      </form>

      {data.map((item) => (
        <div key={item.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{item.destination}</h3>
          <p>Country: {item.country}</p>
          <p>Rating: {item.rating}</p>
          <p>Budget: ${item.budget}</p>

          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => deleteMutation.mutate(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Travel;