
import OpenAI from "openai";
import { CATEGORIZED_EMAILS, EMAIL } from "@/app/type";

let savedApiKey;

if(typeof window !== 'undefined'){
  savedApiKey = localStorage.getItem('OPENAI_KEY');
}

const openai = new OpenAI({
  apiKey: savedApiKey ?? process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export async function classifyEmails(emails : EMAIL[]) {

  const categorizedEmails: CATEGORIZED_EMAILS = [];

  await Promise.all(
    emails.map(async (email: EMAIL) => {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: ` judging from the subject line is this email important or not? \n ${email.subject} \n giver answer as "important" , "promotion" , "social" , "marketing" , "spam" or "general" if none are matched, give one word answer from these options only  `,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 1,
        temperature: 1,
        stop: ["\n"],
      });
      const decision = response.choices[0].message.content;

      categorizedEmails.push({subject: email.subject, from: email.from, classification: decision} );

    })
  );

  return categorizedEmails;
}