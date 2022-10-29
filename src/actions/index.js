import loginReq from "../apis/loginReq";

// const requestLogin = () => async dispatch => {
const requestLogin = async (userName, password) => {
    try {
        const res = await loginReq.post('account/login', {
            userName,
            password,
        });

        return res.data.token;
    } catch(err) {
        return 403;
    }
}

export { requestLogin }