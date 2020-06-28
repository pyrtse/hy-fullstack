/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express = require('express');
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import calculateExcercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) =>{
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({weight: Number(weight), height: Number(height), bmi: bmi}).send();
  } else {
    res.json({error: "malformatted parameters"}).send();
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(!req.body.daily_exercises || !req.body.target){
    return res.json({error: "parameters missing"}).send();
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises: number[] = req.body.daily_exercises;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  daily_exercises.forEach(value => {
    if (isNaN(Number(value))){
      return res.json({error: "malformatted parameters"}).send();
    }
  });
  if (isNaN(Number(target))) {
    return res.json({error: "malformatted parameters"}).send();
  }
  
  res.json(calculateExcercises(daily_exercises, target)).send();
});

const PORT=3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});