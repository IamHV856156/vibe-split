import { useParams } from "react-router-dom";
import GroupCard from "../components/GroupCard";

export default function GroupDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Group Details</h2>
      <GroupCard group={{ id }} />
    </div>
  );
}