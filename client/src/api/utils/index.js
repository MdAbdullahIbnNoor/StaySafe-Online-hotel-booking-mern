// image upload

import axios from "axios"

export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
            }`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data.data.display_url; // Ensure the correct URL is returned
    } catch (error) {
        console.log('Error uploading image:', error);
        throw error;
    }
};


// export const imageUpload = async image => {

//     const formData = new FormData()
//     formData.append('image', image)

//     const { data } = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
//         }`,
//         formData
//     )

//     return data.data.display_url
// }