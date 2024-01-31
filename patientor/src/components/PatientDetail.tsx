import { Diagnosis, Entry, EntryWithoutId, Patient } from "../types";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, Container, Button } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";
import servicePatients from "../services/patients";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  const id: string | undefined = useParams().id;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (newEntry: EntryWithoutId) => {
    if (id) {
      try {
        const receivedNewEntry = await servicePatients.postEntry(newEntry, id);
        if (patient && "entries" in patient) {
          patient.entries.push(receivedNewEntry);
          closeModal();
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }

    // try {
    //   const patient = await patientService.create(values);
    //   setPatients(patients.concat(patient));
    //   setModalOpen(false);
    // } catch (e: unknown) {
  };

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
      <>
        <AddEntryModal
          modalOpen={modalOpen}
          error={error}
          onSubmit={submitNewEntry}
          onClose={closeModal}
        />
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
          <Button
            sx={{ my: 2 }}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Add entry
          </Button>
          {patient.entries.length !== 0 && (
            <Container sx={{ my: 2 }}>
              <List>
                <ListItem disablePadding divider={true}>
                  <Typography sx={{ my: 1 }} variant="h6">
                    Entries
                  </Typography>
                </ListItem>
                {patient.entries.map((e: Entry) => {
                  return (
                    <ListItem disablePadding key={e.id} divider={true}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: "15px" }}>
                          <Typography variant="body2">
                            <strong>{e.date}</strong> {e.description}
                          </Typography>

                          <div>
                            <EntryDetails entry={e} />
                          </div>
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
      </>
    );
  }
};

export default PatientDetail;
