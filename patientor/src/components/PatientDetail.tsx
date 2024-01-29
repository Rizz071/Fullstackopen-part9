import { Patient } from "../types";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient>();
  const id: string | undefined = useParams().id;

  if (!id) {
    throw new Error("Wrong patient id");
  }

  useEffect(() => {
    axios
      .get<Patient>(`http://127.0.0.1:3001/api/patients/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          console.log(error);
        }
      });
  }, [id]);

  if (patient)
    return (
      <List disablePadding sx={{ width: "500px" }}>
        <ListItem disablePadding divider={true}>
          <Typography
            variant="h3"
            style={{ marginBottom: "0.5em", marginTop: "0.5em" }}
          >
            {patient.name}
          </Typography>
        </ListItem>
        <ListItem disablePadding divider={true}>
          <Typography variant="body1">
            {patient.gender && <span>Gender: {patient.gender}</span>}
          </Typography>
        </ListItem>
        <ListItem disablePadding divider={true}>
          <Typography variant="body1">
            {patient.ssn && <span>Ssn: {patient.ssn}</span>}
          </Typography>
        </ListItem>
        <ListItem disablePadding divider={true}>
          <Typography variant="body1">
            {patient.dateOfBirth && <span>Dob: {patient.dateOfBirth}</span>}
          </Typography>
        </ListItem>
        <ListItem disablePadding divider={true}>
          <Typography variant="body1">
            {patient.occupation && (
              <span>Occupation: {patient.occupation}</span>
            )}
          </Typography>
        </ListItem>
      </List>
    );
};

export default PatientDetail;
