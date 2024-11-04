"use client";

import CreateQuizForm from "@/components/quiz/CreateQuizForm";
import CreateQuiz from "@/components/quiz/CreateQuiz";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StartQuizPage() {
  useEffect(() => {
    document.title = "Quiz | QuizAI";
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [topic, setTopic] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(1);

  const { quiz } = useParams();
  const quizValue = quiz || null;

  return (
    <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex justify-center items-center">
      {activeTab === 0 && (
        <CreateQuizForm
          {...{
            topic,
            setTopic,
            noOfQuestions,
            setNoOfQuestions,
            setActiveTab,
            quizValue,
          }}
        />
      )}
      {activeTab === 1 && <CreateQuiz {...{ topic, noOfQuestions }} />}
    </div>
  );
}
