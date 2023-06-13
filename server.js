import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // apiKey: "",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, resp) => {
  resp.status(200).send({
    message: "Success from sprint runner api",
  });
});

app.post("/", async (req, resp) => {
  try {
    const { prompt } = req.body;
    console.log("prompt from frontEnd: " + prompt);
    // const prompt = "time complexity of binary search";

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2048,
    });

    console.log("response send to frontEnd: " + response.data.choices[0].text);
    resp.status(200).send({
      success: true,
      data: response.data.choices[0].text,

      // message: "working",
    });
  } catch (error) {
    return resp.status(400).json({});
  }
});

app.listen(4000, () => console.log("listening on port 4000"));
