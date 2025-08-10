import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className={styles.container}>
       <div>@2025 RedPulse. All rights reserved. </div>
    <div>
      <div className={styles.imageContainer}>
        <a href="https://www.facebook.com/share/195shbyB5e/"><Image src="/1.png" width={20} className={styles.icon} height={20} alt='Lama Dev'/></a>
        <a href="https://www.instagram.com/srivastava._.ji?igsh=b21oM3V1ZnNzZzUw"><Image src="/2.png" width={20} className={styles.icon} height={20} alt='Lama Dev'/></a>
        <a href="https://www.linkedin.com/in/nilesh-srivastava-3b1b66373/"><Image src="/3.png" width={20} className={styles.icon} height={20} alt='Lama Dev'/></a>
        <Link href="#"><Image src="/4.png" width={20} className={styles.icon} height={20} alt='Lama Dev'/></Link>
      </div>
    </div>
    </div>
  )
}

export default Footer
