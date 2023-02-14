const sgMail = require('@sendgrid/mail');

export default async function(req: any, res: any) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { firstName, lastName, email, subject, message } = req.body;

  const content = {
    to: `${process.env.SENDGRID_API_EMAIL}`,
    from: `${process.env.SENDGRID_API_EMAIL}`,
    subject: `${firstName} ${lastName} - ${subject}`,
    text: message,
    html: `<h1>You have a new message from your portfolio</h1>
      <p>From: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Subject: ${subject}</p>
      <br />
      <p style="font-weight: bold; text-decoration: underline;">Message:</p>
      <p>
      ${message}
      </p>`
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
}