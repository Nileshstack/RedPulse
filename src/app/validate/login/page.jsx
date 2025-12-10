"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner'

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") { 
      router.push("/"); 
    } else if (status === "unauthenticated") {
      console.log("User is not authenticated");
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    const res = await signIn("credentials", {
      email,
      password,
      role,
      redirect: false,
    });

    if (res?.error) {
      console.log("Login failed:", res.error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email" className={styles.input} required />
          <input type="password" name="password" placeholder="Password" className={styles.input} required />

          <label htmlFor="role"><h3>Select Role</h3></label>
          <select name="role" className={styles.select}>
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
            <option value="admin">Admin</option>
          </select>
          <button className={styles.button}><h1>Login</h1></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
