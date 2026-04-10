import { useEntries } from "../useEntries";
const EntryList = ({groupId}) =>{
    const {entries} = useEntries(groupId);
    return(
        <diV>
            {entries.map((e)=>(
                <div key={e.id}>
                    <p>{e.type} - INR{e.amount}</p>
                    <p>{e.description}</p>
                </div>
            ))}
        </diV>
    );
};
export default EntryList;