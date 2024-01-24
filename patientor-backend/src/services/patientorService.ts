import { Patients, Diagnoses, patientsWithoutSSN, Gender } from '../types/types';
import diagnosesData from '../../data/diagnoses';
import patientsData from '../../data/patients';

import { v4 as uuid } from 'uuid';



const diagnoses: Diagnoses[] = diagnosesData;
const patients: Patients[] = patientsData;


const getAllPatients = (): patientsWithoutSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const getAllDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};

const addPatient = (receivedPatient: unknown): Patients => {

    //Generating random id
    const id = uuid();

    //Testing for object type (narrowing)
    if (!receivedPatient || typeof receivedPatient !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    //Testing if all required field came (narrowing)
    if ('name' in receivedPatient &&
        'dateOfBirth' in receivedPatient &&
        'ssn' in receivedPatient &&
        'gender' in receivedPatient &&
        'occupation' in receivedPatient
    ) {
        const newPatient: Patients = {
            id,
            name: parseString(receivedPatient.name),
            dateOfBirth: parseString(receivedPatient.dateOfBirth),
            ssn: parseString(receivedPatient.ssn),
            gender: parseGender(receivedPatient.gender),
            occupation: parseString(receivedPatient.occupation)
        };

        //Saving right object to dummy hardcoded database
        patients.push(newPatient);

        //Returning saved object for sending back to frontend
        return newPatient;
    } else {
        throw new Error('Incorrect data: some fields are missing!');
    }

};

//Testing for string type
const isString = (testObject: unknown): testObject is string => {
    return typeof testObject === 'string' || testObject instanceof String;
};

//Testing for gender type (enum)
const isGender = (testGender: string): testGender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(testGender);
}

//Parsing incoming field
const parseString = (testObject: unknown): string => {
    if (!testObject || !isString(testObject)) {
        throw new Error('Error in patient description!');
    }

    return testObject;
};

//Parsing gender field
const parseGender = (receivedGender: unknown): Gender => {


    if (!Gender || !isString(receivedGender) || !isGender(receivedGender)) {
        throw new Error('Error in gender field description!')
    }

    const newGender: Gender = receivedGender;
    return newGender;
}

export default {
    getAllDiagnoses, getAllPatients, addPatient
};