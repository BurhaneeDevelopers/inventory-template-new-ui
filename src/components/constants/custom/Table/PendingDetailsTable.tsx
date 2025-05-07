import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TransactionDetailsConfig } from "@/pages/Global/TransactionConfig";
import { useSetAtom } from "jotai";
import { selectedDetailsAtom } from "../../../../../jotai/jotaiStore";
import moment from "moment";

const excludedFields = ['itemId'];

export function PendingDetailsTable({ data, setOpen }) {
    const [selectedItems, setSelectedItems] = useState({});
    const setSelectedDetails = useSetAtom(selectedDetailsAtom);

    const toggleCheckbox = (itemId, detailIndex, detail) => {
        const key = `${itemId}-${detailIndex}`;
        setSelectedItems(prev => ({
            ...prev,
            [key]: prev[key] ? undefined : detail
        }));
    };

    const handleSubmit = () => {
        const selectedArray = Object.values(selectedItems).filter(Boolean);
        setSelectedDetails(selectedArray);
        setOpen(false)
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Transaction Number</TableHead>
                    {TransactionDetailsConfig
                        .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                        .map((field) => (
                            <TableHead key={field.id}>{field.label}</TableHead>
                        ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data ? data.details.map((detail, index) => {
                    const key = `${data.transactionNumber}-${index}`;
                    return (
                        <TableRow key={key}>
                            <TableCell className="">
                                <Checkbox
                                    className="border-gray-400"
                                    checked={!!selectedItems[key]}
                                    onCheckedChange={() => toggleCheckbox(data.transactionNumber, index, detail)}
                                />
                            </TableCell>
                            <TableCell>{data.transactionNumber || "NA"}</TableCell>
                            {TransactionDetailsConfig
                                .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
                                .map((field) => (
                                    <TableCell key={field.id}>
                                        {field.id === "deliveryDate"
                                            ? moment(detail[field.id]).format("DD-MM-YYYY")
                                            : detail[field.id]}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )
                }) : null}
            </TableBody>
            <TableFooter>
                <Button className="w-full" onClick={handleSubmit}>
                    Confirm Add
                </Button>
            </TableFooter>
        </Table>
    );
}
