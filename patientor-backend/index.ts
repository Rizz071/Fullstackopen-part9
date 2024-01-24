import express from 'express';
import cors from 'cors';


import patientorService from './src/services/patientorService';
import { Patients } from './src/types/types';

const app = express();

app.use(cors());
app.use(express.json());




app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.status(200).send(patientorService.getAllDiagnoses());
});

app.get('/api/patients', (_req, res) => {
    res.status(200).send(patientorService.getAllPatients());
});

app.post('/api/patients', (req, res) => {
    try {
        const newPatient: Patients = patientorService.addPatient(req.body);
        res.status(201).send(newPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});