import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ill from "../../../public/blood3.png";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={ill} fill={true} alt="Image" className={styles.img} />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Every Drop Counts</h1>
          <h2 className={styles.imgDecs}>
            Where Hope Finds Blood & Help Meets Heart
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who are we?</h1>
          <p className={styles.decs}>
           At RedPulse, we are a community of givers, volunteers, and life-savers united by one mission — to keep the lifeline flowing. 
           In a world where every second counts, we aim to be the bridge between those who can give and those who need it most. Whether 
           it’s urgent requests, awareness campaigns, or inspiring donor stories — we put heart into every action. <br /> <br />
           At <span>RedPulse</span>, we are a community of givers, volunteers, and life-savers united by one mission — to keep the lifeline flowing. 
           In a world where every second counts, we aim to be the bridge between those who can give and those who need it most. Whether 
           it’s urgent requests, awareness campaigns, or inspiring donor stories — we put heart into every action.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What we do?</h1>
          <p className={styles.decs}>
            We connect donors, recipients, and blood banks in a unified, responsive platform 
            to make blood donation easier, faster, and more reliable. From finding a matching 
            donor in seconds to spreading awareness about the importance of donation, we turn 
            compassion into action.<br />
            <br />
            ✦ We connect people in urgent need with compatible donors. <br />
            ✦ We spread awareness about the life-saving power of blood donation.
            <br />
            ✦ We celebrate every donor — because every drop counts. <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
