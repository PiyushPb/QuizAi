"use client";

import QuizDashboard from "@/components/quiz/QuizDashboard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function DynamicQuizPage() {
  const params = useParams();
  const { quizId } = params; // Changed quidId to quizId for consistency

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quiz?quizId=${quizId}`);
        if (!response.ok) {
          throw new Error("Quiz not found");
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        setQuizData(null); // Set to null if there was an error
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) {
    return (
      <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }

  if (!quizData || !quizData.data) {
    return (
      <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex flex-col justify-center items-center">
        <p className="font-semibold text-[20px]">Quiz not found</p>
        <p>
          The quiz you are looking for does not found or have been deleted, please check the
          url or make your own <Link href={"/quiz"}>quiz</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 py-5">
      <QuizDashboard quizData={quizData.data} />
    </div>
  );
}
