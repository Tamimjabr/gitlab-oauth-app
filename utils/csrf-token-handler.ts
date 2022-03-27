import cryptoRandomString from 'crypto-random-string'
import { IncomingMessage } from 'http';



export const getCsrfTokenAndSaveOnSession = async (req: IncomingMessage): Promise<string> => {
  const state = generateCsrfToken()
  req.session.state = state
  await req.session.save()
  return state
}

const generateCsrfToken = () => {
  return cryptoRandomString({ length: 20, type: 'url-safe' });
}