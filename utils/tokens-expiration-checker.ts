import { refreshGitlabAccessToken } from './../intergrations/gitlab-oauth-tokens';
import { Tokens } from "../intergrations/gitlab-oauth-tokens"

export const isExpiredAccessToken = (tokens: Tokens): boolean => {
  // Check if the access token is expired, and give 3 seconds to be safe
  return ((tokens.expiresIn + tokens.createdAt) - (Date.now() / 1000)) < 3
}

export const updateTokens = async (req: any) => {
  req.session.tokens = await refreshGitlabAccessToken(req.session.tokens)
  await req.session.save()
}