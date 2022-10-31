import financeControlAPI from "../apis/financeControlAPI";

// const requestLogin = () => async dispatch => {
const requestLogin = async (userName, password) => {
    try {
        const res = await financeControlAPI.post('account/login', {
            userName,
            password,
        });

        return res.data.token;
    } catch(err) {
        console.log('error:', err.response.data.message)
        return err.response.data.message;
    }
}

const listTransactions = async (token) => {
     try {
         const res = await financeControlAPI.get("/transaction", {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });
 
         console.log(res);
         return res.data.transactions;
     } catch (err) {
        console.log('error:', err.response.data.message)
        return err.response.data.message;
     }
 } 
 

export { requestLogin, listTransactions }