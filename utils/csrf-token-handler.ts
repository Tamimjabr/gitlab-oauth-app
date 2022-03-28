import cryptoRandomString from 'crypto-random-string'
import { IncomingMessage } from 'http';


/**
 * Generate and save csrf token to session.
 *
 */
export const getCsrfTokenAndSaveOnSession = async (req: IncomingMessage): Promise<string> => {
  const state = generateCsrfToken()
  req.session.state = state
  await req.session.save()
  return state
}

/**
 * Generate random string to be used as csrf token.
 * 
 */
const generateCsrfToken = (): string => {
  return cryptoRandomString({ length: 20, type: 'url-safe' });
}