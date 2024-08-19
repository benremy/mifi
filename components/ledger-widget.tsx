import React from 'react'
import { Transaction } from '@/types'
import { Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/utils/supabase/client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Badge } from '@/components/ui/badge'

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from "@/components/ui/button"

interface LedgerWidgetProps {
    transactions: Transaction[],
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}



const LedgerWidget: React.FC<LedgerWidgetProps> = ({ transactions, setTransactions }) => {
    const { toast } = useToast()
    const [ confirmId, setConfirmId] = React.useState<number | null >(null)

    const handleTrashClick = (id:number) => {
        setConfirmId(id);
    };

    const handleConfirmDelete = async (id:number) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .match({ id });

            if (error) {
                throw new Error(error.message); // Throw an error to be caught by the catch block
            }

            setTransactions((prevTransactions) =>
                prevTransactions.filter((transaction) => transaction.id !== id)
            );

            toast({
                title: "Deletion Successful",
                description: `Transaction with ID ${id} has been deleted.`,
            });
        } catch (error: any) {
            toast({
                title: "Deletion Failed",
                description: `Failed to delete transaction with ID ${id}. ${error.message}`,
            });
        } finally {
            setConfirmId(null); // Hide confirmation after attempting delete
        }
    };

    const handleCancelDelete = () => {
        setConfirmId(null); // Hide confirmation if canceled
    };

    const transactionTable = (
        <Table>
            <TableCaption>{null}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Bucket</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t,i) => {
                    return (
                        <TableRow key={t.id}>
                            <TableCell className="font-medium">{i+1}</TableCell>
                            <TableCell className="text-center">
                                { t.date && `${t.date}`}
                            </TableCell>
                            <TableCell className="text-center">${ (t.amount / 100).toFixed(2) }</TableCell>
                            <TableCell>
                                <Badge variant={t.type === "credit" ? "default":"destructive"}>{t.type}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{t.account}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{t.bucket}</Badge>
                            </TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell>
                            {confirmId === t.id ? (
                                <>
                                    <Button variant="destructive" onClick={() => handleConfirmDelete(t.id as number)}>
                                        Confirm Delete
                                    </Button>
                                    <Button variant="outline" onClick={handleCancelDelete}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" size="icon" onClick={() => handleTrashClick(t.id as number)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            )}
                        </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )

    return (
        <Card className="h-full flex flex-col justify-center items-center">
            <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>List of all transactions</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
                {transactionTable}
            </CardContent>
            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
    )
}

export default LedgerWidget;