"use client";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function CreateQuiz() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleCreateQuiz = () => {
    
  };

  return (
    <div>
      <div>
        <img src="./createquiz.gif" alt="" className="max-w-[500px] w-full" />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <Progress value={loadingPercentage} />
        <span>Creating quiz...</span>
      </div>
    </div>
  );
}
