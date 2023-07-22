import { useEffect, useState } from "react";
import HealthRatingBar from "../HealthRatingBar";
import { Diagnosis, HealthCheckEntry } from "../../types";
// Icon imports material ui
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HealthCheckEntry
    diagnoses: Diagnosis[] | undefined
}

export const HealthCheck = ({ entry, diagnoses }: Props) :JSX.Element => {

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setDiagnosis(diagnoses);
        setLoading(false);
    }, [diagnoses]);


    return (
        <div className={"health-details"}>
                <LocalHospitalIcon />
            <p>{entry.date}</p>
            <p> <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map((code: Diagnosis["code"] , i: number) => {
                    return (
                        <li key={i}>
                            {code} {diagnosis?.find((d: { code: Diagnosis["code"] }) => d.code === code)?.name}
                        </li>
                    );
                })}
            </ul>
            <p>Health Rating:</p>
             <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
            <p>Diagnose by: {entry.specialist}</p>
        </div>
    );
}

