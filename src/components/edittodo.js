import React, { useState } from "react";
const EditTodo = ({ todo, onCancel, onUpdated }) => {
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        window.location = '/';
        return;
      }
      onUpdated();
    } catch (err) {
      console.error(err);
      alert('error while updating todo');
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-success ms-2">save</button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={onCancel}
      >
        cancel
      </button>
    </form>
  );
};

export default EditTodo;