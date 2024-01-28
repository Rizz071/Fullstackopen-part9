import axios from "axios";
import { DiaryEntry, Visibility, Weather } from "../types/types";

const isNumber = (receivedId: unknown): receivedId is number => {
    return typeof receivedId === 'number' || receivedId instanceof Number;
}

const isString = (receivedObject: unknown): receivedObject is string => {
    return typeof receivedObject === 'string' || receivedObject instanceof String;
}

const isWeather = (receivedObj: string): receivedObj is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(receivedObj);
}

const isVisibility = (receivedObj: string): receivedObj is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(receivedObj);
}

const parseId = (receivedObj: unknown): number => {

    if (!receivedObj || !isNumber(Number(receivedObj)) || isNaN(Number(receivedObj))) {
        throw new Error('Error while parsing Id');
    }
    return Number(receivedObj);
}

const parseDate = (receivedObj: unknown): string => {
    if (!receivedObj || !isString(receivedObj)) {
        throw new Error('Error while parsing Data');
    }
    return receivedObj;
}

const parseWeather = (receivedObj: unknown): Weather => {
    if (!receivedObj || !isString(receivedObj) || !isWeather(receivedObj)) {
        throw new Error('Error while parsing Weather');
    }
    return receivedObj;
}

const parseVisibility = (receivedVisibility: unknown): Visibility => {
    if (!receivedVisibility || !isString(receivedVisibility) || !isVisibility(receivedVisibility)) {
        throw new Error('Incorrect or missing visibility');
    }
    return receivedVisibility;
}

const parseComment = (receivedObj: unknown): string => {
    if (!receivedObj || !isString(receivedObj)) {
        throw new Error('Incorrect or missing comment');
    }
    return receivedObj;
}

const postEntry = async (newEntry: DiaryEntry, entries: DiaryEntry[], setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>, setMessage: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const result = await axios.post<DiaryEntry>('http://127.0.0.1:3000/api/diaries', newEntry);
        console.log('Posted to server: ', result);

        addEntryToState(newEntry, entries, setEntries)
        return result;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            error.response
                ? setMessage('Error: ' + error.response.data)
                : setMessage('Error: ' + error.message)
        } else {
            console.error(error);
        }
        return error;
    }
}

const addEntryToState = (newEntry: DiaryEntry, entries: DiaryEntry[], setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>) => {
    setEntries(entries.concat(newEntry));
}


export default {
    parseId, parseDate, parseWeather, parseVisibility, parseComment, postEntry
}