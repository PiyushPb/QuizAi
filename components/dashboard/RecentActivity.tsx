"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function RecentActivity() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");

      const response = await fetch("/api/history?userId=" + userId);
      const data = await response.json();

      console.log(data.history);
      setHistory(data.history);
    };

    fetchHistory();
  }, []);

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of {history?.length} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        {history?.toReversed().map((his, index) => {
          return (
            <div key={index}>
              <RecentCard data={his} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

const RecentCard = ({ data }: any) => {
  const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    const day = String(dateObject.getUTCDate()).padStart(2, "0");
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = dateObject.getUTCFullYear();

    return `${day} / ${month} / ${year}`;
  };

  return (
    <div className="my-5">
      <div>
        <Link href={`/statistics/${data._id}`}>
          <h3 className="underline">{data.topic}</h3>
        </Link>
      </div>
      <Badge className="flex justify-center items-center gap-2 w-fit mt-1">
        <FaRegClock />
        {formatDate(data.timestamp)}
      </Badge>
    </div>
  );
};
