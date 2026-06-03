const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

exports.generatePlan = async (req, res) => {
  try {
    const { goalTitle, description } = req.body;
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const prompt = `
You are an expert productivity coach.

Create a detailed execution roadmap.

Goal:
${goalTitle}

Description:
${description}

Rules:

1. Divide into 4 weeks.
2. Give 3-5 actionable tasks each week.
3. Include learning resources if relevant.
4. Make the roadmap realistic.
5. Use markdown formatting.

Example:

Week 1
• Task A
• Task B

Week 2
• Task C
• Task D

Generate roadmap now.
`;
    const result = await model.generateContent(prompt);

    res.json({
      plan: result.response.text()
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "AI generation failed"
    });
  }
};

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

   const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});
    const result =
      await model.generateContent(message);

    res.json({
      reply: result.response.text()
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Chat failed"
    });
  }
};
exports.generateTasks = async (req, res) => {
  try {
    const { taskDescription } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Break the following goal into actionable tasks.

Goal:
${taskDescription}

Rules:

1. Generate exactly 5-10 tasks.
2. Number every task.
3. One task per line.
4. Keep task titles short.
5. Do not add explanations.
6. Output format:

1. Task One
2. Task Two
3. Task Three
Example:

1. Design UI
2. Setup Backend
3. Create APIs
4. Build Dashboard
5. Deploy Project
`;

    const result = await model.generateContent(prompt);

    res.json({
      tasks: result.response.text()
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Task generation failed"
    });
  }
};