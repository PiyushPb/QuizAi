import { getServerSession } from "next-auth";
import Signup from "./(auth)/Signup";
import { redirect } from "next/navigation";

export const metadata = {
  title: "QuizAi",
  description: "Quiz yourself on anything!",
};

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return <Signup />;
}
