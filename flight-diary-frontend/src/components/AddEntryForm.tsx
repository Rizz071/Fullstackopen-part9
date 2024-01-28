import React, { useState } from "react";
import serviceDiary from "../services/serviceDiary";
import { DiaryEntry } from "../types/types";

const AddEntryForm = ({
  entries,
  setEntries,
  setMessage,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState<string>("12-12-2025");
  const [visibility, setVisibility] = useState<string>("ok");
  const [weather, setWeather] = useState<string>("sunny");
  const [comment, setComment] = useState<string>("Some comment");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // const newEntry: DiaryEntry = {
    //   id: Math.round(Math.random() * 100000),
    //   date,
    //   weather: serviceDiary.parseWeather(weather),
    //   visibility: serviceDiary.parseVisibility(visibility),
    //   comment: serviceDiary.parseComment(comment),
    // };

    const newEntry = {
      id: Math.round(Math.random() * 100000),
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const response = serviceDiary.postEntry(
        newEntry as DiaryEntry,
        entries,
        setEntries,
        setMessage
      );
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Error: " + error.message);
        console.log("Error while sending data to server", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Date:{" "}
        <input
          type="text"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </p>
      <p>
        Visibility:{" "}
        <input
          type="text"
          id="visibility"
          name="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
      </p>
      <p>
        Weather:{" "}
        <input
          type="text"
          id="weather"
          name="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        />
      </p>
      <p>
        Comment:{" "}
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
};

export default AddEntryForm;
