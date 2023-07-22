import { useEffect, useState } from 'react';
import { Diagnosis, HospitalEntry } from '../../types';


interface Props {
    entry: HospitalEntry
    diagnoses: Diagnosis[] | undefined
}

export const HospitalHealthcare = ({ entry, diagnoses }: Props) :JSX.Element => {


    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setDiagnosis(diagnoses);
        setLoading(false);
    }, [diagnoses]);


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
            <p>Discharged: {entry?.discharge?.date} {entry?.discharge?.criteria}</p>
            <p>Diagnose by: {entry.specialist}</p>
        </div>
    );
}
