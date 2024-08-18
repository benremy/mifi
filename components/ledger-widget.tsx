import React from 'react'
import { Transaction } from '@/types'
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
  

interface LedgerWidgetProps {
    transactions: Transaction[]
}



const LedgerWidget: React.FC<LedgerWidgetProps> = ({ transactions }) => {

    const transactionTable = (
        <Table>
            <TableCaption>{null}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(t => (
                    <TableRow>
                        <TableCell className="font-medium">{t.id}</TableCell>
                        <TableCell className="text-center">
                            { t.date && `${String(t.date.getMonth() + 1)}/${String(t.date.getDate()).padStart(2, '0')}`}
                        </TableCell>
                        <TableCell className="text-center">${t.amount}</TableCell>
                        <TableCell>
                            <Badge variant={t.type === "credit" ? "default":"destructive"}>{t.type}</Badge>
                        </TableCell>
                        <TableCell>{t.description}</TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )

    return (
        <Card className="h-5/6 w-1/2 flex flex-col justify-center items-center">
            <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>List of all transactions</CardDescription>
            </CardHeader>
            <CardContent className="h-80 overflow-auto">
                {transactionTable}
            </CardContent>
            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
    )
}

export default LedgerWidget;