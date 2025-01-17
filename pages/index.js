import Intro from '@/components/Intro'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { setUserToken, setUserData } from '@/Utils/UserSlice'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { get_job } from '@/Services/job'
import { setJobData } from '@/Utils/JobSlice'
import { InfinitySpin } from 'react-loader-spinner'



export default function Home() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');


  const { data, error, isLoading } = useSWR('/getAllJobs', get_job)

  useEffect(() => {
    if (data) dispatch(setJobData(data?.data))
  }, [data, dispatch])


  useEffect(() => {
    if (token) {
      dispatch(setUserToken(token))
    }
    else {
      localStorage.removeItem('user')
      dispatch(setUserData(null))
    }
  }, [token, dispatch])

  return (
    <>

      <Head>
        <title>Job Poral</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="language" content="en-US" />
      </Head>

      {
        isLoading ? (
          <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
            <InfinitySpin width='200' color="#4f46e5" />
            <p className='text-xs uppercase'>Cargando...</p>
          </div>
        ) : (
          <>
            <NavBar />
            <div className="w-full h-screen bg-gray-200  text-black">
              <Intro />
            </div>
          </>
        )
      }
    </>
  )
}
