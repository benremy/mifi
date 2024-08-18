"use client"
import { useState, useEffect } from 'react'
import { Transaction } from '@/types'
import AddTransaction from "@/components/add-transaction-widget"
import Ledger from "@/components/ledger-widget"
import Bucket from "@/components/bucket-widget"
import Settings from "@/components/settings-widget"
import { createClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

export default function Home() {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const cookieStore = cookies()
  const supabase = createClient()

  const testTodos = async () => {
    const { data: todos } = await supabase.from('transactions').select()
    console.log('We have todos', todos)
  }

  useEffect(() => {
    testTodos()
    
  },[])


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
