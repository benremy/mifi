'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');
  const router = useRouter();

  // Redirect to Home if a user ID is found in localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      router.push('/');
    }
  }, [router]);

  const signIn = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else if (data.session) {
      localStorage.setItem('userId', data.session.user.id); // Store user ID on successful login
      router.push('/');
    }
  };

  const signUp = async () => {
    if (inviteCode !== process.env.NEXT_PUBLIC_INVITE_CODE) {
      console.log('process invite code', process.env.INVITE_CODE)
      return alert('Please enter valid invitation code')
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else if (data.session) {
      localStorage.setItem('userId', data.session.user.id); // Store user ID on successful sign-up
      router.push('/');
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="h-5/6 md:w-1/3 flex flex-col justify-center items-center">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>MIFI | Own Your Finances</CardDescription>
        </CardHeader>
        <CardContent className="h-80 overflow-auto flex flex-col justify-center items-center">
          <Input
            className="mb-2 w-auto"
            type="password"
            placeholder="Invitation Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Input
            className="mb-2 w-auto"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mb-2 w-auto"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex w-1/2 justify-between">
          <Button onClick={signIn}>Sign In</Button>
          <Button onClick={signUp}>Sign Up</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
