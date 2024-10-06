import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { axiosSecure } from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useState } from 'react'
import DeleteModal from '../../Modals/DeleteModal'

const BookingDataRow = ({ booking, refetch }) => {

  let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  // console.log("Booking Data Row -------------", booking);

  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/booking/${id}`)
      return data
    },
    onSuccess: async () => {
      await axiosSecure.patch(`/booking/status/${booking?.roomId}`, { status: false })
      toast.success('Your order has been canceled')
      refetch()
    }
  })

  const handleCancelBtn = async id => {

    try {
      await mutateAsync(id)
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }

  }



  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.host?.image}
                className='mx-auto object-contain rounded-full h-10 w-15'
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.guest?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>
              {booking?.guest?.name}
            </p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Cancel</span>
        </button>
        {/* Cancel Modal Button */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleCancelBtn}
          id={booking?.roomId}
        />
      </td>
    </tr>
  )
}

BookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
}

export default BookingDataRow