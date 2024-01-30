import { Diagnosis, Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, Container } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

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

  useEffect(() => {
    axios
      .get<Diagnosis[]>(`http://127.0.0.1:3001/api/diagnoses`)
      .then((response) => {
        setDiagnoses(response.data);
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          console.log(error);
        }
      });
  }, []);

  if (patient && diagnoses) {
    return (
      <List disablePadding>
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

        {patient.entries.length !== 0 && (
          <Container sx={{ my: 2 }}>
            <Typography variant="h6">Entries</Typography>
            <List>
              {patient.entries.map((e: Entry) => {
                return (
                  <ListItem disablePadding key={e.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <Typography variant="body2">
                          {e.date} {e.description}
                        </Typography>
                      </div>
                      <div>
                        {e.diagnosisCodes && (
                          <List sx={{ listStyleType: "disc", mx: 3 }}>
                            {e.diagnosisCodes.map((c) => {
                              return (
                                <ListItem
                                  disablePadding
                                  sx={{ display: "list-item" }}
                                  key={Math.round(Math.random() * 1000000)}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <div style={{ width: "3.5em" }}>{c}</div>
                                    <div>
                                      {
                                        diagnoses.find(
                                          (diagnosis) => diagnosis.code === c
                                        )?.name
                                      }
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                          </List>
                        )}
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </Container>
        )}
      </List>
    );
  }
};

export default PatientDetail;
