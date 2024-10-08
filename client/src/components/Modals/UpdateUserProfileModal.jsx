import React from 'react';

const UpdateUserProfileModal = ({ showModal, handleSubmit, user, closeModal, imageText, handleImageText }) => {
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/* content */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/* header */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center">
                                        User Update Box
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/* body */}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-10 m-16">
                                        <div className="space-y-6">
                                            <div className="space-y-1 text-sm">
                                                <label htmlFor="name" className="block text-gray-600">
                                                    Name
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    placeholder={user?.displayName}
                                                    required
                                                />
                                            </div>

                                            <div className="file_upload px-5 py-2 relative border-4 border-dotted border-gray-300 rounded-lg flex items-center justify-center">
                                                <div className="flex flex-col w-max mx-auto my-auto text-center">
                                                    <label>
                                                        <input
                                                            className="text-sm cursor-pointer w-36 hidden"
                                                            type="file"
                                                            name="image"
                                                            id="image"
                                                            onChange={e => handleImageText(e.target.files[0])}
                                                            accept="image/*"
                                                            hidden
                                                        />
                                                        <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                                                            {
                                                                imageText.length > 20
                                                                    ? imageText.split('.')[0].slice(0, 15) + '.-.-.' + imageText.split('.')[1]
                                                                    : imageText
                                                            }
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* footer */}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit" 
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default UpdateUserProfileModal;
