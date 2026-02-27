import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL;

function EditTravel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchTravel = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/travel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      reset(data);
    };

    fetchTravel();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/travel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    navigate("/admin/travel");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Edit Travel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("destination")} placeholder="Destination" />
        <input {...register("country")} placeholder="Country" />
        <input type="number" {...register("rating")} placeholder="Rating" />
        <input type="number" {...register("budget")} placeholder="Budget" />
        <button type="submit">Update Travel</button>
      </form>
    </div>
  );
}

export default EditTravel;