export async function evaluateInterview(category, questions, answers) {

    const prompt = `
You are a senior software engineering interviewer.
Evaluate the candidate's interview.

Category: ${category}

Questions:
${questions.map((q, i) => `
Question ${i + 1}: ${q.title}
Description: ${q.description}
Candidate Answer: ${answers[q.$id] || "No Answer"}
`).join("\n")}

Return ONLY raw JSON in this exact format, no markdown, no backticks, no explanation:
{
  "overallScore": 85,
  "communication": 80,
  "technicalKnowledge": 90,
  "problemSolving": 84,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "feedback": "detailed feedback paragraph here",
  "suggestions": [
    { "title": "Learn React Hooks", "link": "https://react.dev/learn" },
    { "title": "Practice DSA", "link": "https://leetcode.com" },
    { "title": "System Design Basics", "link": "https://roadmap.sh" },
    { "title": "JavaScript Deep Dive", "link": "https://javascript.info" }
  ]
}

STRICT RULES:
- suggestions must be exactly 4 objects each with "title" and "link" only
-Just be harsh while evaluating , do not give good score 
- Return ONLY raw JSON, absolutely no markdown, no backticks, no extra text
`;

    const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",   // ✅ fixed model
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        }),
    }
);

const data = await response.json();

// ✅ Add this check before reading choices
if (!response.ok || !data.choices) {
    console.error("Groq API error:", data);
    throw new Error(data.error?.message || "Groq API failed");
}

const text = data.choices[0].message.content;

    return JSON.parse(
        text.replace(/```json/g, "").replace(/```/g, "").trim()
    );
}