import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsWidget() {
  return (
    <Card className="md:w-1/3 flex flex-col justify-center items-center">
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Site-wide customizations</CardDescription>
        </CardHeader>
        <CardContent className="h-80 overflow-auto">
          <p>Settings Component</p>
        </CardContent>
        <CardFooter>
            <p></p>
        </CardFooter>
    </Card>
  )
}
