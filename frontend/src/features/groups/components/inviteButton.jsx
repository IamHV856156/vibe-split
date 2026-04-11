import { Button } from "@/components/ui/button";
import { Card,CardContent, CardHeader } from "@/components/ui/card";
export default function InviteButton({ code }) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Invite code copied!");
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          Copy Invite Code:
        </CardHeader>
        <Button onClick={copyCode}>
          {code}
        </Button>
      </CardContent>
    </Card>
  );
}