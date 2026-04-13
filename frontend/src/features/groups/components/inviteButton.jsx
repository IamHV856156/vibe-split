import { Button } from "@/components/ui/button";
import { Card,CardContent, CardHeader } from "@/components/ui/card";
export default function InviteButton({ code }) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Invite code copied!");
  };

  return (
    <Card className="text-xl font-bold w-[50%]">
      <CardContent className=" flex items-center" >
        <CardHeader className=" w-[60%]">
          Copy Invite Code:
        </CardHeader>
        <Button onClick={copyCode} className=" w-[40%]" >
          {code}
        </Button>
      </CardContent>
    </Card>
  );
}