import { Button } from "@/components/ui/button";
export default function InviteButton({ code }) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Invite code copied!");
  };

  return (
    <Button onClick={copyCode}>
      Copy Invite Code: {code}
    </Button>
  );
}