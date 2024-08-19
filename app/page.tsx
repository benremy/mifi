"use client";
import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import AddTransaction from "@/components/add-transaction-widget";
import Ledger from "@/components/ledger-widget";
import Bucket from "@/components/bucket-widget";
import Settings from "@/components/settings-widget";
import { Button } from "@/components/ui/button";
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactionData = async (userId: string) => {
    const { data, error } = await supabase
      .from('transactions')
      .select()
      .eq('user_id', userId); // Adjust the column name if needed

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data || []);
    }
  };


  useEffect(() => {
    // Check localStorage for user ID on component mount
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUser(storedUserId);
      getTransactionData(storedUserId); // Fetch transactions if user is already logged in
    } else {
      router.push('/auth'); // Redirect to login page if no user ID
    }

    // Set up the onAuthStateChange listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        localStorage.setItem('userId', session.user.id);
        setUser(session.user.id);
        getTransactionData(session.user.id); // Fetch transactions on successful sign-in
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('userId');
        setUser("");
        setTransactions([]);
        router.push('/auth');
      }
    });

    // Cleanup subscription when the component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error w/ Signout", error);
    } else {
      localStorage.removeItem('userId');
      setUser("");
      setTransactions([]);
      router.push('/auth');
    }
  };

  return (
    <main className="w-screen flex flex-col md:flex-row flex-wrap overflow-hidden">
      <AddTransaction
        user={user}
        setTransactions={setTransactions}
        transactions={transactions}
      />
      <Ledger 
        transactions={transactions}
        setTransactions={setTransactions}
      />
      {/* <Bucket/> */}
      {/* <Settings/> */}
      {/* <Button onClick={handleSignOut}>Sign Out</Button> */}
    </main>
  );
}
