function useIfLoginDoThing<actionResType> (
    actionRes: actionResType,
    authFunc: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
    okFunc: (res: actionResType) => any
): boolean {
    if (actionRes === 'Invalid token') {
        authFunc({ userName: '', token: '' });
        return false;
    } else {
        okFunc(actionRes);
        return true;
    }
}

export default useIfLoginDoThing;