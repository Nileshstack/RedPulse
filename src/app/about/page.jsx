"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ill from "../../../public/blood3.png";
import { motion } from "framer-motion";

const About = () => {
  // Animation variants for reusability
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.container}>
      {/* Top image section with fade-in effect */}
      <motion.div
        className={styles.imgContainer}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <Image src={ill} fill={true} alt="Image" className={styles.img} />
        <motion.div
          className={styles.imgText}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className={styles.imgTitle}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Every Drop Counts
          </motion.h1>
          <motion.h2
            className={styles.imgDecs}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Where Hope Finds Blood & Help Meets Heart
          </motion.h2>
        </motion.div>
      </motion.div>

      {/* Text section with staggered reveal */}
      <div className={styles.textContainer}>
        
        <motion.div
          className={styles.item}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
        >
           <motion.h1
            className={styles.title}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Who are we?
          </motion.h1>
          <p className={styles.decs}>
            At <span>RedPulse</span>, we are a community of givers, volunteers,
            and life-savers united by one mission — to keep the lifeline
            flowing. In a world where every second counts, we aim to be the
            bridge between those who can give and those who need it most.
            Whether it’s urgent requests, awareness campaigns, or inspiring
            donor stories — we put heart into every action.
            <br /> <br />
            At <span>RedPulse</span>, we are a community of givers, volunteers,
            and life-savers united by one mission — to keep the lifeline
            flowing. In a world where every second counts, we aim to be the
            bridge between those who can give and those who need it most.
            Whether it’s urgent requests, awareness campaigns, or inspiring
            donor stories — we put heart into every action.
          </p>
        </motion.div>

        <motion.div
          className={styles.item}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.9, delay: 0.4 }}
          viewport={{ once: true }}
        >
           <motion.h1
            className={styles.title}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            What we do?
          </motion.h1>
          <p className={styles.decs}>
            We connect donors, recipients, and blood banks in a unified,
            responsive platform to make blood donation easier, faster, and more
            reliable. From finding a matching donor in seconds to spreading
            awareness about the importance of donation, we turn compassion into
            action.
            <br />
            <br />✦ We connect people in urgent need with compatible donors.
            <br />✦ We spread awareness about the life-saving power of blood
            donation.
            <br />✦ We celebrate every donor — because every drop counts. <br />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
