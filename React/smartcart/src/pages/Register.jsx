import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = register(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="max-w-[400px] w-full p-8 md:p-10 bg-white rounded-[2rem] shadow-soft border border-gray-100">
        <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-6">
          S
        </div>
        <h2 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center text-sm font-medium mb-8">
          Join SmartCart to access premium hardware.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm font-medium placeholder:font-normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="email"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm font-medium placeholder:font-normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm font-medium placeholder:font-normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-black text-white font-bold py-3.5 rounded-xl text-sm tracking-wide hover:shadow-soft transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            Create account <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-bold hover:underline transition-all">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
