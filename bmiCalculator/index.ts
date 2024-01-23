import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if ((isNaN(Number(height))) || (isNaN(Number(weight))) || !height || !weight) {
        res.status(400)
            .send({ error: "malformatted parameters" });
    } else {
        res.send({
            height,
            weight,
            bmi: calculateBmi(Number(height), Number(weight))
        });
    }
});

app.post('/exercises', (req, res) => {
    interface Exercise {
        daily_exercises: number[],
        target: number
    }

    if (!req.body.daily_exercises || !req.body.target) {
        res.status(400).send({ error: "parameters missing" });
    } else {

        const { daily_exercises, target }: Exercise = req.body;


        if ((!daily_exercises.every(value => !isNaN(Number(value)))) || (typeof target === 'string')) {
            res.status(400).send({ error: "malformatted parameters" });
        } else {
            res.status(200).send(calculateExercises(daily_exercises, target))
        }
    }
});



const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});