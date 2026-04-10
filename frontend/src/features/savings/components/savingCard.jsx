import { calculateSavingsSummary } from "../savingsUtils";

export default function SavingsCard({ entries }) {
  const totalSavings = calculateSavingsSummary(entries);

  return (
    <div>
      <h3>Total Savings</h3>
      <p>INR{totalSavings}</p>
    </div>
  );
}