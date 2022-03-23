import Error from 'next/error'
import React from 'react'
import { getGitlabUserEvents, GitlabUserEvent } from '../intergrations/gitlab-user-info'
import { withIronSessionSsr } from "iron-session/next"
import { GetServerSidePropsResult } from 'next'
import { IRON_SESSION_CONFIG } from '../config/iron-session-config'
import ActivitiesTable from '../components/ActivitiesTable'


const Activities = ({ userEvents, error }: any) => {

  if (error?.code) {
    return <Error statusCode={error.code} title={error.message} />
  }
  return (
    <div><ActivitiesTable rows={userEvents} /></div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }: any): Promise<GetServerSidePropsResult<{
    userEvents: GitlabUserEvent[] | null,
    error: { code: number, message: string } | null
  }>> {
    try {
      const userEvents: GitlabUserEvent[] = await getGitlabUserEvents(req.session.tokens.accessToken)

      return {
        props: {
          userEvents,
          error: null
        }
      }
    } catch (error: any) {
      return {
        props: {
          userEvents: null,
          error: {
            code: 401,
            message: error.message
          }
        }
      }
    }

  },
  IRON_SESSION_CONFIG
)


export default Activities