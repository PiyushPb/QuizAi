import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("quizai");

    const data = await req.json();

    const result = await db.collection("quiz").insertOne(data);

    // Assuming the inserted document's UID is in the `_id` field
    return new Response(
      JSON.stringify({
        status: true,
        message: "Data uploaded successfully",
        uid: result.insertedId, // Return the generated UID
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "Internal Server Error",
        error: error.message, // Return only the error message for clarity
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

export async function GET(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("quizai");

    const quizId = req.nextUrl.searchParams.get("quizId");

    const quizResult = await db
      .collection("quiz")
      .findOne({ _id: new ObjectId(quizId) });

    if (quizResult) {
      // Fetch the user data based on the userId from the quiz result
      const userId = quizResult.userId; // Adjust this if your property name is different
      const userResult = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });

      // Attach user data to the response
      return new Response(
        JSON.stringify({
          status: true,
          message: "Data retrieved successfully",
          data: {
            quiz: quizResult,
            user: userResult, // Attach user data here
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Quiz not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "Internal Server Error",
        error: error.message, // Return only the error message for clarity
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
