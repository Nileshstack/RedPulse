"use client"
import React, { useEffect } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
const page = () => {
    const router = useRouter()
    useEffect(() => {
  const isEligible = sessionStorage.getItem("isEligible");
  if (isEligible !== "true") {
    toast.info("Please check eligibility first!")
    router.push("/eligible");
  }
}, []);
     const handleSubmit=async(e)=>{
      e.preventDefault()
      const form = e.target;
      const bloodGroup = form.bloodGroup.value;
      const quantity = form.quantity.value;
      const status = form.status.value;
      const location = form.location.value;
      const phone = form.phone.value;

      if(!bloodGroup || !quantity || !status || !location || !phone){
        toast.warn("credentials required")
      }
      try {
        const res = await fetch("/api/inventory",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                bloodGroup,quantity,status,location,phone
            })
        })
        res.status === 201 && (toast.success("Inventory has been updated"), router.push("/"));
        //not && two times because && excute the next statemet if prev one is true
      } catch (error) {   
        toast.error("Something went wrong")                                                       
        console.log(error)
      }
    }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <form className={styles.customform} onSubmit={handleSubmit}>
        <h2>🩸 <u>Let your veins carry the gift of life.</u></h2>

        <select name="bloodGroup" className={styles.select} required>
        <option value="" disabled selected hidden>
            Blood group e.g.(A+)
        </option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        </select>

        <input type="text" name='quantity' placeholder="Quantity" required />

        <select name="status" className={styles.select} required>
        <option value="" disabled selected hidden>
            When would you like to donate?
        </option>
        <option value="Later today">A Little Later Today</option>
        <option value="Sometime soon">Sometime Soon</option>
        <option value="When needed">Only When Needed</option>
        </select>
         <input type="text" name='location' placeholder="Location" required />
         <input type="text" name='phone' placeholder="Contact" required />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default page
