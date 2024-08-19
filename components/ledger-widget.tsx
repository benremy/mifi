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
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Type</TableHead>
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
                                <Badge variant="outline">{t.bucket}</Badge>
                            </TableCell>
                            <TableCell>{t.description}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )

    return (
        <Card className="h-5/6 md:w-1/3 flex flex-col justify-center items-center">
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