import nodemailer from "nodemailer";

export const sendMessage = async ({ name, email }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  const mailOptions = {
  from: `"RedPulse Support" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Thank You, ${name}! ❤️`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #d32f2f;">Hello ${name} 👋</h2>
      <p>We appreciate you getting in touch with <strong>RedPulse</strong>.</p>
      
      <p>Our team has received your message and will get back to you as soon as possible. Until then, we want to thank you for taking the first step toward making a difference. 🙌</p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <p style="color: #d32f2f; font-weight: bold; font-size: 16px;">
        🩸 Every drop counts — your blood can be someone’s lifeline.
      </p>
      
      <p>Join us in spreading hope, saving lives, and building a healthier tomorrow.</p>

      <br/><br/>
      <p style="font-size: 14px; color: #777;">
        Thank you for being a hero in someone's story. ❤️<br/>
        – Team RedPulse
      </p>
    </div>
  `,
};

  await transporter.sendMail(mailOptions);
};
