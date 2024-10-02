import React, { useState } from 'react'
import AddRoomForm from '../../../components/Form/AddRoomForm'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddRoom = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const handleDates = item => {
        console.log(item);
        setDates(item.selection)
    }

    // using tanstack query to post room data on DB
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post(`/room`, roomData)
            return data
        },
        onSuccess: () => {
            console.log("Content Saved Successfully")
            toast.success('Room added successfully!!')
            navigate('/dashboard/my-listings')
            setLoading(false)
        },
    })

    // Form Handler
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value
        const guests = form.total_guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }

        try {
            const image_url = await imageUpload(image)

            if (!image_url) {
                throw new Error('Image upload failed');
            }

            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guests,
                bathrooms,
                description,
                bedrooms,
                image: image_url,
                host
            }

            await mutateAsync(roomData)
            console.log(roomData);


        } catch (err) {
            console.log(err);
            toast.error(err.message)
            setLoading(false)
        }

    }

    // handle image change
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <>
            <Helmet>
                <title> Add Room | Dashboard</title>
            </Helmet>
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            />
        </>
    )
}

export default AddRoom