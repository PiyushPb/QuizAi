import CreateQuiz from "@/components/quiz/CreateQuiz";
import CreateQuizForm from "@/components/quiz/CreateQuizForm";

export const metadata = {
  title: "Quiz | QuizAi",
  description: "Quiz creation",
};

export default function StartQuizPage() {
  const handleSubmit = async (
    e: React.SyntheticEvent,
    topic,
    noOfQuestions
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generateQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, noOfQuestions }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-3 py-5 w-full h-[90vh] flex justify-center items-center">
      <CreateQuizForm handleSubmit={handleSubmit} />
      {/* <CreateQuiz /> */}
    </div>
  );
}
