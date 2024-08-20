import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from '@/components/ui/badge'
import { Transaction } from '@/types'

interface BucketWidgetProps {
    transactions: Transaction[],
}

const BucketWidget: React.FC<BucketWidgetProps> = ({ transactions }) => {
    // Step 1: Aggregate transactions by bucket
    const bucketTotals = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.bucket]) {
            acc[transaction.bucket] = 0;
        }
        // Add or subtract based on transaction type
        acc[transaction.bucket] += transaction.type === 'credit' ? transaction.amount : -transaction.amount;
        return acc;
    }, {} as Record<string, number>);

    return (
        <Card className="flex flex-col w-full justify-center items-center">
            <CardHeader>
                <CardTitle>Buckets</CardTitle>
                <CardDescription>Categories for your transactions</CardDescription>
            </CardHeader>
            <CardContent className="h-80 overflow-auto">
                <ul>
                    {Object.entries(bucketTotals).map(([bucket, total]) => (
                        <li key={bucket} className="flex justify-between py-2 items-center">
                            <Badge variant="outline" className="mr-2">{bucket}</Badge>
                            <span>${ (total / 100).toFixed(2) }</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
    )
}

export default BucketWidget
