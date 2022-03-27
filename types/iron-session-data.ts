/**
 * Used to extend the type IronSessionData with additional optional data.
 *
 * @author Tamim Jabr
 * @version 1.0.0
 */
import { Tokens } from './../intergrations/gitlab-oauth-tokens';
import { GitlabUserInfo } from '../intergrations/gitlab-user-info';

declare module "iron-session" {
  interface IronSessionData {
    userInfo?: GitlabUserInfo
    tokens?: Tokens
    state?: string
  }
}