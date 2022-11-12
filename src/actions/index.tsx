//import { AxiosError } from "axios";

import financeControlAPI from "../apis/financeControlAPI";

type LoginInfo = {
    userName: string;
    password: string;
}

// const requestLogin = () => async dispatch => {
const requestLogin = async (LoginInfo: LoginInfo) => {
    try {
        const res = await financeControlAPI.post('account/login', LoginInfo);

        return res.data.token;
    } catch(err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
}

/** List Transactions */

type Transaction = {
    transaction_description: string;
    transaction_value: number;
    //transaction_date: `${string}/${string}/${string}`;
    transaction_date: string;
}

const listTransactions = async (token: string) => {
    try {
        const res = await financeControlAPI.get("/transaction", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log(res);
        return res.data.transactions as Transaction[];
    } catch (err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
     }
 } 
 

export { requestLogin, listTransactions }