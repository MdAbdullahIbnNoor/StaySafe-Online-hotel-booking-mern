import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuIteam'
import useRole from '../../../../hooks/useRole'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import HostModal from '../../../Modals/HostModal'
import useAuth from '../../../../hooks/useAuth'
import toast from 'react-hot-toast'

const GuestMenu = () => {
    const [role] = useRole()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    // for Modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const { mutateAsync } = useMutation({
        mutationFn: async currentUser => {
            const { data } = await axiosSecure.put(
                `/user`, currentUser
            )
            return data
        },
        onSuccess: () => {
            toast.success('Request send successfully')
            closeModal()
        },
    })

    const handleModal = async () => {
        const currentUser = {
            email: user?.email,
            role: 'guest',
            status: 'Requested',
        }
        try {
            await mutateAsync(currentUser)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <>
            <MenuItem
                icon={BsFingerprint}
                label='My Bookings'
                address='my-bookings'
            />

            {
                role === 'guest' &&
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
                    <GrUserAdmin className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Become A Host</span>
                </button>
            }

            {/* Modal for Hosting your Home */}
            <HostModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                handleModal={handleModal}
            />
        </>
    )
}

export default GuestMenu