export const calculateSettlement = (entries) => {

    if (!Array.isArray(entries) || entries.length == 0) {
        return;
    }

  const balances = {};

  // calculate net balance per user
  entries.forEach((e) => {
    if (e.type !== "expense" ) {
        return;
    }
    const user = e.user_id;
    const amount = Number(e.amount);

    if (!balances[user]){ 
        balances[user] = 0;
    }
      balances[user] += amount; // paid
  });

  const users = Object.keys(balances);
  if(users.length === 0){
    return[];
  }
  const totalExpense = users.reduce((sum, u) => sum + balances[u], 0);
  const perPerson = totalExpense / users.length;

  // net owed
  const net = {};
  users.forEach((u) => {
    net[u] = balances[u] - perPerson;
  });

  // separate creditors & debtors
  const creditors = [];
  const debtors = [];

  Object.entries(net).forEach(([user, amt]) => {
    if (amt > 0) creditors.push({ user, amount: amt });
    if (amt < 0) debtors.push({ user, amount: -amt });
  });

  // settlement
  const settlements = [];

  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];

    const payAmount = Math.min(d.amount, c.amount);

    settlements.push({
      from: d.user,
      to: c.user,
      amount: payAmount,
    });

    d.amount -= payAmount;
    c.amount -= payAmount;

    if (d.amount === 0) i++;
    if (c.amount === 0) j++;
  }

  return settlements;
};