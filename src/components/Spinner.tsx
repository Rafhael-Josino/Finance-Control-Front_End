import { Circles } from "react-loader-spinner";

function Spinner() {
    return <div className="divSpinner">
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