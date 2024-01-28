import { useEffect, useState } from "react";
import axios from "axios";

import { DiaryEntry } from "./types/types";

import serviceDiary from "./services/serviceDiary";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>();

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
    <div style={{ margin: "20px" }}>
      <h2>Diary Entries</h2>
      {entries &&
        entries.map((entry: DiaryEntry) => {
          return (
            <div key={entry.id} style={{ marginBottom: "20px" }}>
              <div>
                <strong>{entry.date}</strong>
                <br />
                Visibility: {entry.visibility}
                <br />
                Weather: {entry.weather}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
