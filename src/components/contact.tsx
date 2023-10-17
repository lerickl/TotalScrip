

type formdataType= {
  to:string,
  from:string,
  subject:string,
  Text:string
}
export default async function Contact(formdata:formdataType) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to:formdata.to,
      from:formdata.from,
      subject:formdata.subject,
      Text:formdata.Text
    }),
  })
  if(response.ok){
    console.log("Email sent")
  }else {
    console.log("Email not sent")
  }
  return response
}