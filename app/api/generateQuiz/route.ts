import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = await req.json();

    const prompt = `Generate a JSON array containing ${data.noOfQuestions} multiple-choice questions about ${data.topic}. Each question should include the following keys: 'question' (the text of the question), 'answers' (an array of multiple-choice answers), and 'correct_ans' (the correct answer). Ensure the questions cover different JavaScript concepts.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ success: true, payload: output });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
