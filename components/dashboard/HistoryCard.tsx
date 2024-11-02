import { Card, CardDescription, CardHeader } from "../ui/card";
import { FaHistory } from "react-icons/fa";

export default function HistoryCard() {
  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <div className="text-[24px] font-bold flex justify-between items-center">
            <p>Quiz History</p>
            <FaHistory />
          </div>
          <CardDescription>View past quiz attempts.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
