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
        <Card className="flex flex-col w-full items-center">
            <CardHeader className="text-center">
                <CardTitle>Buckets</CardTitle>
                <CardDescription>Categories for your transactions</CardDescription>
            </CardHeader>
            <CardContent className="h-80 w-full overflow-auto">
    <div className="w-full grid grid-cols-3 gap-4">
        {/* Column 1: Bucket Names */}
        <div>
            <h3 className="text-lg text-center font-bold mb-2">Bucket</h3>
            <ul>
                {Object.entries(bucketTotals).map(([bucket]) => (
                    <li key={bucket} className="py-2 text-center">
                        <Badge variant="outline" className="mr-2">{bucket}</Badge>
                    </li>
                ))}
            </ul>
        </div>

        {/* Column 2: Totals */}
        <div>
            <h3 className="text-lg font-bold mb-2 text-center">Total</h3>
            <ul>
                {Object.entries(bucketTotals).map(([_, total]) => (
                    <li
                        key={total}
                        className={`py-2 text-center rounded-md ${total < 0 ? 'bg-red-50' : 'bg-green-50'}`}
                    >
                        <span>${(total / 100).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Column 3: Limits with Input Fields */}
        <div>
            <h3 className="text-lg font-bold mb-2 text-center">Limit</h3>
            <ul>
                {Object.entries(bucketTotals).map(([bucket]) => (
                    <li key={bucket} className="py-2 text-center">
                        <input
                            type="text"
                            defaultValue="100.00"
                            className="w-20 p-1 text-center border border-gray-300 rounded"
                        />
                    </li>
                ))}
            </ul>
        </div>
    </div>
</CardContent>




            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
    )
}

export default BucketWidget
