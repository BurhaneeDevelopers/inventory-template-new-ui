import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import { fetchSingleTransactionForEdit, fetchTransactionsFromDB, handleManipulateDropdown } from '@/apiService/services'
import { TransactionMasterConfig } from '../Global/TransactionConfig'
import { useAtom } from 'jotai'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import EditBox from '@/components/constants/Transactions/EditBox'
import CreateBox from '@/components/constants/Transactions/CreateBox'
import PrintButton from '@/components/blocks/PrintButton'
import { printService } from '@/apiService/printService.api'

export interface Section {
  title: string
  key: string
}

export type Item = {
  [key: string]: string | number | undefined | null
  itemId: number
  itemType: string
  itemDescription: string
  quantity: number
  unitOfMeasure: string
  unitPrice: number
  discountPercentage?: number
  taxPercentage?: number
  totalPrice?: number
  deliveryDate?: string
  lotNumber?: string
  sourceReferenceID?: null
}

export type Row = {
  [K in (typeof TransactionMasterConfig)[number]as K['id']]: string
}

const excludedFields = ['supplierName'];

const columns: ColumnDef<Row>[] = TransactionMasterConfig
  // .filter(field => !excludedFields.includes(field.id))
  .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
  .map(field => ({
    accessorKey: field.id,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {field.label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
  }));

const Quotation = () => {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  const [editRow] = useAtom(editRowAtom)
  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])
  const [transaction, setTransaction] = useState(null)

  const [printResult, setPrintResult] = useState<any>(null);

  const printReport = async (e: any) => {
    var result = printResult;

    if (result) {

      var printContent = document.getElementById('printArea');
      var cssContent = "body{font-family: Arial, sans-serif;}" +
        +".tableHead {background-color: #3C4F8A;color: white;font-size:14px;font-weight:bold;}"
        + ".instruction {background-color:#BFBFC1;font-weight:bold;font-size:16px;border:1px solid;}";

      var htmlContent = "<html><head><style>" + cssContent + "</style></head><body>" + printContent!.innerHTML + "</body></html>"
      var WinPrint = window.open('', '', 'width=900,height=650');
      WinPrint!.document.write(htmlContent);

      WinPrint!.document.close();
      WinPrint!.focus();
      WinPrint!.print();
      WinPrint!.close();
    } else {
      console.log("No data found")
    }
  }

  const sections: Section[] = [
    { title: 'Quotation Listing', key: 'listing' },
    { title: 'Quotation Creation ', key: 'creation' },
    ...(isEditing ? [{ title: `Edit Quotation - ${transaction?.transactionNumber}`, key: 'edit' }] : []),
  ]

  useEffect(() => {
    handleManipulateDropdown(2, false, true)
    fetchTransactionsFromDB(2, setData)
  }, [])

  useEffect(() => {
    if (isEditing) {
      fetchSingleTransactionForEdit(editRow.id, setTransaction, setActiveTab)
      printService.GetTransactionById(editRow.id).then((result: any) => {
        console.log("Result", result)
        setPrintResult(result);
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])
  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'edit' &&
        <PrintButton onClick={printReport} />
      }
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h2 className="text-2xl font-medium text-zinc-700 uppercase">Quotation Creation</h2>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <CreateBox
          title={"Quotation Creation"}
          setActiveTab={setActiveTab}
          items={items}
          setItems={setItems}
          type={2}
          fetchData={() => fetchTransactionsFromDB(2, setData)}
        />
      )}

      {activeTab === 'edit' && (
        <EditBox
          title={`Edit Quotation - ${transaction?.transactionNumber}`}
          setActiveTab={setActiveTab}
          transaction={transaction}
          setTransaction={setTransaction}
          setIsEditing={setIsEditing}
          fetchData={() => fetchTransactionsFromDB(2, setData)}
        />
      )}
      <div id="printArea" style={{ display: 'none' }}>
        {printResult && <>
          <table style={{ width: "100%", paddingRight: "2%", paddingLeft: "2%" }}>
            <tr>
              <td colSpan={3} style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", color: "#7A91BB" }} >Quotation</td>
            </tr>
            <tr>
              <td>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td>[COMPANY_NAME]</td>
                  </tr>
                  <tr>
                    <td>[ADDRESS_STREET]</td>
                  </tr>
                  <tr>
                    <td>[CITY], [STATE], [ZIPCODE]</td>
                  </tr>
                  <tr>
                    <td>Phone : [PHONE]</td>
                  </tr>
                  <tr>
                    <td>Fax : [FAX]</td>
                  </tr>
                  <tr>
                    <td>Website : [WEBSITE]</td>
                  </tr>
                </table>
              </td>
              <td></td>
              <td>
                <table>
                  <tr>
                    <td align="right">DATE</td>
                    <td style={{ border: "1px solid" }}>[DATE]</td>
                  </tr>
                  <tr>	<td align="right">PO #</td>
                    <td style={{ border: "1px solid" }}>[PO_NUMBER]</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top", width: "40%" }}>
                <table>
                  <tr>
                    <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold" }} >VENDOR</th>
                  </tr>
                  <tr>
                    <td>[VENDOR_COMPANY_NAME]</td>
                  </tr>
                  <tr>
                    <td>[VENDOR_DEPARTMENT]</td>
                  </tr>
                  <tr>
                    <td>[VENDOR_ADDRESS_STREET]</td>
                  </tr>
                  <tr>
                    <td>Phone : [VENDOR_PHONE]</td>
                  </tr>
                  <tr>
                    <td>Fax : [VENDOR_FAX]</td>
                  </tr>
                </table>
              </td>
              <td style={{ width: "20%" }}></td>
              <td style={{ verticalAlign: "top", width: "40%" }}>
                <table>
                  <tr>
                    <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold" }}>SHIP TO</th>
                  </tr>
                  <tr>
                    <td>{printResult.customer.customer_Name}</td>
                  </tr>
                  <tr>
                    <td>{printResult.customer.contactPerson}</td>
                  </tr>
                  <tr>
                    <td>{printResult.customer.shippingAddress}</td>
                  </tr>
                  <tr>
                    <td>Phone : {printResult.customer.contactPhoneNumber}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table style={{ width: "100%", paddingRight: "2%", paddingLeft: "2%" }}>
            <tr>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", border: "1px solid" }}>REQUISITIONER</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", border: "1px solid" }}>SHIP VIA</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", border: "1px solid" }}>F.O.B</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", border: "1px solid" }}>SHIPPING TERMS</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <table style={{ width: "100%", paddingRight: "2%", paddingLeft: "2%" }}>
            <tr>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "12%", border: "1px solid" }}>SI No</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "32%", border: "1px solid" }}>Item Details</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "12%", border: "1px solid" }}>Qty.</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "14%", border: "1px solid" }}>Unit Price</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "14%", border: "1px solid" }}>Savings</th>
              <th style={{ backgroundColor: "#3C4F8A", color: "white", fontSize: "14px", fontWeight: "bold", width: "14%" }}>Total</th>
            </tr>
            {printResult.details.map((item: any, index: number) => (
              <tr>
                <td style={{ textAlign: "right" }}>{index + 1}</td>
                <td>{item.itemDescription}</td>
                <td style={{ textAlign: "right" }}>{(item.quantity + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td style={{ textAlign: "right" }}>{(item.unitPrice + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td style={{ textAlign: "right" }}>{((item.unitPrice * item.discountPercentage / 100) + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td style={{ textAlign: "right" }}>{(item.quantity * (item.unitPrice - (item.unitPrice * item.discountPercentage / 100)) + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ border: "1px solid" }}>SUBTOTAL</td>
              <td style={{ border: "1px solid", textAlign: 'right' }}>
                {printResult.details.reduce((acc: number, item: any) => {
                  return acc + (item.totalPrice);
                }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ backgroundColor: "#BFBFC1", fontWeight: "bold", fontSize: "16px", border: "1px solid" }} >Comments or Special Instructions</td>
              <td></td>
              <td style={{ border: "1px solid" }}>TAX</td>
              <td style={{ border: "1px solid", textAlign: 'right' }}>
                {printResult.details.reduce((acc: number, item: any) => {
                  return acc + (item.quantity * (item.unitPrice - (item.unitPrice * item.discountPercentage / 100)) * item.taxPercentage / 100);
                }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
            <tr>
              <td colSpan={3} rowSpan={4} style={{ border: "1px solid" }}></td>
              <td></td>
              <td style={{ border: "1px solid" }}>SHIPPING</td>
              <td style={{ border: "1px solid", textAlign: 'right' }}>0</td>
            </tr>
            <tr>
              <td></td>
              <td style={{ border: "1px solid" }}>OTHER</td>
              <td style={{ border: "1px solid", textAlign: 'right' }}>0</td>
            </tr>
            <tr>
              <td></td>
              <td style={{ border: "1px solid", fontWeight: "bold" }}>TOTAL</td>
              <td style={{ border: "1px solid", fontWeight: "bold", textAlign: 'right' }}>
                {printResult.details.reduce((acc: number, item: any) => {
                  return acc + (item.quantity * (item.unitPrice - (item.unitPrice * item.discountPercentage / 100)));
                }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={4}>
                If you have any questions about the quotation, Please contact [CONTACT_NAME] [CONTACT_PHONE] [CONTACT_EMAIL]
              </td>
              <td></td>
            </tr>
          </table>
        </>}
      </div>
    </PageWapper>
  )
}

export default Quotation
