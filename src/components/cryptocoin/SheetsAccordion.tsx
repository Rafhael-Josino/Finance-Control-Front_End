import { SheetList } from "../../types";

type Props = {
    sheetList: SheetList[];
    visible: boolean;
    setSelectedSheetHandler: (selectedSheetName: string) => void;
}

function SheetListAccordion (props: Props) {
    const { sheetList, visible, setSelectedSheetHandler } = props;

    const renderedList = sheetList.length ? <table className='sheetsTable'>
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

    return visible ? renderedList : null;
}

export default SheetListAccordion;