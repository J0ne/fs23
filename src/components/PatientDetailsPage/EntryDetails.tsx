import React, { useEffect, useState } from "react";
import { EntryType, Diagnosis } from "../../types";
import { getDiagnosesByIds } from "../../services/diagnoses";
import { HealthCheck } from "./HealthCheckEntry";
import { HospitalHealthcare } from "./HospitalHealthcare";
import { OccupationalHealthCheck } from "./OccupationalHealthCheckEntry";



interface Props {
    entries: Array<EntryType>
}

export const EntryDetail = (data: Props) : JSX.Element => {

    // fetch diagnosis by code
    // const { diagnosis, error, loading } = useDiagnosis(code);

    // useDiagnosis hook
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const codes = data.entries.map(entry => entry?.diagnosisCodes).flat();
                const diagnosis = await getDiagnosesByIds(codes as string[]);
                console.log('Just got diagnosis', diagnosis)
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
        void fetchDiagnosis();
    }, [data.entries]);

    const entryType = (entry: EntryType) => {
        switch(entry.type) {
            case "HealthCheck":
                return <HealthCheck entry={entry} />;
            case "Hospital":
                return <HospitalHealthcare entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthCheck entry={entry} />;
            default:
                return assertNever(entry);
        }
    };




    return (
        <div>
            <h3>Entries</h3>
            {data.entries.map(entry => {
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

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};