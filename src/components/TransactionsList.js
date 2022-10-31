import React from "react";

const TransactionsList = ({ transactionsList }) => {
    const transactionsListMapped = transactionsList.map((transaction, index) => {
        const incomeExpenseClass = transaction.transaction_value < 0 ? 'expense' : 'income';
        
        return (
            <div 
                className="tableClass tableTransaction"
                key={index}
                onClick={() => {}}
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