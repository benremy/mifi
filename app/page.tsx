"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "@/components/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





export default function Home() {

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <main className="w-screen h-screen p-5 flex flex-col justify-center items-center">
      {/* <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      {/* <Badge variant="outline">Badge</Badge> */}
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}
      <Card className="w-1/2 flex flex-col justify-center items-center">
        <CardHeader className="items-center">
          <CardTitle>Ledger</CardTitle>
          <CardDescription>Track your expenses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <DatePicker/>
          <Tabs defaultValue="debit" className="flex flex-col items-center w-[400px] m-5">
            <TabsList>
              <TabsTrigger value="credit">Credit</TabsTrigger>
              <TabsTrigger value="debit">Debit</TabsTrigger>
            </TabsList>
            <TabsContent value="credit">This amount will be credited to your account</TabsContent>
            <TabsContent value="debit">This amount will be debited from your account</TabsContent>
          </Tabs>
          <Input className="mb-2 w-full" placeholder="amount"/>
          <Textarea className="w-full" placeholder="description"/>
        </CardContent>
        <CardFooter className="w-full justify-center">
          <Button variant="outline" className="w-1/2">Add</Button>
        </CardFooter>
      </Card>
      {/* <div>
        <p>this is the main container</p>
        <p>navbar</p>
        <ul>
          <li>ledger</li>
          <li>buckets</li>
          <li>settings</li>
        </ul>
      </div>
      <div>
        <p>08/16/24</p>
        <p>segmented control</p>
        <p>amount input</p>
        <p>text area description</p>
        <p>add button</p>
      </div> */}
    </main>
  );
}
