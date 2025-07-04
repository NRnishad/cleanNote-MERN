import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../stores/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">NOTE TAKER</Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="font-semibold">Hi, {user?.name}</span>
                <Link to={'/create'} className="btn btn-primary">
                  <PlusIcon className='size-5' /> Create Note
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost">
                  <LogOutIcon className="size-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to={'/login'} className="btn btn-ghost">Login</Link>
                <Link to={'/register'} className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;