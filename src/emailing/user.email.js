import nodemailer from 'nodemailer'

export const sendEmail = async(options)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth: {
          user: "maryamkhaled2445@gmail.com",
          pass: "pbgtzxnessefkbfx", 
        },
      });


    let info = await transporter.sendMail({
        from: '"mariam" <maryamkhaled2445@gmail.com>', // sender address
        to:options.email, // list of receivers
        subject:"Hello!", // Subject line
        html:options.html, // html body
        //html:"<h1>Hello World</h1>"
      });
}




