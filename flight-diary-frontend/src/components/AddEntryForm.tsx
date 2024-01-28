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
  const [date, setDate] = useState<string>("2018-07-22");
  const [visibility, setVisibility] = useState<string>("great");
  const [weather, setWeather] = useState<string>("sunny");
  const [comment, setComment] = useState<string>("Some comment");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      id: Math.round(Math.random() * 100000),
      date,
      weather,
      visibility,
      comment,
    };

    serviceDiary
      .postEntry(newEntry as DiaryEntry, entries, setEntries, setMessage)
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(
            "Error while fetching data from server: " + error.message
          );
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", margin: "10px 0px" }}>
        <span style={{ width: "100px" }}>Date: </span>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => {
            return setDate(e.target.value);
          }}
        />
      </div>

      <div style={{ display: "flex", margin: "10px 0px" }}>
        <span style={{ width: "100px" }}>Visibility: </span>

        <label>
          <input
            type="radio"
            name="visibility"
            value="great"
            checked={visibility === "great"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          great
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={visibility === "good"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          good
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={visibility === "ok"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          ok
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            checked={visibility === "poor"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          poor
        </label>
      </div>

      <div style={{ display: "flex", margin: "10px 0px" }}>
        <span style={{ width: "100px" }}>Weather: </span>
        <label>
          <input
            type="radio"
            name="weather"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(e) => setWeather(e.target.value)}
          />
          sunny
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          rainy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          cloudy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          stormy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={weather === "windy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          windy
        </label>
      </div>

      <div style={{ display: "flex", margin: "10px 0px" }}>
        <span style={{ width: "100px" }}>Comment: </span>
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", margin: "0px 0px 0px 100px " }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddEntryForm;
