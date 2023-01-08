//import { AxiosError } from "axios";
import financeControlAPI from "../apis/financeControlAPI";

/** Login */

type LoginInfo = {
    userName: string;
    password: string;
}

// const requestLogin = () => async dispatch => {
const requestLogin = async (loginInfo: LoginInfo) => {
    try {
        const res = await financeControlAPI.post('account/login', loginInfo);

        return res.data.token;
    } catch(err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
}

/** Request user information */

const requestUser = async (token: string, username: string) => {
    try {
        const res = await financeControlAPI.get('/account', {
            headers: {
                Authorization: `Bearer ${token}`,
                username,
            }
        });

        return res.data.user;
    } catch (err: any) {
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
        
        //console.log(res);
        return res.data.transactions as Transaction[];
    } catch (err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
     }
 } 
 
 const cryptocoinSheets = async (token: string) => {
    try {
        const res = await financeControlAPI.get("/cryptocoin/sheets", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.sheetList;
    } catch (err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
 }

 const cryptocoinSummary = async (token: string, sheetName: string) => {
    try {
        const res = await financeControlAPI.get(`/cryptocoin/sheetSummary/${sheetName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.sheetSummary;
    } catch (err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
 }

 const cryptoAssetOperations = async (token: string, sheetName: string, asset: string, resume: string) => {
    try {
        const res = await financeControlAPI.get(`/cryptocoin/sheet/${sheetName}/${asset}/${resume}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (err: any) {
        // make type verification!
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
 }

export { 
    requestLogin, 
    requestUser,
    listTransactions,
    cryptocoinSheets,
    cryptocoinSummary,
    cryptoAssetOperations,
}
