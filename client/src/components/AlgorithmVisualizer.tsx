import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Algorithm } from "@/lib/algorithms";

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
}

export function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number[]>([]);

  useEffect(() => {
    randomizeArray();
  }, []);

  const randomizeArray = () => {
    const newArray = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray);
    setCurrentStep([]);
  };

  const startVisualization = async () => {
    setSorting(true);
    if (algorithm.id === "bubble-sort") {
      await bubbleSort();
    }
    setSorting(false);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentStep([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
    }
    setCurrentStep([]);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4 mb-4">
        <Button 
          onClick={randomizeArray}
          variant="outline"
          disabled={sorting}
        >
          Randomize
        </Button>
        <Button 
          onClick={startVisualization}
          disabled={sorting}
        >
          Start Visualization
        </Button>
      </div>

      <div className="flex items-end gap-2 h-64">
        <AnimatePresence>
          {array.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ 
                height: value * 4,
                backgroundColor: currentStep.includes(index) 
                  ? 'rgb(147, 51, 234)' 
                  : 'rgb(79, 70, 229)'
              }}
              transition={{ duration: 0.3 }}
              className="w-8 rounded-t-md"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
