import { useState } from 'react';
import Card from './Card';
import Container from '../Shared/Container';
import Heading from '../Shared/Heading';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useSearchParams } from 'react-router-dom';

const Rooms = () => {
  const axiosCommon = useAxiosCommon();
  const [params, setParams] = useSearchParams();
  const category = params.get('category');

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;  // Fixed limit of 10 rooms per page

  const { data: roomsData = {}, isLoading } = useQuery({
    queryKey: ['rooms', category, page],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/rooms?category=${category}&page=${page}&limit=${limit}`);
      return data;
    },
    keepPreviousData: true,  // Helps to keep the previous data while fetching new data
  });

  if (isLoading) return <LoadingSpinner />;

  const { rooms = [], totalPages } = roomsData;

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <>
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {rooms.map(room => (
              <Card key={room._id} room={room} />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className='flex justify-center my-6 mt-32'>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className='px-5 py-2 mr-4 bg-rose-600 text-neutral-200 rounded-s-full'
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className='px-8 py-2 mx-4 bg-rose-600 text-neutral-200 rounded-e-full'
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Rooms Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
