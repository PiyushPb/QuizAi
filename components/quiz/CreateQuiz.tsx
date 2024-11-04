"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Change import for App Router

export default function CreateQuiz({ topic, noOfQuestions }) {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const initializedRef = useRef(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const handleGenerateQuiz = async () => {
        setLoadingPercentage(0);
        setLoadingMessage("Generating Quiz...");

        const topicResponse = await fetch("/api/topic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
          }),
        });

        const topicData = await topicResponse.json();

        if (!topicData.status) {
          toast.error(topicData.message);
          return;
        }

        setLoadingPercentage(10);

        setLoadingPercentage(22);
        const response = await fetch("/api/generateQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
            noOfQuestions,
          }),
        });

        const data = await response.json();
        setLoadingPercentage(42);

        const payloadString = data.payload.replace(/```json|```/g, "").trim();
        const quizData = JSON.parse(payloadString);

        setLoadingPercentage(72);
        const userId = localStorage.getItem("userId");

        const uploadResponse = await fetch("/api/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            topic,
            numberOfQuestions: noOfQuestions,
            questions: quizData,
          }),
        });

        setLoadingPercentage(86);
        const uploadData = await uploadResponse.json();

        setLoadingPercentage(100);
        if (uploadData.status) {
          setLoadingMessage("Quiz created successfully!");
          router.push(`/quiz/${uploadData.uid}`); // Use router.push for redirection
        } else {
          setLoadingMessage("Error creating quiz: " + uploadData.error);
          toast("Error creating quiz");
          router.push("/dashboard"); // Redirect to dashboard in case of error
        }
      };

      handleGenerateQuiz();
    }
  }, [topic, noOfQuestions, router]); // Include router in dependency array

  return (
    <div>
      <div>
        <img
          src="./createquiz.gif"
          alt="Creating Quiz"
          className="max-w-[500px] w-full"
        />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <Progress value={loadingPercentage} />
        <span>{loadingMessage}</span>
      </div>
    </div>
  );
}
