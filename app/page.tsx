"use client"
import { useState } from 'react'
import { Transaction } from '@/types'
import AddTransaction from "@/components/add-transaction-widget"
import Ledger from "@/components/ledger-widget"
import Bucket from "@/components/bucket-widget"
import Settings from "@/components/settings-widget"

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  return (
    <main className="w-screen flex overflow-hidden">
      <AddTransaction 
        setTransactions={setTransactions}
        transactions={transactions}
      />
      <Ledger transactions={transactions}/>
      {/* <Bucket/> */}
      {/* <Settings/> */}
    </main>
  );
}
