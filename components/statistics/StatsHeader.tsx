"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MdDashboard } from "react-icons/md";

export default function StatsHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Statistics</h1>
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <MdDashboard />
        Back to Dashboard
      </Button>
    </div>
  );
}
