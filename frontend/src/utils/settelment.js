export const calculateSettelment = (balance) =>{
    const creditors = [];
    const debtors = [];

    Object.entries(balance).forEach(([user,amount])=>{
        if(amount<0){
            debtors.push({user,amount: Math.abs(amount)});
        }
    });

    const settelment = [];

    let c=0;
    let d=0;

    while (c<debtors.length && d<creditors.length) {
        const debtor = debtors[c];
        const creditor = creditors[d];

        const payAmount = Math.min(debtor.amount, creditor.amount);

        settelment.push({
            from: debtor.user,
            to: creditor.user,
            amount: payAmount,
        });

        debtor.amount -= payAmount;
        creditor.amount -= payAmount;

        if (debtor.amount === 0) {
            c++;
        }else if( creditor.amount === 0){
            d++;
        } 
    }

    return settelment;
};