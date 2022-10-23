import React, { useState } from "react";

const Transactions = () => {
    const [inputType, setInputType ] = useState('text');

    return (
        <main id="financeMenu">
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
                            <input type={inputType} onFocus={setInputType} name="Date" className="dateInput" id="newDate" placeholder="Date" required />                    
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
                            <input type={inputType} onFocus={setInputType} name="Date" className="dateInput" id="editDate" required />
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
                    <div>$</div>
                </div>
                <div className="values" id="entriesValue"></div>
            </div>

            <div id="outs" className="summaryBox">
                <div className="title">
                    <div>Expenses</div>
                    <div>$</div>
                </div>
                <div className="values" id="outsValue"></div>
            </div>
            
            <div id="total" className="summaryBox">
                <div className="title">
                    <div>Total</div>
                    <div>$</div>
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
        </section>
    </main>

    )
}

export default Transactions;