
// import material ui (add select)
import { Button, TextField, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';

import { NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, NewEntry } from '../../types';
import { assertNever } from '../../utils';
import { useState } from 'react';

interface Props {
    onSubmit: (values: NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry) => void;
}

// form to add new entry
const AddEntryForm =  ({ onSubmit }: Props): JSX.Element => {

    const [entryType, setSelectedEntryType] = useState<NewEntry["type"]>('HealthCheck');

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const entryType = getEntryByType(event.currentTarget);
        onSubmit(entryType);
        // resetValues();
    };

const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedEntryType(event.target.value as NewEntry["type"]);
  };

    // data element by type
    const getDataElement = (type: NewEntry["type"] | string): JSX.Element => {

        if(!type && type.length === 0) return (<div></div>   );


        switch(type) {
            case 'HealthCheck':
                return (
                    <div>
                        <h3>
                            Health check rating
                        </h3>
                        <TextField className='form-field'
                            label="Health Rating"
                            fullWidth
                            name="healthCheckRating"
                            type='number'

                        />
                    </div>
                );
            case 'Hospital':
                return (
                    <div>
                        <h3>
                            Discharge
                        </h3>
                        <TextField className='form-field'
                            fullWidth
                            name="dischargeDate"
                            type='date'
                        />
                        <TextField className='form-field'
                            label="Discharge Criteria"
                            fullWidth
                            name="dischargeCriteria"
                        />
                    </div>
                );
            case 'OccupationalHealthcare':
                return (
                    <div>
                        <h3>
                            Occupational Healthcare
                        </h3>
                        <TextField className='form-field'
                            label="Employer Name"
                            fullWidth
                            name="employerName"
                        />

                        <h3>
                            Sick Leave
                        </h3>

                        <InputLabel id="start-date">Sick Leave</InputLabel>
                        <TextField className='form-field'
                            id="start-date"
                            fullWidth
                            name="sickLeaveStartDate"
                            type='date'
                        />
                        <InputLabel id="end-date">Sick Leave</InputLabel>
                        <TextField className='form-field'
                            id="end-date"
                            fullWidth
                            name="sickLeaveEndDate"
                            type='date'
                        />
                    </div>
                );
            default:
                return (
                    <div></div>
                )

        }
    };

    return (
        <div style={{
            padding: '1rem',
        }}>
            <form onSubmit={addEntry}>
                <Select className='form-field'
                placeholder='Entry type'
                value={entryType}
                label="Entry type" fullWidth name="type" onChange={handleSelectChange}>
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
               { getDataElement(entryType as NewEntry["type"])}

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
                diagnosisCodes: toArray(currentTarget.diagnosisCodes.value),
                healthCheckRating: validateHealthRating(Number(currentTarget.healthCheckRating?.value)),
                type: "HealthCheck"
            } as NewHealthCheckEntry;
        case "Hospital":
            return {
                description: currentTarget.description.value,
                date: currentTarget.date.value,
                specialist: currentTarget.specialist.value,
                diagnosisCodes: toArray(currentTarget.diagnosisCodes.value),
                discharge: {
                    date: currentTarget.dischargeDate.value,
                    criteria: currentTarget.dischargeCriteria.value
                },
                type: "Hospital"
            } as NewHospitalEntry;
        case "OccupationalHealthcare":
            return {
                description: currentTarget.description.value,
                date: currentTarget.date.value,
                specialist: currentTarget.specialist.value,
                diagnosisCodes: toArray(currentTarget.diagnosisCodes.value),
                employerName: currentTarget.employerName.value,
                sickLeave: {
                    startDate: currentTarget.sickLeaveStartDate.value,
                    endDate: currentTarget.sickLeaveEndDate.value
                },
                type: "OccupationalHealthcare"
            } as NewOccupationalHealthcareEntry;
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

const toArray = (value: string): string[] => {
    if(value.length === 0) {
        return [];
    }
    return value.split(',').map(v => v.trim());
}
