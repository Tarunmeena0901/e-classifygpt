
import OpenAI from "openai";
import { CATEGORIZED_EMAILS, EMAIL } from "@/app/type";

let savedApiKey;

if(typeof window !== 'undefined'){
  savedApiKey = localStorage.getItem('OPENAI_KEY');
}

const openai = new OpenAI({
  apiKey: savedApiKey ?? process.env.NEXT_PUBLIC_OPENAI_KEY ?? "",
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
            content: ` judging from the subject line and the body of this email, classify this email \n \n ${email.subject} \n \n ${email.body} \n \n give answer labeled as \n \n 
             " important : Emails that are personal or work-related and require immediate attention." , \n \n
             " promotion : Emails related to sales, discounts, and marketing campaigns." , \n \n
             " social : Emails from social networks, friends, and family." , \n \n 
             " marketing : Emails related to marketing, newsletters, and notifications." , \n \n 
             " spam :  Unwanted or unsolicited emails. " or \n \n 
             " general : If none of the above are matched, use General" \n \n
              give one word (important, promotion, social, marketing ,spam or general) answer from these options only and ignore the dash lines in the body `,
          },
        ],
        model: "gpt-4o", //"gpt-3.5-turbo"
        max_tokens: 1,
        temperature: 1,
        stop: ["\n"],
      });
      const decision = response.choices[0].message.content;
      console.log(decision);

      categorizedEmails.push({subject: email.subject, from: email.from, classification: decision || "", body: email.body} );

    })
  );

  return categorizedEmails;
}