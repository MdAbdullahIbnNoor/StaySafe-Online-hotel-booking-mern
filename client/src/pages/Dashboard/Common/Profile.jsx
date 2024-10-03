import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import useRole from '../../../hooks/useRole'
import { useState } from 'react'
import UpdateUserProfileModal from '../../../components/Modals/UpdateUserProfileModal'
import { imageUpload } from '../../../api/utils'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user, updateUserProfile, resetPassword, loading } = useAuth()
    const [role, isLoading] = useRole()
    const [isModalOpen, setModalOpen] = useState(false)
    const [imageText, setImageText] = useState('Upload New Image')

    // close modal
    const closeModal = () => {
        setModalOpen(false)
    }

    // handle Form submit
    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const image = form.image.files[0]

        try {
            const imageUrl = await imageUpload(image)
            await updateUserProfile(name, imageUrl)
            toast.success('Profile Updated Successfully')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleImageText = image => {
        setImageText(image.name)
    }

    // handle change password
    const handleResetPassword = async () => {
        if (!user?.email) return toast.error("Please provide email to reset password")
        try {
            console.log(user?.email)
            // setLoading(true)
            await resetPassword(user?.email)
            toast.success("Request success! Check email for further process")
        } catch (error) {
            console.log(error.message);
        }
    }

    if (loading || isLoading) return <LoadingSpinner />

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto bg-white rounded-lg shadow-lg'>
                <div className='relative'>
                    <img
                        alt='Cover Image'
                        src='https://wallpapercave.com/wp/wp10784415.jpg'
                        className='w-full h-36 rounded-t-lg object-cover'
                    />
                    <div className='absolute top-20 left-1/2 transform -translate-x-1/2'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='w-24 h-24 lg:h-36 lg:w-36 rounded-full border-4 border-rose-400 shadow-lg shadow-gray-600 object-cover'
                        />
                    </div>
                </div>
                <div className='mt-24 p-6 text-center'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
                        {user?.displayName}
                    </h2>
                    <p className='text-gray-500 mt-1'>Role: <span className='font-bold text-rose-600 uppercase'>{role}</span></p>
                    <p className='text-gray-600 mt-1'>User ID: {user?.uid}</p>
                    <p className='text-gray-600 mt-1'>Email: <span className='font-medium text-rose-600 italic'>{user?.email}</span></p>

                    <div className='flex justify-center mt-8 space-x-4'>
                        <button
                            onClick={() => setModalOpen(true)}
                            className='bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md transition'>
                            Update Profile
                        </button>
                        <button
                            onClick={handleResetPassword}
                            className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition'>
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            <UpdateUserProfileModal
                handleSubmit={handleSubmit}
                setShowModal={setModalOpen}
                showModal={isModalOpen}
                closeModal={closeModal}
                user={user}
                imageText={imageText}
                handleImageText={handleImageText}
            />
        </div>
    )
}

export default Profile
