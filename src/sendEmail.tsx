import nodemailer from 'nodemailer'
import google from 'googleapis'
import accountTransport from '../account_transport.json'
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport'
const OAuth2 = google.Auth.OAuth2Client

export default async function mail_rover(callback: (arg0: nodemailer.Transporter<SentMessageInfo>) => void): Promise<void> {
  try {
    const Oauth2Client = new OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      "https://developers.google.com/oauthplayground",
    )
    Oauth2Client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken,
    })
    Oauth2Client.getAccessToken((err, token) => {
      if (err) {
        return console.log(err)
      }
      accountTransport.auth.accessToken = token!
      const transporter = nodemailer.createTransport({
        service: accountTransport.service,
        auth: {
          type: 'OAuth2',
          user: accountTransport.auth.user,
          clientId: accountTransport.auth.clientId,
          clientSecret: accountTransport.auth.clientSecret,
          refreshToken: accountTransport.auth.refreshToken,
          accessToken: accountTransport.auth.accessToken,
        },
      });
      callback(nodemailer.createTransport(transporter))
    })
  } catch (error) {
    console.log(error)
  }
}
 
 