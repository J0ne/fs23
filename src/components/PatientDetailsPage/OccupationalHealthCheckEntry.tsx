import { useEffect, useState } from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Props {
    entry: OccupationalHealthcareEntry
    diagnoses: Diagnosis[] | undefined
}

export const OccupationalHealthCheck = ({ entry, diagnoses }: Props) :JSX.Element => {

    useEffect(() => {
        setDiagnosis(diagnoses);
        setLoading(false);
    }, [diagnoses]);

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [, setLoading] = useState<boolean>(true);

    return (
        <div  className={"health-details"}>
            <MedicalServicesIcon />
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map((code: Diagnosis["code"], i: number) => {
                    return (
                        <li key={i}>
                            {code} {diagnosis?.find((d: { code: Diagnosis["code"]; }) => d.code === code)?.name}
                        </li>
                    );
                })}
            </ul>
            <p>Employer: {entry.employerName}</p>
            <p>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
            <p>Diagnose by: {entry.specialist}</p>
        </div>
    );
}
