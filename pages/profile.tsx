import React from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { getGitlabOauthTokens } from '../utils/gitlab-oauth-tokens'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any) {
    const code = query.code
    const tokens = await getGitlabOauthTokens(code)
    return {
      props: {

      }
    }
  }, {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}
)

export default Profile