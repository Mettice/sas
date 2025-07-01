import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, website, company, message, service } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for SMTP password
    if (!process.env.OPSYDE_SMTP_PASSWORD) {
      return res.status(500).json({ error: 'SMTP password not set in environment variables.' });
    }

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@opsyde.io',
        pass: process.env.OPSYDE_SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"OpSyde Contact" <info@opsyde.io>',
      to: 'info@opsyde.io',
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website || 'N/A'}\nCompany: ${company || 'N/A'}\nService: ${service || 'N/A'}\n\nMessage:\n${message}\n      `,
      html: `\n        <h2>New Contact Form Submission</h2>\n        <p><b>Name:</b> ${name}</p>\n        <p><b>Email:</b> ${email}</p>\n        <p><b>Phone:</b> ${phone}</p>\n        <p><b>Website:</b> ${website || 'N/A'}</p>\n        <p><b>Company:</b> ${company || 'N/A'}</p>\n        <p><b>Service:</b> ${service || 'N/A'}</p>\n        <p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>\n      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message || 'Unexpected server error' });
    }
  }
}
