import PropTypes from 'prop-types'
import UpdateUserModal from '../../Modals/UpdateUserModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosSecure } from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(`/users/update/${user.email}`, role)
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success('User Role Updated Successfully')
      refetch()
    }
  })

  const modalHandler = async selected => {

    if (loggedInUser.email === user.email) {
      toast.error("Action Not Allowed")
      return setIsOpen(false)
    }

    // Renaming the variable to avoid shadowing
    const userData = {
      role: selected,
      status: 'Verified',
    }

    try {
      await mutateAsync(userData)
    } catch (error) {
      console.log(error)
      toast.error('Error: ', error.message)
    }
    setIsOpen(false)
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <button
            onClick={() => setIsOpen(true)}
            className='relative'>Update Role
          </button>
        </span>
        {/* Update User Modal */}
        <UpdateUserModal
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
