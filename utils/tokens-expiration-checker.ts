import { refreshGitlabTokens } from './../intergrations/gitlab-oauth-tokens'
import { Tokens } from "../intergrations/gitlab-oauth-tokens"

/**
 * Check if the access token is expired.
 *
 */
export const isExpiredAccessToken = (tokens: Tokens): boolean => {
  // Check if the access token is expired, and give 3 seconds to be safe
  return ((tokens.expiresIn + tokens.createdAt) - (Date.now() / 1000)) < 3
}

/**
 * Get new access and refresh tokens from Gitlab and replace 
 * the current tokens.
 *
 */
export const updateTokens = async (req: any): Promise<void> => {
  req.session.tokens = await refreshGitlabTokens(req.session.tokens)
  await req.session.save()
}