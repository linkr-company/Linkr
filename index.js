const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, Dhanshree' });
});

// Add two numbers from the URL
app.get('/add/:num1/:num2', (req, res) => {
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Both parameters must be numbers' });
  }

  const result = num1 + num2;
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

