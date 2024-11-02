"use client";

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
import { useState } from "react";

const CreateQuizForm = ({ handleSubmit }) => {
  const [topic, setTopic] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(1);

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
          <form onSubmit={handleSubmit} className="grid gap-4">
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
                max={10}
                value={noOfQuestions}
                onChange={(e) =>
                  setNoOfQuestions(e.target.value as unknown as number)
                }
              />
              <span className="text-[12px] text-gray-500">
                Please enter the number of questions you would like to be asked.
              </span>
            </div>
            <Button
              className="mt-5"
              type="submit"
            >
              Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
