import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from './DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoutes from './AdminRoutes'
import HostRoutes from './HostRoutes'
import ManageBookings from '../pages/Dashboard/Host/ManageBookings'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      // Guest Routes
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings/>
          </PrivateRoute>
        )
      },
      {
        path: 'add-room',
        element: (
          <PrivateRoute>
            <HostRoutes>
              <AddRoom />
            </HostRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-listings',
        element: (
          <PrivateRoute>
            <HostRoutes>
              <MyListings />
            </HostRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-bookings',
        element: (
          <PrivateRoute>
            <HostRoutes>
              <ManageBookings/>
            </HostRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <ManageUsers />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
])
