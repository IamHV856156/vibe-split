// fetching and totaling expense and saving from entries and calcutaing ramaining balance
export const calculateBalance = (entries) => {
    let totalExpense = 0;
    let totalSaving = 0;

    entries.forEach((e) => {
        const amount = Number(e.amount);
        if (e.type === "expense") {
            totalExpense += amount;
        }else if (e.type === "saving"){
            totalSaving += amount;
        }
    });
    const balance = Number(totalExpense)-Number(totalSaving);
    return{
        totalExpense, totalSaving, balance,
    };
};

// spliting logic
export const calculateSplit =(entries) =>{
    const expenseEntries = entries.filter(e => e.type === "expense");
    const totalExpense = expenseEntries.reduce((sum,e) => sum + Number(e.amount),0);
    const userTotal = {};
    expenseEntries.forEach((e)=>{
        const user = e.profiles?.name || e.user_id;
        if (!userTotal[user]) {
            userTotal[user] = 0;
        }
        userTotal[user] += Number(e.amount);
    });

    const Members = Object.keys(userTotal);
    const perPerson = Members.length>=2 ? totalExpense / Members.length : 0;
    const balances = {};
    Members.forEach((user)=>{
        balances[user] = userTotal[user] - perPerson;
    });

    return{
        totalExpense,perPerson,balances,
    };
} ;