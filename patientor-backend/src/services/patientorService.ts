import { Patients, Diagnoses, patientsWithoutSSN } from '../types/types';
import diagnosesData from '../../data/diagnoses'
import patientsData from '../../data/patients';


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
    })
};

const getAllDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};


export default {
    getAllDiagnoses, getAllPatients
};