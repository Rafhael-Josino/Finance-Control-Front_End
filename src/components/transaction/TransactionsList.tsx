type Transaction = {
    transaction_description: string;
    transaction_value: number;
    //transaction_date: `${string}/${string}/${string}`;
    transaction_date: string;
}

type Props = {
    transactionsList: Transaction[];
}

const TransactionsList = (props: Props) => {
    const { transactionsList } = props;

    const transactionsListMapped = transactionsList.map((transaction, index: number) => {
        const incomeExpenseClass = transaction.transaction_value < 0 ? 'expense' : 'income';
        
        return (
            <div 
                className="tableClass tableTransaction"
                key={index}
                onClick={() => {}} // implement
            >
                <span className="description">{transaction.transaction_description}</span>
                <span className={`value ${incomeExpenseClass}`}>{transaction.transaction_value}</span>
                <span className="date">{transaction.transaction_date}</span>
            </div>
        );
    });
    
    return (
        <div>
            {transactionsListMapped}
        </div>
    )
}

export default TransactionsList;