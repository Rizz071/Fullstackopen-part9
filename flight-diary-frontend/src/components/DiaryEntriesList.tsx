import { DiaryEntry } from "../types/types";

const DiaryEntriesList = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary Entries</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {entries &&
          entries.map((entry: DiaryEntry) => {
            return (
              <div key={entry.id} style={{ width: "150px" }}>
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
    </>
  );
};

export default DiaryEntriesList;
