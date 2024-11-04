import StatsBody from "@/components/statistics/StatsBody";
import StatsHeader from "@/components/statistics/StatsHeader";

export const metadata = {
  title: "Statistics | QuizAi",
  description: "Statistics",
};

export default function DynamicStatsPage() {
  return (
    <div className="container mx-auto px-3 py-5">
      <StatsHeader />
      <StatsBody />
    </div>
  );
}
