import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query

    if ((isNaN(Number(height))) || (isNaN(Number(weight))) || !height || !weight) {
        res.send({
            error: "malformatted parameters"
        }).status(400);
    } else {
        res.send({
            height,
            weight,
            bmi: calculateBmi(Number(height), Number(weight))
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});