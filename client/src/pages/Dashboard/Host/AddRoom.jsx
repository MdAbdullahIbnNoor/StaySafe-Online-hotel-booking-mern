import React, { useState } from 'react'
import AddRoomForm from '../../../components/Form/AddRoomForm'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils'

const AddRoom = () => {
    const { user } = useAuth()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageTest] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })

    const handleDates = item => {
        console.log(item);
        setDates(item.selection)
    }

    // Form Handler
    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value
        const guest = form.total_guest.value
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

            const roomData = {
                location, category, title, to, from, price, guest, bathrooms, description, bedrooms, image: image_url, host
            }

            console.table(roomData);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <h1>My Add Room Page...</h1>
            <div className='h-16 w-16'>
                {imagePreview && <img src={imagePreview} />}
            </div>
            {/* Render Form */}
            <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} setImagePreview={setImagePreview} />
        </div>
    )
}

export default AddRoom