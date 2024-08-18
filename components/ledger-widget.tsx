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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(t => (
                    <TableRow>
                        <TableCell className="font-medium">{t.id}</TableCell>
                        <TableCell>{"need fix"}</TableCell>
                        <TableCell>{t.amount}</TableCell>
                        <TableCell>{"add shad badge"}</TableCell>
                        <TableCell>{t.description}</TableCell>
                        <TableCell className="text-right">{t.amount}</TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )

    return (
        <Card className="w-1/2 flex flex-col justify-center items-center m-2">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                {transactionTable}
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default LedgerWidget;