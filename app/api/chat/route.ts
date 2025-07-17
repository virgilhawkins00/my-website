// route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import data from '@/data';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Generate a detailed context from project data and skills
const createContextFromData = () => {
  const projects = data.projects.projects
    .map((p) => `- ${p.title}: ${p.description}`)
    .join('\n');

  const skills = data.technologies.skills.map((s) => s.name).join(', ');

  return `
About Omar El Hedfi:
- DevSecOps Engineer and Full Stack Developer specialized in Next.js, React, Docker, and AI integration.
- Solid experience in building secure, scalable CI/CD pipelines and AI-powered web applications.
- Email: ${data.contact.email}

Core Expertise:
- Full Stack Development: ${skills}
- DevSecOps: Jenkins, SonarQube, Docker, Kubernetes, Trivy, Hadolint, Dockle
- AI Integration: Ollama, LLaMA3.2, OpenAI, Gemini

AI Capabilities:
1. Conversational AI:
   - Custom chat assistants
   - Support automation
   - Smart FAQ bots
   - Multilingual interaction

2. Text & Content Intelligence:
   - Automatic report summarization
   - AI-generated documentation
   - Content enhancement and SEO optimization

3. Automation & Recommendations:
   - Workflow automation
   - Behavioral analytics
   - Product and content recommendations

4. CI/CD Enhancement:
   - Automated pipelines with security scans
   - AI-generated summaries of build reports
   - Intelligent deployment checks

Notable Projects:
${projects}

My DevSecOps-AI Workflow:
1. Analyze requirements and define objectives
2. Choose appropriate models (e.g., Gemini, LLaMA3.2)
3. Integrate AI features into existing systems
4. Apply security-first CI/CD strategies
5. Continuously monitor and improve

Services Offered:
- Full-stack app development
- CI/CD pipeline setup and automation
- AI-powered feature integration
- Performance and security optimization
- DevSecOps consulting and support

Additional Info:
- Experience with multiple AI platforms: Google AI, OpenAI, Hugging Face
- Strong focus on ethical and sustainable AI
- Committed to delivering practical, business-oriented solutions
  `;
};

const MESSAGE_HISTORY_LIMIT = 5;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: `You are an AI assistant for Omar El Hedfi. Use the following information to help answer questions:
            ${createContextFromData()}
            
            Guidelines:
            - Be professional and concise
            - Provide specific examples and highlight DevSecOps/AI strengths
            - Structure answers clearly using lists or sections
            - Emphasize Omar’s ability to combine development with security and automation
            - Guide users toward real-world value and contact when needed`,
        },
        {
          role: 'model',
          parts:
            "Understood. I will respond as Omar El Hedfi's AI assistant, highlighting his expertise in secure CI/CD pipelines, AI integration, and modern web development using tools like Next.js, Docker, Jenkins, and Kubernetes.",
        },
        ...messages.slice(-MESSAGE_HISTORY_LIMIT).map((msg: any) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: msg.content,
        })),
      ],
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

