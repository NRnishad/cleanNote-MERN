import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../stores/authSlice';
import { toast } from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (status === 'failed' && error) {
      toast.error(error);
    }
  }, [isAuthenticated, navigate, status, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">Login</h2>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
              Login
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            No account? <Link to="/register" className="link-primary link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;