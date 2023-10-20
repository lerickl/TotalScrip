'use client'
import { type Session,createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default async function SignInWithGithub({ session }: {session: Session|null}) {
  const [cookies, setCookie, removeCookie] = useCookies(['']) // initializing state cookies
  const supabase = createClient('https://ubfgqtkjxpmdgwblkpwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZmdxdGtqeHBtZGd3YmxrcHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2Njc5MjEsImV4cCI6MjAxMzI0MzkyMX0.fHvbBCxgOvVTQt1qL4JntThxIZXZUqi6yN0sEwxb88A')
   
  useEffect(()=>{
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/authcallback',
      }
    })
  },[]) 
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        providers={['github']}
     
      />
    </div>
  )
}