"use client"
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const logout=()=>{
    signOut({redirect:false});
    router.push("/validate/login"); 
    toast.info("logout")
    }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>RedPulse</Link>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
        
          <Link href="/eligible" className={styles.link}>Donate</Link>
          <Link href="/request" className={styles.link}>Inventory</Link>
         

        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/dashboard/faq-chatbot" className={styles.link}>FAQ's </Link>
          {status==="authenticated"?<button className={styles.logout} onClick={logout}>Logout</button>:""}
      </div>
    </div>
  )
}

export default Navbar
