import React from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { getGitlabOauthTokens } from '../utils/gitlab-oauth-tokens'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any) {
    const code = query.code
    const tokens = await getGitlabOauthTokens(code)
    req.session.tokens = tokens
    await req.session.save()

    

    return {
      props: {

      }
    }
  },
  IRON_SESSION_CONFIG
)

export default Profile