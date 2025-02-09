import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/data/initialMessage";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);
const buildGoogleGenAIprompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content
  }))
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  const steam = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages: buildGoogleGenAIprompt(messages),
    temperature: 0.7,
  })

  return steam?.toDataStreamResponse();
}