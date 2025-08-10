"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Dashboard from '../../public/dashboard.png'
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>{status === "authenticated" && session?.user && (
          <>
            Hello, {session.user.name}
          </>
        )}<br />Be the reason, someone gets a second chance at life. </h1>
        <p className={styles.description}>Donate blood, save lives — a few minutes for you, a lifetime for someone else.</p>
        {status === "unauthenticated" && (
          <>
            <Link href="/validate/register" ><button className={styles.btn}> Register </button></Link>
          </>
        )}
          
      </div>
      <div className={styles.item}></div>
     <Image src={Dashboard} alt="hero" className={styles.img}></Image>
    </div>
  );
}
