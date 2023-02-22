import { Circles } from "react-loader-spinner";

type Props = {
    message: string,
}

function Spinner(props: Props) {
    const {message} = props;

    return <div className="divSpinner">
        {message === '' ? null : <div>{message}</div>}
        <Circles
            height="80"
            width="80"
            color="green"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div> 
}

export default Spinner;