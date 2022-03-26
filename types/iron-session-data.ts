import { Tokens } from './../intergrations/gitlab-oauth-tokens';
import { GitlabUserInfo } from '../intergrations/gitlab-user-info';

declare module "iron-session" {
  interface IronSessionData {
    userInfo?: GitlabUserInfo
    tokens?: Tokens
    state?: string
  }
}