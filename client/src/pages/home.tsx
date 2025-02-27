import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlgorithmCard } from "@/components/AlgorithmCard";
import { algorithms } from "@/lib/algorithms";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Algorithm Learning Adventure
          </h1>
          <p className="text-center text-lg mb-12 text-gray-600">
            Master algorithms through interactive minigames and visualizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algorithm, index) => (
            <motion.div
              key={algorithm.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/algorithm/${algorithm.id}`}>
                <a>
                  <AlgorithmCard algorithm={algorithm} />
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
