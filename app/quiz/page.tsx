import StartQuizPage from "@/components/quiz/StartQuizPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quiz | QuizAI",
  description: "Quiz yourself on anything!",
};

export default async function QuizPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signup");
    return null;
  }

  return <StartQuizPage />;
}
