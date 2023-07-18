import React, { useEffect, useState } from 'react';
import { Diagnosis, HospitalEntry } from '../../types';
import { getDiagnosesByIds } from '../../services/diagnoses';

// create hospital heltcare  React component
export const HospitalHealthcare: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    // const [{ diagnoses }, dispatch] = useStateValue();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const codes = entry?.diagnosisCodes;
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
    }, [entry]);

    return (
        <div  className={"health-details"}>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map((code: Diagnosis["code"] , i: number) => {
                    return (
                        <li key={i}>
                            {code} {diagnosis?.find((d: { code: Diagnosis["code"] }) => d.code === code)?.name}
                        </li>
                    );
                })}
            </ul>
            <p>Discharged: {entry.discharge.date} {entry.discharge.criteria}</p>
            <p>Diagnose by: {entry.specialist}</p>
        </div>
    );
}
