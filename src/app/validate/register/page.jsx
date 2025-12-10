"use client"
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
const Page = () => {
    const router = useRouter()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const role = form.role.value;

      if(!name || !email || !password || !role){
        return toast.error("Credentials required")
      }
      try {
        const res = await fetch("/api/auth/register",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,password,role
            })
        })
        res.status===201 && router.push("/validate/login?success=Account_has_been_created");
        toast.success("Account has been created")
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
      }
    }
  return (
    <div className={styles.container}>
     <form className={styles.form} onSubmit={handleSubmit}>
  <input type="text" name="name" placeholder="Username" className={styles.input} />
  <input type="text" name="email" placeholder="Email" className={styles.input} />
  <input type="text" name="password" placeholder="Password" className={styles.input} />
  
  <label htmlFor="role">Select Role</label>
  <select name="role" className={styles.select}>
    <option value="donor">Donor</option>
    <option value="receiver">Receiver</option>
  </select>

  <button className={styles.button}>Register</button>
</form>
     <Link href='/validate/login'>Login With an existing account</Link>
    </div>
  )
}

export default Page
