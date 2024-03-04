import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  backendUrlAtom,
  isAuthenticatedAtom,
  todoListAtom,
  usernameAtom,
} from "../atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const [todos, setTodos] = useRecoilState(todoListAtom);
  setTodos(todos || []);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setusername = useSetRecoilState(usernameAtom);

  const backendUrl = useRecoilValue(backendUrlAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    document.body.style.backgroundImage = "url(/todo-bg.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    const sortedTodos = [...todos].sort((a: any, b: any) => b.id - a.id);
    setTodos(sortedTodos);

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
    };
  }, [isAuthenticated, navigate]);

  const logOutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setusername("");
    navigate("/login");
  };

  async function deleteTodoHandler(
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.delete(`${backendUrl}/api/todos`, {
        data: {
          id: id,
        },
      });
      setErrorMessage("");
      setTodos((prevTodos) => prevTodos.filter((todo: any) => todo.id !== id));
      console.log(response.data);
    } catch (error: any) {
      setErrorMessage(error.response.data.error);
      console.log(error);
    } finally {
      setSuccessMessage("");
      setIsLoading(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/api/todos`, {
        userId: localStorage.getItem("userId"),
        title,
        description,
      });
      const newTodo = { id: response.data.id, title, description };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setTitle("");
      setDescription("");
      setErrorMessage("");
      setSuccessMessage(response.data.message);
      console.log(response.data);
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error.response.data.error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-3 md:mb-0">
        <h1 className="text-2xl font-bold m-1 p-2">Todo app in Typescript!</h1>
        <button
          onClick={logOutHandler}
          className="bg-slate-500 active:bg-slate-700 text-white rounded-md m-2 p-2 text-xl"
          disabled={isLoading}
        >
          Log out
        </button>
      </div>
      <div className="flex-col flex items-center justify-center p-4">
        <form
          onSubmit={handleFormSubmit}
          className="backdrop-blur-md p-8 rounded-md shadow-md w-full max-w-md border-2 border-black mb-4"
        >
          <h1 className="text-2xl font-bold mb-4">Add Todo:</h1>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-xl mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-xl mb-4 drop-shadow-md shadow-black">
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-900"
            disabled={isLoading}
          >
            Add
          </button>
        </form>
        <div>
          {todos.length > 0 ? (
            <div className="backdrop-blur-md p-8 rounded-md shadow-md border-2 border-black text-white">
              <h1 className="text-2xl font-bold mb-4">Your Todos:</h1>
              <ul>
                {Array.isArray(todos) &&
                  todos.map((todo: any) => (
                    <li key={todo.id} className="mb-4">
                      <hr className="border-t-2 border-black my-4" />
                      <div className="flex justify-between">
                        <h2 className="text-xl font-bold pr-3 text-left">
                          {todo.title}
                        </h2>
                        <button
                          onClick={(e) => deleteTodoHandler(todo.id, e)}
                          className="text-xl backdrop-blur-md border-2 border-black text-white rounded-md p-2"
                        >
                          Delete Todo
                        </button>
                      </div>
                      <p>{todo.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p className="text-xl text-white font-bold">No todos yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}
