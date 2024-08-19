import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function BucketWidget() {
    return (
        <Card className="flex flex-col md:w-1/3 justify-center items-center">
            <CardHeader>
                <CardTitle>Buckets</CardTitle>
                <CardDescription>Categories for your transactions</CardDescription>
            </CardHeader>
            <CardContent className="h-80 overflow-auto">
                <p>Bucket Widget</p>
            </CardContent>
            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
    )
}
