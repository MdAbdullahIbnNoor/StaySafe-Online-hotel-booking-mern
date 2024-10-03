import { FaUserCog } from 'react-icons/fa'
import MenuItem from './../Menu/MenuIteam'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu