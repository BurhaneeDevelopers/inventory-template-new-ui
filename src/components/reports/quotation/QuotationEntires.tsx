export default function QuotationEntries (props: any) {
    const { entries } = props
    return (
        <table className="Invoice-table Table-wide">
        <thead>
        <tr>
            <th>{'S.No'}</th>
            <th>{'Description'}</th>
            <th>{'Qty'}</th>
            <th>{'Unit Price'}</th>
            <th>{'Discount'}</th>
            <th>{'Total'}</th>
        </tr>
        </thead>
        <tbody>
        {entries?.map((entry, index) => {
            return (
            <tr key={`entry_${index}`}>
                <td className="Col-rate">{index+1}</td>
                <td className="Col-description">{entry.itemDescription}</td>
                <td className="Col-qty">{entry.quantity}{entry.qtyType}</td>
                <td className="Col-rate">{<>&#8377;{entry.rate}{entry.unitOfMeasure && `${entry.unitPrice}/${entry.unitOfMeasure}`}</>}</td>
                <td className="Col-qty">{entry.discountPercentage}%</td>
                <td className="Col-total">{<>&#8377;{entry.totalPrice.toFixed(2)}</>}</td>
            </tr>
            )
        })}
        <tr>
            <th colSpan={4} style={{borderBottom:"0px"}}>Comments or Special Instructions</th>
            <td className="Col-total">{'SUBTOTAL'}</td>
            <td className="Col-total">{<>&#8377;{entries?.reduce((acc: number, entry: any) => acc + entry.totalPrice, 0).toFixed(2)}</>}</td>
        </tr>
        <tr>
            <td colSpan={4} style={{borderBottom:"0px"}}></td>
            <td className="Col-total">{'TAX'}</td>
            <td className="Col-total">{<>&#8377;{entries?.reduce((acc: number, entry: any) => acc + entry.taxAmount, 0).toFixed(2)}</>}</td>
        </tr>
        <tr>
            <td colSpan={4} style={{borderBottom:"0px"}}></td>
            <td className="Col-total">{'SHIPPING'}</td>
            <td className="Col-total">{<>&#8377;{'0.00'}</>}</td>
        </tr>
        <tr>
            <td colSpan={4} style={{borderBottom:"0px"}}></td>
            <td className="Col-total">{'OTHERS'}</td>
            <td className="Col-total">{<>&#8377;{'0.00'}</>}</td>
        </tr>
        <tr>
            <td colSpan={4}></td>
            <td className="Col-total">{'TOTAL'}</td>
            <td className="Col-total">{<>&#8377;{entries?.reduce((acc: number, entry: any) => acc + entry.totalPrice + entry.taxAmount, 0).toFixed(2)}</>}</td>
        </tr>
        </tbody>
        </table>
    )
}