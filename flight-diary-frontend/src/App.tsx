import { useEffect, useState } from "react";
import axios from "axios";

import { DiaryEntry } from "./types/types";
import AddEntryForm from "./components/addEntryForm";

import serviceDiary from "./services/serviceDiary";
import DiaryEntriesList from "./components/DiaryEntriesList";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://127.0.0.1:3000/api/diaries")
      .then((response) => {
        console.log("Fetched all entries data from server");

        setEntries(
          response.data.map((object: DiaryEntry) => {
            return {
              id: serviceDiary.parseId(object.id),
              date: serviceDiary.parseDate(object.date),
              weather: serviceDiary.parseWeather(object.weather),
              visibility: serviceDiary.parseVisibility(object.visibility),
              comment:
                object.comment && serviceDiary.parseComment(object.comment),
            };
          })
        );
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            "Error while fetching data from server: " + error.message
          );
        }
      });
  }, []);

  return (
    <>
      <AddEntryForm entries={entries} setEntries={setEntries} />
      {entries && <DiaryEntriesList entries={entries} />}
    </>
  );
}

export default App;
