"use client"
import { useState, useEffect } from 'react'
import { Transaction } from '@/types'
import AddTransaction from "@/components/add-transaction-widget"
import Ledger from "@/components/ledger-widget"
import Bucket from "@/components/bucket-widget"
import Settings from "@/components/settings-widget"
// import { createClient } from '@/utils/supabase/client'
// import { cookies } from 'next/headers'
import { supabase } from '@/utils/supabase/client'

export default function Home() {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const cookieStore = cookies()

  const getTransactionData = async () => {
    const { data } = await supabase.from('transactions').select()
    if (!data) return
    setTransactions(data)
  }

  useEffect(() => {
    getTransactionData()
  }, [])

  return (
    <main className="w-screen flex flex-col md:flex-row flex-wrap overflow-hidden">
      <AddTransaction 
        setTransactions={setTransactions}
        transactions={transactions}
      />
      <Ledger transactions={transactions}/>
      <Bucket/>
      <Settings/>
    </main>
  );
}
