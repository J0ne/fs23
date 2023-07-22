import React, { useEffect, useState } from "react";
import { EntryType, Diagnosis, NewEntry } from "../../types";
import { getDiagnosesByIds } from "../../services/diagnoses";
import { HealthCheck } from "./HealthCheckEntry";
import { HospitalHealthcare } from "./HospitalHealthcare";
import { OccupationalHealthCheck } from "./OccupationalHealthCheckEntry";
import AddEntryForm from "./EntryForm";
import patientService from "../../services/patients";
import axios from "axios";
import { Alert } from "@mui/material";
import { assertNever } from "../../utils";


interface Props {
    id: string
}

interface ValidationError {
  data: string | undefined;
}

export const EntryDetail = (props: Props) : JSX.Element => {

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [error, setError] = useState<string | undefined>(undefined);
    const [, setLoading] = useState<boolean>(true);
    const [entries, updateEntries] = useState<EntryType[]>([]);


     const fetchDiagnosis = async () => {
            try {
                const codes =  entries.map(entry => entry.diagnosisCodes).filter( c=> c !== undefined).flat();
                const uniqueCodes = [...new Set(codes)];
                const diagnosis = await getDiagnosesByIds(uniqueCodes as string[]);

                if(diagnosis.length > 0) {
                    setDiagnosis(diagnosis);
                }
            } catch (e) {
                console.error(e);
                if(e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("Unknown error");
                }

            } finally {
                setLoading(false);
            }

        };

    const fetchEntries = async () => {
                try {
                    const patientData = await patientService.getPatientById(props.id);
                    const entries = patientData.entries;
                    updateEntries(entries);
                    setError('');
                } catch (e) {
                    console.error(e);
                    if(e instanceof Error) {
                        setError(e.message);
                    } else {
                        setError("Unknown error");
                    }

                } finally {
                    setLoading(false);
                }
            };

    useEffect(() => {
        void fetchEntries();
    }, []);


    useEffect(() => {
        void fetchDiagnosis();
    }, [entries]);


    const entryType = (entry: EntryType) => {
        switch(entry.type) {
            case "HealthCheck":
                return <HealthCheck entry={entry}  diagnoses={diagnosis}/>;
            case "Hospital":
                return <HospitalHealthcare entry={entry}  diagnoses={diagnosis}/>;
            case "OccupationalHealthcare":
                return <OccupationalHealthCheck entry={entry}  diagnoses={diagnosis}/>;
            default:
                return assertNever(entry);
        }
    };

    const addNewEntry = async (values: NewEntry) => {

        try {
            await patientService.addEntry(props.id, values);
            setError('');
            fetchEntries();


        } catch (error) {
            console.error(error);
             if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                const msg = error.response?.data;

                if(msg && typeof msg === 'string') {
                    setError(msg);
                }

             } else {
                 console.error(error);
             }
        }
    };


    return (
        <div>
            <h2>Add new entry</h2>
            {error && <Alert  style={{
            padding: '1rem',
        }} severity="error">{error}</Alert>}
            <AddEntryForm onSubmit={addNewEntry}/>
            <h3>Entries</h3>
            {entries.map(entry => {
                return (
                    <div key={entry.id}>
                        {entryType(entry)}
                    </div>

                );
            }
            )}
        </div>
    );
}


export default EntryDetail;

