import React, { useEffect, useState } from 'react'
import { getProblems } from '../services/problemService'
import type { Problem } from '../services/problemService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
    const [problems,setProblem] = useState<Problem[]>([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchProblems = async ()=>{
        try{
                const data = await getProblems()
                setProblem(data)
            
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false);
        }
    }

        fetchProblems()
        
    },[])

  if (loading) return <p className="text-center mt-20 text-white">Loading problems...</p>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">All Problems</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white text-black p-4 rounded-lg shadow cursor-pointer"
            onClick={() => navigate(`/problems/${problem.id}`)}
          >
            <h2 className="font-semibold text-lg">{problem.title}</h2>
            <p className="mt-2 text-sm">{problem.problem_statement.slice(0, 80)}...</p>
            <p className="mt-2 font-medium text-gray-600">
              {problem.examples.length} example(s)
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomePage
