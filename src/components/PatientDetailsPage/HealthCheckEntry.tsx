import { useEffect, useState } from "react";
import HealthRatingBar from "../HealthRatingBar";
import { getDiagnosesByIds } from "../../services/diagnoses";
import { Diagnosis, HealthCheckEntry } from "../../types";
// Icon imports material ui
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


export const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    // const [{ diagnoses }, dispatch] = useStateValue();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
    const [ error, setError] = useState<string | undefined>(undefined);
    const [ loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        error && console.error(error);
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
            <p>Health Rating: <HealthRatingBar showText={false} rating={entry.healthCheckRating} /></p>
            <p>Diagnose by: {entry.specialist}</p>
        </div>
    );
}

