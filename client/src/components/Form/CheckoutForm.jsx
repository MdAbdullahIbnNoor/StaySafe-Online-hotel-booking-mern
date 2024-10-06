import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { ImSpinner9 } from 'react-icons/im';
import './CheckoutForm.css'
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutForm = ({ closeModal, bookingInfo, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)

    const PriceObj = { price: bookingInfo.price }

    useEffect(() => {
        // fetch client secret
        if (bookingInfo.price && bookingInfo.price > 1) {
            getClientSecret(PriceObj)
        }
    }, [bookingInfo.price])

    // get client secret
    const getClientSecret = async Price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, Price)
        console.log('Client Secret from server: ', data);
        setClientSecret(data.clientSecret)
    }

    // console.log("Booking Info: ----------> ", bookingInfo);
    // console.log("User Info: ----------> ", user.email, "& ", user.displayName);


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        // confirm payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                },
            },
        })

        if (confirmError) {
            console.log(confirmError);
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            // console.log(paymentIntent);
            // 1. Create payment info object
            const paymentInfo = {
                ...bookingInfo,
                roomId: bookingInfo._id,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            // delete _id from payment info
            delete paymentInfo._id
            if (paymentInfo.booked) delete paymentInfo.booked
            // console.log(paymentInfo);
            setProcessing(false)
            closeModal()

            // 2. Save payment info in booking collection (db)
            try {
                const { data } = await axiosSecure.post(`/booking`, paymentInfo)
                console.log(data);

                // 3. Change room status to booked in db
                await axiosSecure.patch(`/booking/status/${bookingInfo._id}`, {
                    status: true
                })
                refetch()
                closeModal()
                toast.success('Thank you for booking our room.')
                navigate('/dashboard/my-bookings')
            } catch (error) {
                console.log(error);
            }
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex mt-2 justify-around'>
                    <button
                        onClick={() => {
                            closeModal()
                        }}
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={!stripe || !clientSecret || processing}
                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    // onClick={closeModal}
                    >
                        {
                            processing
                                ? <ImSpinner9 size={24} className='animate-spin m-auto' />
                                : `Pay $${bookingInfo.price}`
                        }

                    </button>
                </div>
            </form>
            {cardError && <p className='text-red-600 italic font-bold text-center'>{cardError}</p>}
        </>
    );
};

export default CheckoutForm