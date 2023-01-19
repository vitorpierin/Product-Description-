const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const configuration = new Configuration({
  apiKey: "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",
});

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.post('/generate', async (req, res) => {
  try{
  const prompt = `Write a short product title for ${req.body.name} with max of 5 words, and a long description for the product with the following features: ${req.body.features}.`;
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    prompt: prompt,
    model: "text-davinci-002",
    temperature: 0.8,
    max_tokens:150
  });
  console.log(response.data);
  const title = response.data.choices[0].text.split('\n')[0];
  const description = response.data.choices[0].text.substring(response.data.choices[0].text.indexOf(".")+1);

  res.json({ title: title, description: description });
} catch (err){
    console.error('ERRO -> ' + err);
    res.status(500).send('Error generating title and description');
}
});

app.listen(3080, () => {
  console.log('Server started on port 3080');
});
