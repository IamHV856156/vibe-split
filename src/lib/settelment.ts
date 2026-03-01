export interface dost {
  name: string;
  paid: number;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export const calculateSettlements = (dost: dost[]): Transaction[] => {
  const totalSpent = dost.reduce((sum, p) => sum + p.paid, 0);
  const share = totalSpent / dost.length;

  // Calculating total balance for each dost
  let balances = dost.map(p => ({
    name: p.name,
    balance: p.paid - share
  }));

  // Separate into dost jo dendaar hai  and dost jo lendaar hai
  let lendaar = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);
  let dendaar = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);

  let transactions: Transaction[] = [];

  // Match them up
  let d = 0;
  let c = 0;

  while (d < dendaar.length && c < lendaar.length) {
    let debtor = dendaar[d];
    let creditor = lendaar[c];
    
    let amount = Math.min(Math.abs(debtor.balance), creditor.balance);
    
    if (amount > 0.1) {
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: Number(amount.toFixed(2))
      });
    }

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 0.1) d++;
    if (Math.abs(creditor.balance) < 0.1) c++;
  }

  return transactions;
};