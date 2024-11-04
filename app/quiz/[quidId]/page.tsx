"use client";

import QuizDashboard from "@/components/quiz/QuizDashboard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicQuizPage() {
  const params = useParams();
  const { quidId } = params;

  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await fetch(`/api/quiz?quizId=${quidId}`);
      const data = await response.json();

      setQuizData(data);
    };

    fetchQuizData();
  }, []);

  return (
    <div className="container mx-auto px-3 py-5">
      <QuizDashboard quizData={quizData?.data} />
    </div>
  );
}
