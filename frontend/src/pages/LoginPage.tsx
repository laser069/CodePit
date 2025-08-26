import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/profile');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center mb-6"
        >
          Login
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full p-3 rounded-md border border-black
              bg-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-black
              transition duration-200
            "
          />

          {/* Password Input */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full p-3 rounded-md border border-black
              bg-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-black
              transition duration-200
            "
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="
              w-full bg-black text-white py-3 rounded-md
              shadow hover:bg-white hover:text-black border border-black
              transition-colors duration-200
            "
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
