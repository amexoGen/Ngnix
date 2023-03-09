const { json } = require('express');
const express = require('express');
const path = require('path');
const { get } = require('http');
const nodemailer = require("nodemailer");
const IP = require('ip');


const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const porta = process.env.PORT || 443 

app.listen(porta, () => {
    console.log(`Website is running on port: ${porta}`)
})

app.post('/api/smtp',  function(request, response) {
    
    const to = request.body.to
    const msg = request.body.msg
    const subject = request.body.subject
 
    async function main() {
     // Async function enables allows handling of promises with await
     
       // First, define send settings by creating a new transporter: 
       let transporter = nodemailer.createTransport({
         host: "smtp.ionos.it", // SMTP server address (usually mail.your-domain.com)
         port: 465, // Port for SMTP (usually 465)
         secure: true, // Usually true if connecting to port 465
         auth: {
           user: "smtp@parmareggio.online", // Your email address
           pass: "Chalada2016?", // Password (for gmail, your app password)
           // ⚠️ For better security, use environment variables set on the server for these values when deploying
         },
       });
       
       // Define and send message inside transporter.sendEmail() and await info about send from promise:
       let info = await transporter.sendMail({
         from: 'smtp@parmareggio.online',
         to: to,
         subject: subject,
         html: msg,
       });
       console.log(info); // Random ID generated after successful send (optional)

       
     }
     

     main()

     response.json({
      success: true,
      message: 'Your message has been successfully sent to '+to+'.',
      timestamp: Date.now()
  })
  })

  app.get('/api/ip',async function(req, res) {
    const ipAddress = IP.address();

    const url = await fetch('https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location')
    const js = await url.text()
    
    res.json({
      ip: ipAddress,
      datas:  js.split('jsonFeed(')[1]
    })
});


app.get('/status',async function(req, res) {
    
    res.json({
      success: true,
      msg: 'Your server is live now.',
      timestamp: Date.now()
    })
});
