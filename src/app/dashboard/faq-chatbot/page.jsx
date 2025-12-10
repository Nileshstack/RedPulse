"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function FAQChatbot() {
  const recentFAQs = [
    {
      question: "Blood donation eligibility?",
      answer:
        "A person must be 18+ years old, weigh at least 50kg, and be healthy.",
    },
    {
      question: "How often can I donate blood?",
      answer: "Every 3 months for males, every 4 months for females.",
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, it is safe. All equipment used is sterile and disposable.",
    },
  ];

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBlood, setSelectedBlood] = useState("A+");

  // who a blood type can give to
  const compatibility = {
    "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "A+": ["A+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "AB-": ["AB+", "AB-"],
    "AB+": ["AB+"],
  };
  
  const giveToList = compatibility[selectedBlood] || [];
  //From whome you can take blood
  const canReceiveFrom = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
};

  const takeFromList = canReceiveFrom[selectedBlood] || [];

  const askChatbot = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Error fetching answer.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>

      <div className={styles.columns}>
        <div className={styles.chatbotColumn}>
          <div className={styles.chatbotLayout}>
            {/* for faq's */}
            <div className={styles.leftSide}>
              <div className={styles.faqSection}>
                <h2 className={styles.subHeading}>Recent FAQs</h2>
                {recentFAQs.map((faq, index) => (
                  <div key={index} className={styles.faqCard}>
                    <strong>Q:</strong> {faq.question} <br />
                    <strong>A:</strong> {faq.answer}
                  </div>
                ))}
              </div>

              <div className={styles.inputSection}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className={styles.textArea}
                />
              </div>
              <button onClick={askChatbot} className={styles.button}>
                {loading ? "Thinking..." : "Ask Chatbot"}
              </button>
            </div>

            {/* for answers */}
            <div className={styles.rightSide}>
              {answer ? (
                <>
                  <strong>Chatbot:</strong> {answer}
                </>
              ) : (
                <p>Ask away—whatever sparks your curiosity...</p>
              )}
            </div>
          </div>
        </div>

        {/* Donation info section appended as requested */}
        <div className={styles.donationColumn}>
          <section className={styles.donationSection}>
            <h1 className={styles.donationHeading}>Learn About Donation</h1>

            <div className={styles.bloodTypePicker}>
              <p className={styles.pickerLabel}>Select your Blood Type</p>
              <p className={styles.pickerLabel}>One Blood Donation can save upto <span> Three </span>Lives</p>
              <div className={styles.bloodButtons}>
                {["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"].map(
                  (type) => (
                    <button
                      key={type}
                      className={`${styles.bloodBtn} ${
                        type === selectedBlood ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedBlood(type)}
                      aria-pressed={type === selectedBlood}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className={styles.donationCardRow}>
              <div className={styles.compatCards}>
                <div className={styles.takeCard}>
                  <div className={styles.avatarPlaceholder}>
                    <img src="/avatar2.png" alt="avatar2" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>You can take from</h3>
                    <p className={styles.largeText}>{takeFromList.join(", ")}</p>
                  </div>
                </div>

                <div className={styles.giveCard}>
                  <div className={styles.avatarPlaceholderBlue}>
                    <img src="/avatar1.png" alt="avatar1" />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>You can give to</h3>
                    <p className={styles.largeText}>{giveToList.join(", ")}</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
