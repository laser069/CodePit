import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/profile');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-black">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          CodePit
        </motion.h1>
      </div>

      {/* Divider Line (only visible on large screens) */}
      <div className="hidden lg:block w-px bg-white/30"></div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white text-black w-full max-w-md p-8 rounded-xl shadow-lg"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center mb-6"
          >
            Register
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              className="w-full p-3 rounded-md border border-black bg-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              className="w-full p-3 rounded-md border border-black bg-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              className="w-full p-3 rounded-md border border-black bg-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-black text-white py-3 rounded-md shadow hover:bg-white hover:text-black border border-black transition-colors"
              type="submit"
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

