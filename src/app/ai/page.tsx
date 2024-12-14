import OpenAI from "openai";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";

export default function AI() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async function open() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a book recommendation assistant" },
        {
          role: "user",
          content: "Give me a book recommandation based on Norwegian Wood",
        },
      ],
    });
    console.log(completion.choices[0].message);
  }
  open();
  // Using OpenAI a user will be able to provide a prompt for the AI to generate and show a list of books from openlibrary that best match
  // what is asked

  return (
    <div>
      <Header />
      <h1>AI</h1>
      <textarea></textarea>
      <Footer />
    </div>
  );
}
