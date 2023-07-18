import React, { useEffect, useState } from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import { getDiagnosesByIds } from '../../services/diagnoses';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


export const OccupationalHealthCheck: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
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
