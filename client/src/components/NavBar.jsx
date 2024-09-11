import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-3">
        {isAuthenticated ? (
          <>
            <li className="text-xl font bold">
              Welcome {user.username} !
            </li>
            <li>
              <Link to='/add-task'
              className="bg-green-950 px-4 py-1 rounded-sm"
              >Add Task</Link>
            </li>
            <li>
              <Link to='/' onClick={() => logout()}
              className="bg-red-700 px-4 py-1 rounded-sm"
              >logout</Link>
            </li>

          </>
        ) : (
          <>
            <li>
              <Link to='/login'
              className="bg-green-950 px-4 py-1 rounded-sm"
              >Login</Link>
            </li>
            <li>
              <Link to='/register'
              className="bg-green-950 px-4 py-1 rounded-sm"
              >Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
