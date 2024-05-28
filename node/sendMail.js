// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  auth: {
    user: 'jhl9812181',
    pass: 'D1MWCQUMR5HL'
  }
});

var mailOptions = {
  from: 'jhl9812181@naver.com',
  to: 'rokmc741st@naver.com',
  subject: 'Title',
  html: `<h1 style="color:violet">This is html</h1><img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTRfMTE5%2FMDAxNzA1MjI5NjQ3ODgx.DIuwrDNZnezDya5wkab8dVYTUsyLuUzul5z6KwNmDTMg.iObSfvceCqMWdKZitE1nFBPnlTtvCLUX3y7myncfumYg.JPEG.doremicat_incheon%2F%25C3%25BB%25C1%25D6%25B0%25ED%25BE%25E7%25C0%25CC%25BA%25D0%25BE%25E7_%25284%2529.jpg&type=sc960_832">`
};

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

async function sendMail() {
    const result = await transporter.sendMail(mailOptions);
    let str = '';
    (result.envelope.to).forEach(email => {
        str += ' ' + email + '\n';
    });

    str += '전송 완료';
    console.log(str);
}

sendMail();