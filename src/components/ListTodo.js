import { useEffect, useState } from "react";
import EditTodo from "./edittodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const gettodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await fetch(API_URL + "/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem('token');
        window.location = '/';
        return;
      }
      const mainData = await data.json();
      if (Array.isArray(mainData)) {
        setTodos(mainData);
      } else {
        console.error("invalid");
      }
    } catch (err) {
      console.error(err);
    }
  };

  gettodos();

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      gettodos();
    } catch (err) {
      console.error(err);
      alert('error while deleting');
    }
  };

  const startEdit = (todo) => {
    setEditingTodo(todo);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  const finishEdit = () => {
    setEditingTodo(null);
    gettodos();
  };

  return (
    <>
      <table className="table m-5">
        <thead>
          <tr>
            <th>description</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                {editingTodo && editingTodo.todo_id === todo.todo_id ? (
                  <EditTodo
                    todo={todo}
                    onCancel={cancelEdit}
                    onUpdated={finishEdit}
                  />
                ) : (
                  todo.description
                )}
              </td>
              <td>
                {editingTodo && editingTodo.todo_id === todo.todo_id ? null : (
                  <button
                    className="btn btn-warning"
                    onClick={() => startEdit(todo)}
                  >
                    edit
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ListTodo;
