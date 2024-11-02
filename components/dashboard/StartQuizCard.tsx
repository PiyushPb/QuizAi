import Link from "next/link";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { LuBrainCircuit } from "react-icons/lu";

export default function StartQuizCard() {
  return (
    <Link href={"/quiz"} className="mt-5">
      <Card>
        <CardHeader>
          <div className="text-[24px] font-bold flex justify-between items-center">
            <p>Start Quiz</p>
            <LuBrainCircuit />
          </div>
          <CardDescription>
            Challange yourself to a quiz with a topic of your choice.
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
