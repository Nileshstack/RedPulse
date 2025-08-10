"use client"
import React from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
const page = () => {
   const router = useRouter()
   const session = useSession()
   if(session.status==='unauthenticated'){
    router?.push("/validate/register")
    toast.error("Register First to Donate")
   }
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const form = e.target;
      const weight = parseFloat(form.weight.value);
      const age = parseInt(form.age.value);
      const vaccine = form.vaccine.value;
      const fever = form.fever.value;
      const medical = form.medical.value;

      if(weight<50){
        return toast.error("You Are Under Weight (Not eligible)")
      }
      if( age<18 || age>60){
        return toast.error("You are Under Age (Not eligible)")
      }
      if(vaccine === "true" || fever === "true" || medical === "true"){
        return toast.error("You are not elegible for donation")
      }
      sessionStorage.setItem("isEligible", "true");
     router.push("/donate?success=Now_elegible_for_donation");
    toast.success("You are now elegible for donation😊")
    }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <form className={styles.customform} onSubmit={handleSubmit}>
        <h2>⚠️ <u>Eligibility comes before action</u></h2>

        <input type="text" name='weight' placeholder="Weight (e.g. 50Kg)" required /> 
        <input type="text" name='age' placeholder="Age" required />
        <select name="vaccine" className={styles.select} required>
        <option value="" disabled selected hidden>
            Vaccinated Lately?
        </option>
        <option value="true">YES</option>
        <option value="false">NO</option>
        </select>

        <select name="fever" className={styles.select} required>
        <option value="" disabled selected hidden>
            Had fever in the last week?
        </option>
        <option value="true">YES</option>
        <option value="false">NO</option>
        </select>

        <select name="medical" className={styles.select} required>
        <option value="" disabled selected hidden>
            Had any Medical History?
        </option>
        <option value="true">YES</option>
        <option value="false">NO</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default page
