import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: Request){
    const { message } = await request.json();
    if(!message){
        return NextResponse.json(
            { error: "Message Required !" },
            { status: 400 }
        )
    }

    try{
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: message,
                }
            ]
        })
        return NextResponse.json({
            reply: completion.choices[0]?.message.content,
        })
    }catch (err){
        return NextResponse.json(
            { message: (err as { message: string }).message },
            { status: 500 }
        )
    }
}