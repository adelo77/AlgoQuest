import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Algorithm } from "@/lib/algorithms";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <motion.div whileHover={{ scale: 1.02 }}>
          <CardTitle className="text-xl font-bold text-primary mb-2">
            {algorithm.name}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            {algorithm.description}
          </CardDescription>
          <div className="flex gap-2">
            <Badge variant="secondary">
              Time: {algorithm.complexity.time}
            </Badge>
            <Badge variant="secondary">
              Space: {algorithm.complexity.space}
            </Badge>
          </div>
        </motion.div>
      </CardHeader>
    </Card>
  );
}
