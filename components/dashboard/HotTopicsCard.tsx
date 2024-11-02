import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "../WordCloud";

type Props = {};

const HotTopicsCard = async (props: Props) => {
  // Dummy data
  const topics = [
    { topic: "React", count: 120 },
    { topic: "JavaScript", count: 95 },
    { topic: "CSS", count: 75 },
    { topic: "TypeScript", count: 50 },
    { topic: "Node.js", count: 45 },
  ];

  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <WordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
