/**
 * Logout page used to destroy the session and redirect to the index page
 *
 * @author Tamim Jabr
 * @version 1.0.0
 */
import React from 'react'
import { withSessionSsr } from '../config/iron-session-config'
import { GetServerSidePropsContext } from 'next'
import { revokeGitlabToken } from '../intergrations/gitlab-oauth-tokens'

const Logout = () => {
  return (
    <div>Logout...</div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: GetServerSidePropsContext) {
    if (req.session?.tokens) {
      try {
        // revoking refresh/access token will result in revoking both tokens
        await revokeGitlabToken(req.session.tokens.refreshToken)
      } catch (error: any) {
        console.log(error.message)
      }
    }

    await req.session.destroy()
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
)


export default Logout