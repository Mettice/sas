const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@opsyde.io',
      pass: process.env.OPSYDE_SMTP_PASSWORD, // Set this in your Vercel project env vars!
    },
  });

  try {
    await transporter.sendMail({
      from: '"OpSyde Contact" <info@opsyde.io>',
      to: 'info@opsyde.io', // or any recipient
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service || 'N/A'}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || 'N/A'}</p>
        <p><b>Service:</b> ${service || 'N/A'}</p>
        <p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
