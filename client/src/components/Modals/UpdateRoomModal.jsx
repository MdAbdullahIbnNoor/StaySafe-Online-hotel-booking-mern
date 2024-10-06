import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import UpdateRoomForm from '../Form/UpdateRoomForm'
import { imageUpload } from '../../api/utils'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const UpdateRoomModal = ({ setIsUpdateOpen, isUpdateOpen, room, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const [roomData, setRoomData] = useState(room)
  const [imagePreview, setImagePreview] = useState(room?.image)
  const [imageText, setImageText] = useState('Upload Image')
  const [dates, setDates] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: 'selection'
  })

  const handleDates = item => {
    console.log(item);
    setDates(item.selection)
  }

  // handle image change
  const handleImage = async image => {
    setLoading(true)
    try {
      const image_url = await imageUpload(image)

      if (!image_url) {
        throw new Error('Image upload failed');
      }

      setRoomData({
        ...roomData,
        image: image_url
      })
      setImagePreview(URL.createObjectURL(image))
      setImageText(image.name)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  const { mutateAsync } = useMutation({
    mutationFn: async updateData => {
      const { data } = await axiosSecure.put(`/room/update/${room?._id}`, updateData)
      return data
    },
    onSuccess: () => {
      toast.success('Room data updated')
      setLoading(false)
      refetch()
      setIsUpdateOpen(false)
    }
  })

  // handle form data input
  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    const updatedRoomData = Object.assign({}, roomData)
    delete updatedRoomData._id
    console.log(updatedRoomData);

    try {
      await mutateAsync(updatedRoomData)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }


  return (
    <Transition appear show={isUpdateOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsUpdateOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Room Info
                </DialogTitle>
                <div className='mt-2 w-full'>
                  {/* Update room form */}
                  <UpdateRoomForm
                    roomData={roomData}
                    dates={dates}
                    loading={loading}
                    handleDates={handleDates}
                    imagePreview={imagePreview}
                    handleImage={handleImage}
                    imageText={imageText}
                    handleSubmit={handleSubmit}
                    setRoomData={setRoomData}
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsUpdateOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateRoomModal.propTypes = {
  setIsUpdateOpen: PropTypes.func,
  isUpdateOpen: PropTypes.bool,
}

export default UpdateRoomModal