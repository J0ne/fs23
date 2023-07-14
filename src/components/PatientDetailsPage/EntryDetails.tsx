// import types
import { EntryType } from "../../types";

interface Props {
    entries: Array<EntryType>
}



export const EntryDetail = (entries: Props) : JSX.Element => {
    return (
        <div>
            <h3>entries</h3>
            {entries.entries.map(entry => {
                return (
                    <div key={entry.id}>
                        <p>{entry.date}
                        <i>{entry.description}</i>
                        </p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => {
                                return (
                                    <li key={code}>{code}</li>
                                );
                            })}
                        </ul>
                    </div>

                );
            }
            )}
        </div>
    );
}


export default EntryDetail;