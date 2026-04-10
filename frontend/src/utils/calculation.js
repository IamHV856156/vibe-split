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
    const balance = Number(totalSaving)-Number(totalExpense);
    return{
        totalExpense, totalSaving, balance,
    };
};