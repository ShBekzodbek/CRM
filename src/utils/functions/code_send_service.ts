/** @format */

import "dotenv/config";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  await transporter
    .sendMail({
      from: `${process.env.user}`, // sender address
      to: `${to}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${text}`, // plain text body
      html: `${html}`,
    })
    .then((info: any) => {
      console.log("Email has been sent");
    })
    .catch((err: Error) => {
      console.log(`Error while sending email to user` + err.message);
    });
};
