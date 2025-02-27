import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { algorithms } from "@/lib/algorithms";
import { AlgorithmVisualizer } from "@/components/AlgorithmVisualizer";
import { CodeDisplay } from "@/components/CodeDisplay";
import { AchievementDisplay } from "@/components/AchievementDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Algorithm() {
  const { id } = useParams();
  const algorithm = algorithms.find(a => a.id === id);

  const { data: user } = useQuery({
    queryKey: ['/api/users/1']
  });

  if (!algorithm) {
    return <div>Algorithm not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h1 className="text-3xl font-bold mb-4 text-primary">
                {algorithm.name}
              </h1>
              <p className="text-gray-600 mb-4">{algorithm.description}</p>
              <div className="flex gap-4 text-sm">
                <div>Time Complexity: {algorithm.complexity.time}</div>
                <div>Space Complexity: {algorithm.complexity.space}</div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Visualization</h2>
                  <AlgorithmVisualizer algorithm={algorithm} />
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Implementation</h2>
                  <CodeDisplay code={algorithm.code} />
                </Card>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {user && <AchievementDisplay userProgress={user.progress} />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}