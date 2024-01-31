import { useState, SyntheticEvent } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../types";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (newEntry: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>("");

  //   const [discharge, setDischarge] = useState<Discharge>({} as Discharge);
  const [dischargeDate, setDischargeDate] = useState<Date>(new Date());
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  //   const [sickLeave, setSickLeave] = useState<SickLeave>({} as SickLeave);
  const [startDateSickLeave, setStartDateSickLeave] = useState<Date>(
    new Date()
  );
  const [endDateSickLeave, setEndDateSickLeave] = useState<Date>(new Date());

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(3);
  const [type, setType] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case "Hospital":
        const newHospitalEntry: EntryWithoutId = {
          description,
          date: date.toISOString().split("T")[0],
          specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        onSubmit(newHospitalEntry);
        break;

      case "Occupational healthcare":
        const newOccupationalHealthcareEntry: EntryWithoutId = {
          description,
          date: date.toISOString().split("T")[0],
          specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate: startDateSickLeave.toISOString().split("T")[0],
            endDate: endDateSickLeave.toISOString().split("T")[0],
          },
        };
        onSubmit(newOccupationalHealthcareEntry);
        break;

      case "Health check":
        const newHealthCheckEntry: EntryWithoutId = {
          description,
          date: date.toISOString().split("T")[0],
          specialist,
          diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating,
        };
        onSubmit(newHealthCheckEntry);
        break;

      default:
        throw Error("Wrong entry type");
    }
  };

  return (
    <form onSubmit={addEntry}>
      <FormControl required fullWidth>
        <InputLabel sx={{ mx: -2 }}>Entry type</InputLabel>
        <Select
          label="Entry type"
          value={type}
          onChange={({ target }) => setType(target.value)}
          sx={{ my: 0.5 }}
          size="small"
          fullWidth
          variant="standard"
        >
          {["Hospital", "Occupational healthcare", "Health check"].map(
            (option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          )}
        </Select>
        {!type && (
          <FormHelperText sx={{ mx: 0, color: "red" }}>
            Please, select entry type first
          </FormHelperText>
        )}
      </FormControl>

      <TextField
        required
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ my: 0.5 }}
        size="small"
        variant="standard"
      />
      <TextField
        required
        label="Date"
        type="date"
        fullWidth
        value={date.toISOString().split("T")[0]}
        onChange={({ target }) => setDate(new Date(target.value))}
        sx={{ my: 0.5 }}
        size="small"
        variant="standard"
      />
      <TextField
        required
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={{ my: 0.5 }}
        size="small"
        variant="standard"
      />
      <TextField
        required
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(" "))}
        sx={{ my: 0.5 }}
        size="small"
        variant="standard"
      />

      {type === "Hospital" && (
        <div>
          <TextField
            required
            label="Discharge date"
            fullWidth
            type="date"
            value={dischargeDate.toISOString().split("T")[0]}
            onChange={({ target }) => setDischargeDate(new Date(target.value))}
            sx={{ my: 0.5 }}
            size="small"
            variant="standard"
          />
          <TextField
            required
            label="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            sx={{ my: 0.5 }}
            size="small"
            variant="standard"
          />
        </div>
      )}

      {type === "Occupational healthcare" && (
        <div>
          <TextField
            required
            label="Employer name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            sx={{ my: 0.5 }}
            size="small"
            variant="standard"
          />
          <TextField
            label="Start date"
            type="date"
            fullWidth
            value={startDateSickLeave.toISOString().split("T")[0]}
            onChange={({ target }) =>
              setStartDateSickLeave(new Date(target.value))
            }
            sx={{ my: 0.5 }}
            size="small"
            variant="standard"
          />
          <TextField
            label="Start date"
            type="date"
            fullWidth
            value={endDateSickLeave.toISOString().split("T")[0]}
            onChange={({ target }) =>
              setEndDateSickLeave(new Date(target.value))
            }
            sx={{ my: 0.5 }}
            size="small"
            variant="standard"
          />
        </div>
      )}

      {type === "Health check" && (
        <TextField
          required
          label="Health check rating"
          fullWidth
          value={healthCheckRating}
          // TODO Number!!!
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          sx={{ my: 0.5 }}
          size="small"
        />
      )}

      <Grid sx={{ my: 2 }}>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        {type && (
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AddEntryForm;
