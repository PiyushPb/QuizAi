"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "../WordCloud";

type Props = {};

const HotTopicsCard = (props: Props) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topic");
      const data = await response.json();
      setTopics(data.topics);
    };

    fetchTopics(); // Call the function here
  }, []);

  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count * Math.floor(Math.random() * 100),
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
