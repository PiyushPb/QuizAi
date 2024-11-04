import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, res) {
  const client = await clientPromise;
  const db = client.db("quizai");

  const userId = req.nextUrl.searchParams.get("userId");

  try {
    const history = await db
      .collection("statistics")
      .find({ userId })
      .toArray();

    if (!history || history.length === 0) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "History not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Filter out the results field from each history object
    const filteredHistory = history.map(({ results, ...rest }) => rest);

    return new Response(
      JSON.stringify({
        status: true,
        message: "History retrieved successfully",
        history: filteredHistory,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving history:", error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "An error occurred while retrieving history",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
