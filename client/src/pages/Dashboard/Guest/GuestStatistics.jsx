import { Calendar } from 'react-date-range'
import { FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { GiPlayerTime } from 'react-icons/gi'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import SalesLineChart from '../../../components/Dashboard/Charts/SalesLineChart'
import { formatDistanceToNow } from 'date-fns'

const GuestStatistics = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  // Fetch Guest Stat Data hereu+------
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/guest-stat/${user?.email}`)
      return data
    }
  })


  if (isLoading) return <LoadingSpinner />

  return (
    <div className='2xl:mx-28'>
      <div className='mt-12'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 mx-'>
          {/* Spent Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm xl:text-base leading-normal font-normal xl:font-semibold text-gray-600'>
                Total Spent
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-orange-500'>
                ${stats?.totalSpend}
              </h4>
            </div>
          </div>

          {/* Total Bookings */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillCartPlusFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm xl:text-base leading-normal font-normal xl:font-semibold text-gray-600'>
                Total Bookings
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-500'>
                {stats?.totalBooking}
              </h4>
            </div>
          </div>

          {/* Users Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <GiPlayerTime className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm xl:text-base leading-normal font-normal xl:font-semibold text-gray-600'>
                Guest Since...
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-green-500'>
                {stats?.guestSince && formatDistanceToNow(
                  new Date(stats?.guestSince)
                )}
              </h4>
            </div>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/* Total Sales Graph */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            {/* Render Chart Here */}
            <SalesLineChart data={stats?.chartData}/>
          </div>
          {/* Calender */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden items-center'>
            <Calendar color='#F43F5E'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestStatistics