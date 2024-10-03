import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { differenceInCalendarDays } from 'date-fns';
import useAuth from '../../hooks/useAuth'
import BookingModal from '../Modals/BookingModal';

const RoomReservation = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: 'selection'
    }
  ]);

  // handle close booking modal
  const closeModal = () => {
    setIsOpen(false)
  }

  // total price = total days * price
  const total_price = parseInt(
    differenceInCalendarDays(new Date(room.to), new Date(room.from))
  ) * room?.price
  // console.log(total_price);

  const bookingInfo = {
    ...room,
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL
    }, 
    price: total_price
  }


  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {room?.price}</div>
        <div className='font-light text-neutral-600'>/ night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        <DateRange
          showDateDisplay={false}
          rangeColors={['#F6536D']}
          editableDateInputs={false}
          onChange={item => setState([
            {
              startDate: new Date(room.from),
              endDate: new Date(room.to),
              key: 'selection'
            }])
          }
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className='p-4'>
        <Button onClick={() => setIsOpen(true)} label={'Reserve'} />
        <BookingModal closeModal={closeModal} isOpen={isOpen} bookingInfo={bookingInfo}/>
      </div>
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${total_price}</div>
      </div>
    </div>
  )
}

RoomReservation.propTypes = {
  room: PropTypes.object,
}

export default RoomReservation
