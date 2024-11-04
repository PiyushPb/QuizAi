"use client";
import { Badge } from "@/components/ui/badge";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { GoStopwatch } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { IoStatsChart } from "react-icons/io5";
import { HiOutlineShare } from "react-icons/hi";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { redirect } from "next/navigation";

export default function QuizDashboard({ quizData }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberOfCurrentAnswers, setNumberOfCurrentAnswers] = useState(0);
  const [numberOfWrongAnswers, setNumberOfWrongAnswers] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [results, setResults] = useState([]); // New state to hold results
  const [statsId, setStatsId] = useState(null);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isQuizComplete) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isQuizComplete]);

  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const completeQuiz = async () => {
      if (results.length === quizData?.quiz.questions.length) {
        setIsQuizComplete(true);
        setIsConfettiVisible(true);

        const userId = localStorage.getItem("userId");
        const completedQuizData = {
          results,
          timer,
          userId,
          totalQuestions: quizData?.quiz.questions.length,
          numberOfCorrectAnswers: numberOfCurrentAnswers,
          timestamp: new Date().toISOString(),
        };

        console.log(completedQuizData);

        try {
          const response = await fetch("/api/stats", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(completedQuizData),
          });

          const data = await response.json();
          setStatsId(data.uid);
        } catch (error) {
          console.error("Error sending quiz results:", error);
        }

        // Hide confetti after a timeout
        setTimeout(() => {
          setIsConfettiVisible(false);
        }, 5000);
      }
    };

    completeQuiz();
  }, [results, quizData, timer, numberOfCurrentAnswers]);

  const handleAnswerClick = async (answer: string) => {
    const currentQuestionData = quizData?.quiz.questions[currentQuestion];
    const result = {
      question: currentQuestionData.question,
      correctAnswer: currentQuestionData.correct_ans,
      userAnswer: answer,
    };

    await setResults((prev) => [...prev, result]);

    if (answer === currentQuestionData.correct_ans) {
      toast("Correct Answer!");
      setNumberOfCurrentAnswers((prev) => prev + 1);
    } else {
      toast("Wrong Answer!");
      setNumberOfWrongAnswers((prev) => prev + 1);
    }

    if (currentQuestion < quizData?.quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div>
      {!quizData ? (
        <Skeleton className="animate-pulse rounded-md bg-primary/10 h-[50px] w-full" />
      ) : !isQuizComplete ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-md text-gray-500">
                Topic <Badge className="text-md">{quizData?.quiz.topic}</Badge>
              </h1>
              <div className="flex justify-start items-center gap-1 text-gray-600 mt-2">
                <GoStopwatch />
                {formatTimer(timer)}
              </div>
            </div>
            <Card className="w-fit p-3 flex justify-center items-center gap-4">
              <div className="flex justify-center items-center gap-1">
                <RxCheckCircled className="text-green-500 text-3xl" />
                <p className="text-lg font-bold text-green-500">
                  {numberOfCurrentAnswers}
                </p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <RxCrossCircled className="text-red-500 text-3xl" />
                <p className="text-lg font-bold text-red-500">
                  {numberOfWrongAnswers}
                </p>
              </div>
            </Card>
          </div>
          <QuizBoard
            quizData={quizData}
            currentQuestion={quizData?.quiz.questions[currentQuestion]}
            currentQuestionIndex={currentQuestion}
            answers={quizData?.quiz.questions[currentQuestion].answers}
            handleAnswerClick={handleAnswerClick}
          />
        </>
      ) : (
        <>
          {isConfettiVisible && (
            <Confetti width={width} height={height} numberOfPieces={200} />
          )}
          <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Quiz Completed!</h1>
            <div className="mt-5 flex gap-3">
              <Button
                disabled={!statsId}
                onClick={() => {
                  redirect(`/statistics/${statsId}`);
                }}
              >
                <IoStatsChart /> Statics
              </Button>
              <Button variant={"secondary"}>
                <HiOutlineShare /> Share
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function QuizBoard({
  quizData,
  currentQuestion,
  currentQuestionIndex,
  answers,
  handleAnswerClick,
}: any) {
  return (
    <div className="mx-auto mt-10">
      {!quizData ? (
        <Skeleton className="animate-pulse rounded-md bg-primary/10 h-[80px] w-full my-10" />
      ) : (
        <QuestionCard
          currentQuestion={currentQuestion?.question}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}
      <div className="flex flex-col gap-5">
        {answers?.map((answer, inx) => (
          <div key={inx}>
            <AnswerCard
              answer={answer}
              index={inx + 1}
              handleAnswerClick={handleAnswerClick}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-5">
        <Button
          onClick={() => {
            // Optionally handle next question action here
          }}
          disabled={currentQuestion >= quizData?.quiz.questions.length - 1}
        >
          Next <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
}

function QuestionCard({ currentQuestion, currentQuestionIndex }: any) {
  return (
    <Card className="p-4 flex justify-start items-center gap-5 mt-5 mb-10">
      <p className="w-[70px] p-3 flex justify-center items-center">
        {currentQuestionIndex + 1} / 5
      </p>
      <p className="text-lg text-gray-600">{currentQuestion}</p>
    </Card>
  );
}

function AnswerCard({ answer, index, handleAnswerClick }: any) {
  return (
    <Card
      className="p-4 flex justify-start items-center gap-5 hover:bg-[#181627] group transition-all duration-300 cursor-pointer select-none"
      onClick={() => handleAnswerClick(answer)}
    >
      <Card className="w-[50px] p-3 flex justify-center items-center group-hover:bg-[#181627] group-hover:text-white transition-all duration-300">
        {index}
      </Card>
      <p className="text-lg text-gray-600 group-hover:text-white transition-all duration-300">
        {answer}
      </p>
    </Card>
  );
}
