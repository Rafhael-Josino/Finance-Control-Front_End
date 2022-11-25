import React, { useEffect, useState } from "react";

import { listTransactions } from "../../actions";
import TransactionsList from "./TransactionsList";

type Props = {
    token: string,
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
}

type Transaction = {
    transaction_description: string;
    transaction_value: number;
    //transaction_date: `${string}/${string}/${string}`;
    transaction_date: string;
}

const Transactions = (props: Props) => {
    const { token, setUserAuth } = props;

    const [inputType, setInputType ] = useState('text'); //necessary? -> test the pop up windows
    const [transactionsList, setTransactionsList] = useState([]);

    let income: number = 0;
    let outcome: number = 0;

    transactionsList.forEach((transaction: Transaction) => {
        if (transaction.transaction_value > 0) income += transaction.transaction_value; 
        if (transaction.transaction_value < 0) outcome += transaction.transaction_value; 
    });

    useEffect(() => {
        const transactionsListAction =  async (token: Props['token']) => {
            // Get from server list of transactions from this user
            const res = await listTransactions(token);

            // If token is invalid (ex: user's login time has expired)
            if (res === 'Invalid token') {
                setUserAuth({ userName: '', token: '' });
            } else {
                setTransactionsList(res);
            }
        }

        transactionsListAction(token);
    }, []); //this can be a problem

    return (
        <section id="financeMenu">
            <section id="newModal" className="sr-only modal">
                <div id='newDivForm' className="divForm">
                    <h2>New Transaction</h2>
                    <form action="./newTransaction" method="post" id="newForm">
                        <div className="input-group">
                            <label className="sr-only">
                                Description
                                <input type={inputType} name="Description" className="descriptionInput" id="newDescription" placeholder="Description"required />
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="sr-only">
                                Value
                                <input type="number" step="0.01" name="Value" className="valueInput" id="newValue" placeholder="Value" required />
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="sr-only">
                                Date
                                <input type={inputType} onFocus={() => setInputType('date')} name="Date" className="dateInput" id="newDate" placeholder="Date" required />                    
                            </label>
                        </div>
                        <input type="hidden" name="transactionID" id="newID" />
                        <div className="formButtons input-group">
                            <button type="submit" className="formConfirm" id="newConfirm">Confirm</button>
                            <button type="button" className="formCancel" id="newCancel">Cancel</button>
                        </div>
                    </form>
                </div>
            </section>

            <section id="editModal" className="sr-only modal">
                <div id='editDivForm' className="divForm">
                    <h2>Edit Transaction</h2> 
                    <form id="editForm" action="./editTransaction" method="post">
                        <div className="input-group">
                            <label className="sr-only">
                                Description
                                <input type="text" name="Description" className="descriptionInput" id="editDescription" required />
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="sr-only">
                                Value
                                <input type="number" step="0.01" name="Value" className="valueInput" id="editValue" required />
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="sr-only">
                                Date
                                <input type={inputType} onFocus={() => setInputType('date')} name="Date" className="dateInput" id="editDate" required />
                            </label>
                        </div>
                        <input type="hidden" name="transactionsIndex" id="editIndex" />
                        <div className="formButtons input-group">
                            <button type="submit" className="formConfirm" id="editFormConfirm">Confirm</button>
                            <button type="button" className="formCancel" id="editFormCancel">Cancel</button>
                            <button type="button" className="formDelete" id="editFormDelete">Delete</button>
                        </div>
                    </form>
                </div>
            </section>

            <section id="summaryContainer">
                <div id="entries" className="summaryBox">
                    <div className="title">
                        <div>Income</div>
                        <div>{income}</div>
                    </div>
                    <div className="values" id="entriesValue"></div>
                </div>

                <div id="outs" className="summaryBox">
                    <div className="title">
                        <div>Expenses</div>
                        <div>{outcome}</div>
                    </div>
                    <div className="values" id="outsValue"></div>
                </div>
                
                <div id="total" className="summaryBox">
                    <div className="title">
                        <div>Total</div>
                        <div>{income+outcome}</div>
                    </div>
                    <div className="values" id="totalValue"></div>
                </div>
            </section>

            <section id="transactionsContainer">
                <div>
                    <span id="newTransaction">+ New Transaction</span>
                </div>

                <div id="tableNames" className="tableClass">
                    <span className="description">Description</span>
                    <span className="value">Value</span>
                    <span className="date">Date</span>
                    <span className="symbol"></span>
                </div>

                <TransactionsList transactionsList={transactionsList} />
            </section>
        </section>
    );
}

export default Transactions;