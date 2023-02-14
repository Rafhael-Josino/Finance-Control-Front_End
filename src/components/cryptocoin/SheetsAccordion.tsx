import { SheetList } from "../../types";

type Props = {
    sheetList: SheetList[];
    setSelectedSheetHandler: (selectedSheetName: string) => void;
}

function SheetListAccordion (props: Props) {
    const { sheetList, setSelectedSheetHandler } = props;

    return sheetList.length ? <table className='sheetsTable'>
        <thead>
            <tr className='cryptoAccordion'>
                <td>Name:</td>
                <td>Saved at:</td>
            </tr> 
        </thead>
        <tbody>
            {sheetList.map((sheet, index) => {
                return <tr 
                    key={index}
                    className='cryptoAccordion'
                    onClick={() => setSelectedSheetHandler(sheet.sheet_name)}
                >
                    <td>{sheet.sheet_name}</td>
                    <td>{sheet.created_at.slice(0,10)}</td>
                </tr>
            })} 
        </tbody>
    </table>    
    :
    <div className='cryptoAccordion'>There is no saved data</div>
}

export default SheetListAccordion;