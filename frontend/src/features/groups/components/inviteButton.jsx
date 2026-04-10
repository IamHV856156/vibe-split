export default function InviteButton({ code }) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Invite code copied!");
  };

  return (
    <button onClick={copyCode}>
      Copy Invite Code: {code}
    </button>
  );
}