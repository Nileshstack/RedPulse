"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Request = () => {
  const { data: session, status } = useSession();
   const router = useRouter()
  const [blood, setBlood]= useState([])
    useEffect(() => {
  if (status === 'unauthenticated') {
    toast.error("Register First to Donate");
    router.push("/validate/register");
  }
}, [status, router]);
  const handleDelete = async(id) => {
    try {
      await fetch(`/api/inventory/${id}`,
        {method:"DELETE"}
      );
      toast.success("Deleted Sucessfully")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  };

  const Item = ({ label, value }) => (
    <div className={styles.item}>
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );
   const getBlood = async()=>{
    try {
      let data = await fetch('/api/inventory', {
        cache: "no-store"
      });
      data= await data.json();
      setBlood(data)
    } catch (error) {
      toast.error("Something went wrong")
      console.error("Failed to fetch posts", err);
      setBlood([]);
    }
   }
    useEffect(() => {
    getBlood();
  }, []);
  return (
    <div className={styles.container}>
  <div className={styles.wrapper}>
    {[...blood]
      .sort((a, b) => a.bloodGroup.localeCompare(b.bloodGroup))
      .map((item) => (
        <div className={styles.card} key={item._id}>
          {status === "authenticated" && session?.user?.role === "admin" && (
            <div className={styles.closeBtn} onClick={() => handleDelete(item._id)}>❌</div>
          )}
          <h2 className={styles.heading}>🩸 Blood Group: {item.bloodGroup}</h2>
          <div className={styles.grid}>
            <Item label="🧾Quantity" value={item.quantity + " Units"} />
            <Item label="🟢Status" value={item.status} />
            <Item label="📍Location" value={item.location} />
            <Item label="📅Collected Date" value={new Date(item.collectedDate).toDateString()} />
            <Item label="📅Expiry Date" value={new Date(item.expiryDate).toDateString()} />
            <Item label="📞Contact" value={item.phone} />
          </div>
        </div>
      ))}
  </div>
</div>

  );
};

export default Request;
