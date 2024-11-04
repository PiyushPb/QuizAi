"use client";

import { useEffect } from "react"; // Import useEffect
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";

const CreateQuizForm = ({
  topic,
  setTopic,
  noOfQuestions,
  setNoOfQuestions,
  setActiveTab,
  quizValue,
}) => {
  useEffect(() => {
    if (quizValue) {
      setTopic(quizValue); // Set the topic from quizValue if it's not empty
    }
  }, [quizValue, setTopic]); // Ensure setTopic is stable in the dependency array

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Validation
    if (!topic.trim()) {
      toast("Please provide a topic for the quiz.");
      return;
    }

    const numQuestions = Number(noOfQuestions);
    if (numQuestions < 3 || numQuestions > 20) {
      toast("Please enter a number of questions between 3 and 20.");
      return;
    }

    // Proceed with quiz creation logic here
    console.log(
      "Creating quiz with topic:",
      topic,
      "and number of questions:",
      noOfQuestions
    );

    setActiveTab(1);
  };

  return (
    <div className="max-w-[500px] w-full">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Creation</CardTitle>
          <CardDescription>
            Choose a topic and AI will generate a quiz for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="topic">Topic</Label>
              <Input
                type="text"
                id="topic"
                placeholder="Topic of the quiz"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <span className="text-[12px] text-gray-500">
                Please provide any topic you would like to be quizzed on here.
              </span>
            </div>
            <div className="grid w-full items-center gap-1.5 mt-3">
              <Label htmlFor="noOfQuestions">Number of questions</Label>
              <Input
                type="number"
                id="noOfQuestions"
                placeholder="Number of questions"
                min={1}
                max={20}
                value={noOfQuestions}
                onChange={(e) => setNoOfQuestions(Number(e.target.value))}
              />
              <span className="text-[12px] text-gray-500">
                Please enter the number of questions you would like to be asked
                (3-20).
              </span>
            </div>
            <Button className="mt-5" type="submit">
              Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
