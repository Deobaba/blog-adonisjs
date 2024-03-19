import env from '#start/env'
// import { defineConfig, transports } from '@adonisjs/mail'

// const mailConfig = defineConfig({
//   default: 'gmail',

//   mailers: {
//     gmail: transports.smtp({
//       host: 'smtp.gmail.com',
//       port: 465, // or 465 for SSL
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: env.get('GMAIL_USERNAME'), // Your Gmail address
//         pass: env.get('GMAIL_PASSWORD'), // Your Gmail password or App Password
//       },
//     }),
//   },
// })

// export default mailConfig

import nodemailer from 'nodemailer'


const sendEmail = async (options:any) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  465,
    auth: {
      user: env.get('GMAIL_USERNAME'),
      pass: env.get('GMAIL_PASSWORD')
    },
    // tls: {
    //   minVersion: 'TLSv1.2',
    //   maxVersion: 'TLSv1.3',
    // }
  }
  );

  const message = {
    from: `Deobaba <adexsquare4192@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};


// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(env.get('SEND_GRID'));

// const sendEmail = async ( options: any) =>{

//   const msg = {
//     to: options.email,
//     from: 'adexsquare4192@gmail.com', // Use the email address or domain you verified above
//     subject: options.subject,
//     text: options.message,
//     html: options.html,
//   };

//   try{
//    await  sgMail.send(msg)
   
//     return true
//   }catch(err){
//     console.log(err)

//     return false

//   }

// }


export default sendEmail;
