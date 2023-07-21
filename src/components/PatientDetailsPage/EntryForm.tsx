
// import material ui (add select)
import { Button, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, NewEntry } from '../../types';
import { assertNever } from '../../utils';
import { ReactNode, useState } from 'react';

interface Props {
    onSubmit: (values: NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry) => void;
}

// form to add new entry
const AddEntryForm =  ({ onSubmit }: Props): JSX.Element => {

    const [entryType, setEntryType] = useState('');



    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const entryType = getEntryByType(event.currentTarget);

        onSubmit(entryType);

        resetValues();
    };

    function handleChange(event: SelectChangeEvent<any>, child: ReactNode): void {
        setEntryType(event.target.value);
    }

    return (
        <div style={{
            padding: '1rem',
        }}>
            <form onSubmit={addEntry}>
                <Select className='form-field'
                placeholder='Entry type'
                label="Entry type" fullWidth name="type" onChange={handleChange}>
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                </Select>
                <TextField className='form-field'
                    label="Description"
                    fullWidth
                    name="description"
                />
                <TextField className='form-field'
                    label=""
                    fullWidth
                    name="date"
                    type='date'
                    placeholder='Date'

                />
                <TextField className='form-field'
                    label="Specialist"
                    fullWidth
                    name="specialist"
                />
                <TextField className='form-field'
                    label="Diagnosis Codes"
                    fullWidth
                    name="diagnosisCodes"
                />
                <TextField className='form-field'
                    label="Health Rating"
                    fullWidth
                    name="healthCheckRating"
                    type='number'
                />

                <Button variant="contained" color="secondary" type="reset">Cancel</Button>
                <Button variant="contained" color="primary" type="submit">Add</Button>
            </form>
        </div>


    );
}

export default AddEntryForm;


function getEntryByType(currentTarget: EventTarget & HTMLFormElement) : NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry {
    const type = currentTarget.type.value as NewEntry["type"];
    switch(type) {
        case "HealthCheck":
            return {
                description: currentTarget.description.value,
                date: currentTarget.date.value,
                specialist: currentTarget.specialist.value,
                diagnosisCodes: [currentTarget.diagnosisCodes.value],
                healthCheckRating: validateHealthRating(Number(currentTarget.healthCheckRating.value)),
                type: "HealthCheck"
            };
        case "Hospital":
            return {
                description: currentTarget.description.value,
                date: currentTarget.date.value,
                specialist: currentTarget.specialist.value,
                diagnosisCodes: [currentTarget.diagnosisCodes.value],
                discharge: {
                    date: currentTarget.dischargeDate.value,
                    criteria: currentTarget.dischargeCriteria.value
                },
                type: "Hospital"
            };
        case "OccupationalHealthcare":
            return {
                description: currentTarget.description.value,
                date: currentTarget.date.value,
                specialist: currentTarget.specialist.value,
                diagnosisCodes: [currentTarget.diagnosisCodes.value],
                employerName: currentTarget.employerName.value,
                sickLeave: {
                    startDate: currentTarget.sickLeaveStartDate.value,
                    endDate: currentTarget.sickLeaveEndDate.value
                },
                type: "OccupationalHealthcare"
            };
        default:
            return assertNever(type);
    }
}


function validateHealthRating(rating: number): NewHealthCheckEntry["healthCheckRating"] {
    if(rating < 0 || rating > 3) {
        throw new Error("Invalid health rating");
    }
    return rating as NewHealthCheckEntry["healthCheckRating"];
}

function resetValues() {
    const form = document.querySelector('form');
    if(form) {
        form.reset();
    }
}

