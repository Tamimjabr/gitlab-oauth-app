/**
 * Logout page used to destroy the session and redirect to the index page
 *
 * @author Tamim Jabr
 * @version 1.0.0
 */
import React from 'react'
import { withSessionSsr } from '../config/iron-session-config'
import { GetServerSidePropsContext } from 'next'

const Logout = () => {
  return (
    <div>Logout...</div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }: GetServerSidePropsContext) {
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