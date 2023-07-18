import axios from "axios";
import { apiBaseUrl } from "../constants";

import { Diagnosis } from "../types";


const fetchedDiagnoses: Diagnosis[] = [];


export const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );

    fetchedDiagnoses.push(...data);
    return data;
    }

export const getDiagnosesByIds =  async (ids: Diagnosis['code'][]): Promise<Diagnosis[]> => {
    if(!ids || ids.length === 0) return [];

    if (fetchedDiagnoses.length === 0) {
        const data = await getAll();
        fetchedDiagnoses.push(...data);
    }
    return fetchedDiagnoses.filter(diagnosis => ids.includes(diagnosis.code));
}


// Compare this snippet from src/types.ts:
// export interface Diagnosis {
//     code: string;
//     name: string;
//     latin?: string;
// }

// Compare this snippet from src/services/diagnoses.ts:
// import axios from "axios";
// import { apiBaseUrl } from "../constants";
//
// import { Diagnosis } from "../types";
//
// const getAll = async () => {
//     const { data } = await axios.get<Diagnosis[]>(
//         `${apiBaseUrl}/diagnoses`
//     );
//
//     return data;
// }




