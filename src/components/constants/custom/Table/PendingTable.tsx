
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TransactionDetailsConfig } from "@/pages/Global/TransactionConfig";
import moment from "moment";

const excludedFields = ['itemId'];

export function PendingTable({ data }) {

    return (
        <Table>
            {/* <TableCaption>A list of pending transactions.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Action
                    </TableHead>
                    <TableHead>
                        Transaction Number
                    </TableHead>
                    {TransactionDetailsConfig
                        .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                        .map((field) => (
                            <TableHead
                                key={field.id}
                            >
                                {field.label}
                            </TableHead>
                        ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data ? data.map((item) => (
                    item.details?.map((detail, index) => (
                        <TableRow key={`${item.id}-${index}`}>
                            <TableCell className="flex justify-end !pr-4">
                                <Checkbox className="border-gray-400" />
                            </TableCell>
                            <TableCell>
                                {item.transactionNumber ? item.transactionNumber : "NA"}
                            </TableCell>
                            {TransactionDetailsConfig
                                .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                                .map((field) => (
                                    <TableCell key={field.id}>
                                        {field.id === "deliveryDate" ? moment(detail[field.id]).format("DD-MM-YYYY") : detail[field.id]}
                                    </TableCell>
                                ))}
                        </TableRow>
                    ))
                )) : ""}
            </TableBody>

            <TableFooter>
                <Button className="w-full">
                    Confirm Add
                </Button>
            </TableFooter>
        </Table>
    )
}
