import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TransactionMasterConfig } from "@/pages/Global/TransactionConfig";
import moment from "moment";
import { useSetAtom } from "jotai";
import { selectedTransactionAtom } from "../../../../../jotai/jotaiStore";
import { Button } from "@/components/ui/button";

const excludedFields = ['customerName', 'supplierName', 'status', 'madeByName', 'approvedByName', 'remarks'];

export function PendingTransactionTable({ data }) {
    const [, setSelectedItem] = useState("")
    const setSelectedTransactionAtom = useSetAtom(selectedTransactionAtom)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Transaction Number</TableHead>
                    {TransactionMasterConfig
                        .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                        .map((field) => (
                            <TableHead key={field.id}>{field.label}</TableHead>
                        ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data ? data.map((item, index) => {
                    const key = `${item.transactionNumber}-${index}`;
                    return (
                        <TableRow key={key}>
                            <TableCell className="">
                                <Button
                                    onClick={() => {
                                        setSelectedTransactionAtom(item);
                                        setSelectedItem(item.transactionNumber)
                                    }}
                                    className="!text-xs"
                                >
                                    View Details
                                </Button>
                            </TableCell>
                            <TableCell>{item.transactionNumber || "NA"}</TableCell>
                            {TransactionMasterConfig
                                .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                                .map((field) => (
                                    <TableCell key={field.id}>
                                        {field.id === "deliveryDate"
                                            ? moment(item[field.id]).format("DD-MM-YYYY")
                                            : item[field.id]}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )
                })
                    :
                    ""}
            </TableBody>
        </Table>
    );
}
