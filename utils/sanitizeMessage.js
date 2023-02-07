export function sanitizeMessage({ message }) {
  console.log({ message })
  const splited_text = message.split('&')
  const from_sanitezed = splited_text[12].split('=')[1]
  const sanitezed_body = decodeURI(splited_text[6].replaceAll('+',' '))
  /* [0] SmsMessageSid=SM16as50asdas12348a787a5b123 */
  /* [1] //NumMedia */
  /* [2] //ProfileName */
  /* [3] //SmsSid (obsoleto)*/
  /* [4] //WaId (Phone number) */
  /* [5] //SmsStatus (obsoleto)*/
  /* [6] //Body */
  /* [7] //To (Twilio number) */
  /* [8] //NumSegments */
  /* [9] //ReferralNumMedia */
  /* [10] //MessageSid */
  /* [11] //AccountSid (twilio account ID)*/
  /* [12] //From */
  /* [13] //ApiVersion */
  return {
    from_whatsapp: decodeURIComponent(from_sanitezed),
    from_body: sanitezed_body.split('=')[1]
  }
}
