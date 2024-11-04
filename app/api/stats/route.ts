import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db("quizai");

  const data = await req.json();

  const result = await db.collection("statistics").insertOne(data);

  return new Response(
    JSON.stringify({
      status: true,
      message: "Data uploaded successfully",
      uid: result.insertedId,
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function GET(req, res) {
  const client = await clientPromise;
  const db = client.db("quizai");

  const statsId = req.nextUrl.searchParams.get("statsId");

  // Early validation for statsId
  if (!statsId || !ObjectId.isValid(statsId)) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Invalid or missing statsId",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const statsResult = await db.collection("statistics").findOne({ _id: new ObjectId(statsId) });

    if (!statsResult) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Stats not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: "Data retrieved successfully",
        data: statsResult,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving stats:", error); // Log the error for debugging
    return new Response(
      JSON.stringify({
        status: false,
        message: "An error occurred while retrieving data",
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