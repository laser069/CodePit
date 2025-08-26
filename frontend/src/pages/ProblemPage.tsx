import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Problem } from '../services/problemService';
import { getProblems } from '../services/problemService';
import { motion } from 'framer-motion';

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problems = await getProblems(); // Fetch all problems
        const selected = problems.find((p) => p.id === Number(id));
        setProblem(selected || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-20">Loading problem...</p>;
  if (!problem) return <p className="text-white text-center mt-20">Problem not found</p>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        {problem.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white text-black p-6 rounded-lg shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
        <p>{problem.problem_statement}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Examples</h2>
        {problem.examples.map((ex, idx) => (
          <div key={idx} className="bg-white text-black p-4 rounded-lg mb-2">
            <p><strong>Input:</strong> {ex.input}</p>
            <p><strong>Output:</strong> {ex.output}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
        {problem.testcase.map((tc, idx) => (
          <div key={idx} className="bg-white text-black p-4 rounded-lg mb-2">
            <p><strong>Input:</strong> {tc.input}</p>
            <p><strong>Expected Output:</strong> {tc.expected_output}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
