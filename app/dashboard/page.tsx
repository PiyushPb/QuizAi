import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StartQuizCard from "@/components/dashboard/StartQuizCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

export const metadata = {
  title: "Dashboard | QuizAi",
  description: "Quiz yourself on anything!",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signup");
    return null;
  }

  return (
    <div className="container mx-auto px-3 py-5">
      <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <StartQuizCard />
        <HistoryCard />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivity />
      </div>
    </div>
  );
}
