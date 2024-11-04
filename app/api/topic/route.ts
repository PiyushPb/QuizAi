import clientPromise from "@/lib/mongodb";

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db("quizai");

  const data = await req.json();

  const topic = await db.collection("topics").findOne({ topic: data?.topic });

  if (topic) {
    await db
      .collection("topics")
      .updateOne({ topic: data?.topic }, { $inc: { count: 1 } });
    return new Response(
      JSON.stringify({
        status: true,
        message: "Topic updated successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    await db.collection("topics").insertOne({ topic: data?.topic, count: 1 });
    return new Response(
      JSON.stringify({
        status: true,
        message: "Topic created successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(req, res) {
  const client = await clientPromise;
  const db = client.db("quizai");

  const topics = await db.collection("topics").find({}).toArray();
  return new Response(
    JSON.stringify({
      status: true,
      message: "Topics retrieved successfully",
      topics: topics,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
