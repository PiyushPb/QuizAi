"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LuAward, LuTrophy } from "react-icons/lu";
import { FiTarget } from "react-icons/fi";
import { FaRegHourglass } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StatsBody() {
  const { statsId } = useParams();
  const [answerData, setAnswerData] = useState(null);

  useEffect(() => {
    const fetchAnswerData = async () => {
      const response = await fetch("/api/stats?statsId=" + statsId);
      const data = await response.json();

      console.log(data.data);
      setAnswerData(data.data);
    };

    fetchAnswerData();
  }, []);

  return (
    <div className="mt-5">
      <ResultCard
        totalNumberOfQuestions={answerData?.totalQuestions}
        numberOfCorrectAnswers={answerData?.numberOfCorrectAnswers}
      />
      <AvgAccuracyCard
        totalNumberOfQuestions={answerData?.totalQuestions}
        numberOfCorrectAnswers={answerData?.numberOfCorrectAnswers}
        timer={answerData?.timer}
      />
      <AnswersTable result={answerData?.results} />
    </div>
  );
}

const ResultCard = ({
  totalNumberOfQuestions,
  numberOfCorrectAnswers,
}: {
  totalNumberOfQuestions: number | null;
  numberOfCorrectAnswers: number | null;
}) => {
  const [displayMessage, setDisplayMessage] = useState("Loading...");

  useEffect(() => {
    if (totalNumberOfQuestions === null || numberOfCorrectAnswers === null) {
      setDisplayMessage("Loading...");
    } else if (totalNumberOfQuestions === 0) {
      setDisplayMessage("No questions answered.");
    } else if (totalNumberOfQuestions === numberOfCorrectAnswers) {
      setDisplayMessage("Perfect Score!");
    } else {
      setDisplayMessage("Great Job!");
    }
  }, [totalNumberOfQuestions, numberOfCorrectAnswers]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">Result</CardTitle>
        <LuAward className="w-6 h-6" />
      </CardHeader>
      <CardContent className="flex flex-col justify-between items-center">
        <LuTrophy className="w-[70px] h-[70px] text-gray-300" />
        <p className="text-center text-xl font-bold text-gray-300 mt-2">
          {displayMessage}
        </p>
      </CardContent>
    </Card>
  );
};

const AvgAccuracyCard = ({
  totalNumberOfQuestions,
  numberOfCorrectAnswers,
  timer,
}: {
  totalNumberOfQuestions: number | null;
  numberOfCorrectAnswers: number | null;
  timer: number | null;
}) => {
  const [avgAccuracy, setAvgAccuracy] = useState("N/A");

  useEffect(() => {
    if (totalNumberOfQuestions === null || numberOfCorrectAnswers === null) {
      setAvgAccuracy("N/A");
    } else {
      setAvgAccuracy(
        ((numberOfCorrectAnswers / totalNumberOfQuestions) * 100).toFixed(2) +
          "%"
      );
    }
  }, [totalNumberOfQuestions, numberOfCorrectAnswers]);

  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Average Accuracy</CardTitle>
          <FiTarget className="w-6 h-6" />
        </CardHeader>
        <CardContent className="">
          <p>{avgAccuracy}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Time Taken</CardTitle>
          <FaRegHourglass className="w-6 h-6" />
        </CardHeader>
        <CardContent className="">
          <p>{formatTimer(timer)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const AnswersTable = ({ result }: any) => {
  console.log(result);
  return (
    <div className="mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Question & correct answers</TableHead>
            <TableHead>Users answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.map((item: any, index: number) => {
            const isCorrectAnswer = item?.userAnswer === item?.correctAnswer;

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <p className="font-medium text-gray-400">{item?.question}</p>
                  <p className="font-medium mt-2">{item?.correctAnswer}</p>
                </TableCell>
                <TableCell>
                  <p
                    className={
                      isCorrectAnswer
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {item?.userAnswer}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
