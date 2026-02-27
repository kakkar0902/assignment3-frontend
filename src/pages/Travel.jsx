import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

      const response = await fetch(`${API_URL}/travel/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTravel),
      });

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
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        Travel Management
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: "10px", marginTop: "20px" }}
      >
        <input {...register("destination", { required: true })} placeholder="Destination" />
        <input {...register("country", { required: true })} placeholder="Country" />
        <input type="number" {...register("rating", { required: true })} placeholder="Rating" />
        <input type="number" {...register("budget", { required: true })} placeholder="Budget" />

        <button
          type="submit"
          style={{
            padding: "6px 12px",
            background: editingId ? "#16a34a" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Destination</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Country</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rating</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Budget</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.destination}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.country}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.rating}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ${item.budget}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: "6px 10px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMutation.mutate(item.id)}
                  style={{
                    padding: "6px 10px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Travel;