import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { differenceInCalendarDays } from 'date-fns'

const Card = ({ room }) => {

  const nights = parseInt(
    differenceInCalendarDays(new Date(room.to), new Date(room.from))
  )

  return (
    <Link to={`/room/${room?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={room?.image}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='font-semibold text-lg'>{room?.location}</div>
          <div className='font-light text-neutral-500'><span className='text-rose-500 font-semibold'>{nights}</span> nights .</div>
        </div>
        <div className='flex flex-row items-center gap-1 mt-0'>
          <div className='font-semibold'>$ {room?.price}</div>
          <div className='font-light'>/night</div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  room: PropTypes.object,
}

export default Card
