import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { EntryDetail } from "./EntryDetails";

import { Patient } from "../../types";

// import EntryDetails from "./EntryDetails";


import { apiBaseUrl } from "../../constants";

 const usePatient = (id: string | undefined) => {
        const [patient, setPatient] = React.useState<Patient | undefined>();
        const [error, setError] = React.useState<string | undefined>();
        const [loading, setLoading] = React.useState<boolean>(true);

        useEffect(() => {
            const fetchPatient = async () => {
                try {
                    const { data: patient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    setPatient(patient);
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
            void fetchPatient();
        }, [id]);

        return { patient, error, loading };
    };

export const PatientDetailsPage = () : JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const { patient, error, loading } = usePatient(id);

    // uesPatient hook



    // fetch patient details from api
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                // dispatch(setPatient(patient));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, [id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div>
            <h2>{patient.name}
            {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
            </h2>

            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <EntryDetail entries={patient.entries} />
        </div>
    );
}
