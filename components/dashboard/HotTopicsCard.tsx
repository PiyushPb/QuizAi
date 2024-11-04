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
  const topics = [
    { topic: "React", count: 1 },
    { topic: "JavaScript", count: 2 },
    { topic: "CSS", count: 3 },
    { topic: "TypeScript", count: 1 },
    { topic: "Node.js", count: 1 },
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
