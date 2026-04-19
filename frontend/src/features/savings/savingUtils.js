export const calculateSavingsSummary = (entries) => {
  if (!entries||!Array.isArray(entries)) {
    return 0;
  }
  let saving = {};

  entries.forEach((e) => {
    const user = e.profiles?.name||e.user_id;
    const amount = Number(e.amount);
    if (!saving[user]) {
      saving[user] = {collected:0,spend:0};
    }
    if (e.type === "collect") {
      saving[user].collected +=amount;
    } else if (e.type === "spend") {
      saving[user].spend +=amount;
    }
  });

  const individualSaving = Object.keys(saving).map((user)=>{
    const {collected,spend} = saving[user];
    const saved = collected-spend;
    return{
      user,collected,spend,deservedBack: saved > 0 ? saved : 0, // This is their individual saving
      owesGroup: saved < 0 ? Math.abs(saved) : 0
    }
  })

  return individualSaving;
};