"use client";
import QuizDashboard from "@/components/quiz/QuizDashboard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Link from "next/link";

export default function DynamicQuizPage() {
  const params = useParams();
  const { quizId } = params;

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Try block to catch errors
        const response = await fetch(`/api/quiz?quizId=${quizId}`);

        if (!response.ok) {
          throw new Error("Quiz not found"); // Throw an error for non-200 responses
        }

        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        // Catch block to handle errors
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    fetchQuizData();
  }, [quizId]); // Added quizId to dependency array

  if (loading) {
    return (
      <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-3 py-5">
        <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex flex-col justify-center items-center">
          <p className="font-semibold text-[20px]">Quiz not found</p>
          <p>
            The quiz you are looking for does not found or have been deleted,
            <Link href={"/quiz"}>quiz</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 py-5">
      <QuizDashboard quizData={quizData?.data} />
    </div>
  );
}
