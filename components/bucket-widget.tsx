import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from '@/types';

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
      <CardContent className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bucket</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Limit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(bucketTotals).map(([bucket, total]) => (
              <TableRow key={bucket}>
                <TableCell>
                  <Badge variant="outline" className="mr-2">{bucket}</Badge>
                </TableCell>
                <TableCell className={`text-center py-2 ${total < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  <span>${(total / 100).toFixed(2)}</span>
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="text"
                    defaultValue="100.00"
                    className="w-20 p-1 text-center border border-gray-300 rounded"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
};

export default BucketWidget;
