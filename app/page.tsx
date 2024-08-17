import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
    <main>
      <p>Mifi App</p>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Badge variant="outline">Badge</Badge>
      <Button variant="outline">Button</Button>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <div>
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
      </div>
    </main>
  );
}
