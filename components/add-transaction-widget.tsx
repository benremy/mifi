"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Transaction } from "@/types"
import DatePicker from "@/components/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from '@/utils/supabase/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface AddTransactionProps {
  transactions: Transaction[];
  user: string;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const AddTransactionWidget: React.FC<AddTransactionProps> = ({ setTransactions, transactions, user }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tabValue, setTabValue] = useState<string>("debit")
  const [bucket, setBucket] = useState<string>("")
  const [cents, setCents] = useState<string>("00")
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [account, setAccount] = useState<string>("")

  const addTransaction = async () => {
    if (!amount) return alert("Please enter an amount greater than zero")

    const finalAmount = (parseFloat(amount) * 100) + parseFloat(cents)

    const newTransaction: Transaction = {
      amount: finalAmount,
      description: description,
      type: tabValue,
      date: date,
      bucket: bucket || "uncategorized",
      user_id: user,
      account: account
    }

    const { error } = await supabase
    .from('transactions')
    .insert(newTransaction)


    const newTransactionLedger = [...transactions, newTransaction]
    setTransactions(newTransactionLedger)

    setDescription("");
    setAmount("");
    setCents("")
  }


  // const formatAmount = (value: string) => {
  //     // Remove any non-numeric characters (except for the decimal point)
  //     const numericValue = value.replace(/[^0-9.]/g, '');
      
  //     // Split into integer and decimal parts
  //     const [integerPart, decimalPart = ''] = numericValue.split('.');
      
  //     // Format integer and decimal parts
  //     const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands
  //     const formattedDecimal = decimalPart.substring(0, 2); // Limit to 2 decimal places

  //     // Combine formatted parts
  //     return `${formattedInteger}${formattedDecimal.length ? `.${formattedDecimal}` : ''}`;
  // };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numericValue = value.replace(/[^0-9]/g, '');
      setAmount(numericValue);
  };

  const handleCentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setCents(numericValue.substring(0,2));
};

  return (
    <Card className="h-full w-full flex flex-col justify-center items-center">
      <CardHeader className="items-center">
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Add a transaction to your ledger</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <DatePicker date={date} setDate={setDate}/>
        <Tabs value={tabValue} onValueChange={v => setTabValue(v)} className="flex flex-col items-center w-[400px] m-5">
          <TabsList>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="debit">Debit</TabsTrigger>
          </TabsList>
          <TabsContent value="credit">This amount will be credited to your account</TabsContent>
          <TabsContent value="debit">This amount will be debited from your account</TabsContent>
        </Tabs>
        <div className="flex justify-center items-center mb-2">
          <div className="flex text-slate-500 justify-center items-center">
            <p className="p-1 flex">
              <b>$</b>
            </p>
          </div>
          <Input 
            className="mb-2 w-auto text-center" 
            placeholder="enter amount"
            value={amount}
            min="0"
            onChange={handleAmountChange}
          />
          <div className="flex text-slate-500 justify-center items-center">
            <p className="p-1 flex">
              <b>.</b>
            </p>
          </div>
          <Input 
            className="mb-2 w-14 text-center" 
            placeholder="00"
            value={cents}
            min="0"
            onChange={handleCentChange}
          />
        </div>
        <Input 
            className="mb-2 w-auto" 
            placeholder="enter bucket name" 
            value={bucket} 
            onChange={e => setBucket(e.target.value)}
          />
          <Input 
            className="mb-2 w-auto" 
            placeholder="enter account name" 
            value={account} 
            onChange={e => setAccount(e.target.value)}
          />
        <Textarea 
          className="w-auto"
          placeholder="enter description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </CardContent>
      <CardFooter className="w-full justify-center">
        <Button
          onClick={addTransaction}
          variant="outline" 
          className="w-1/2">Add</Button>
      </CardFooter>
    </Card>
  );
}

export default AddTransactionWidget