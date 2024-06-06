
import OpenAI from "openai";
import { CATEGORIZED_EMAILS, EMAIL } from "@/app/components/type";

const openai = new OpenAI({
  apiKey:process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export async function classifyEmails() {

  const response = await fetch("/api/emails");

  if (!response.ok) {
    throw new Error("Failed to fetch emails");
  }

  const data = await response.json();
  const emails: EMAIL[] = data.emailDetails || [];

  const categorizedEmails: CATEGORIZED_EMAILS = { important: [], general: [] };

  await Promise.all(
    emails.map(async (email: EMAIL) => {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `remember any career related emails are important and rest all is not , judging from the subject line is this email important or not? \n ${email.subject} \n giver answer as important or not important only  `,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 1,
        temperature: 1,
        stop: ["\n"],
      });
      const decision = response.choices[0].message.content;

      if (decision === "important") {
        categorizedEmails.important.push(email.subject || "");
      } else {
        categorizedEmails.general.push(email.subject || "");
      }
    })
  );

  return categorizedEmails;
}