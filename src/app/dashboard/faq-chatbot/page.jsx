"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function FAQChatbot() {
  const recentFAQs = [
    { question: "Blood donation eligibility?", answer: "A person must be 18+ years old, weigh at least 50kg, and be healthy." },
    { question: "How often can I donate blood?", answer: "Every 3 months for males, every 4 months for females." },
    { question: "Is blood donation safe?", answer: "Yes, it is safe. All equipment used is sterile and disposable." }
  ];

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askChatbot = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
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
      <h1 className={styles.mainHeading}>FAQ & Chatbot</h1>
      
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
          <button
            onClick={askChatbot}
            className={styles.button}
          >
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
  );
}
