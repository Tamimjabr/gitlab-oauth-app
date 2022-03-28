/**
 * Profile page used to display the user information
 *
 * @author Tamim Jabr
 * @version 1.0.0
 */
import React from 'react'
import { getGitlabOauthTokens } from '../intergrations/gitlab-oauth-tokens'
import { withSessionSsr } from '../config/iron-session-config'
import { getGitlabUserInfo, GitlabUserInfo } from '../intergrations/gitlab-user-info'
import Error from 'next/error'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import ProfileCard from '../components/ProfileCard'
import { Box } from '@mui/material'
import { getGitlabOauthUrl } from '../utils/gitlab-oauth-url'
import ProfileTabs from '../components/ProfileTabs'
import { isExpiredAccessToken, updateTokens } from '../utils/tokens-expiration-checker'
import Head from 'next/head'
import { getCsrfTokenAndSaveOnSession } from '../utils/csrf-token-handler'

type ProfileProps = {
  userInfo: GitlabUserInfo | null,
  error: { code: number, message: string } | null
}

const Profile = ({ userInfo, error }: ProfileProps) => {
  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="profile" content="user profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileTabs />
      <Box sx={{ width: '100%', display: 'flex', m: '2rem auto' }}>
        {userInfo && <ProfileCard userInfo={userInfo} />}
      </Box>
    </>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req, query }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProfileProps>> {
    try {

      if (req.session?.tokens && isExpiredAccessToken(req.session.tokens)) {
        await updateTokens(req)
      }

      if (query.code) {
        const { code, state } = query

        // check CSRF token sent back from Gitlab
        if (state !== req.session.state) {
          return {
            props: {
              userInfo: null,
              error: {
                code: 401,
                message: 'Unauthorized',
              }
            }
          }
        }

        const tokens = await getGitlabOauthTokens(code as string)
        req.session.tokens = tokens

        await req.session.save()
        return {
          redirect: {
            destination: '/profile',
            permanent: false,
          },
        }
      } else if (!req.session.tokens) {
        // if no tokens, redirect to gitlab oauth page
        const state = await getCsrfTokenAndSaveOnSession(req)
        return {
          redirect: {
            destination: getGitlabOauthUrl(state),
            permanent: false,
          },
        }
      }

      const userInfo: GitlabUserInfo = await getGitlabUserInfo(req.session.tokens.accessToken)

      req.session.userInfo = userInfo
      await req.session.save()

      return {
        props: {
          userInfo,
          error: null
        }
      }
    } catch (error: any) {
      return {
        props: {
          userInfo: null,
          error: {
            code: 401,
            message: error.message
          }
        }
      }
    }
  }
)

export default Profile