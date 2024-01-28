import { DiaryEntry } from "../types/types";

const DiaryEntriesList = ({ entries }: { entries: DiaryEntry[] }) => {
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
};

export default DiaryEntriesList;
