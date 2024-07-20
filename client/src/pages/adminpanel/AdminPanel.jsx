import { Tabs } from 'antd';
import './ant.css'
import  './adminpanel.css'
import LinearProgress from '@mui/material/LinearProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
// import {AdminBookings, AdminUsers} from '../../components/adminpanel__component/AdminBookings';
import { UsersBookingsCard, AdminRooms, } from '../../components/admincards/Admincards';
import { AdminUsers } from '../../components/admincards/Admincards';



const {TabPane} = Tabs
const AdminPanel = () => {
  return (
    <div>
      <section className='adminHeader'>
        <h1 >Rock view Admin Panel</h1>
      </section>
      
      <div className={'profileCOnt'}>
        
        <Tabs defaultActiveKey="1" >
            <TabPane tab='Bookings' key='1'>
              <UsersBookingsCard />
            </TabPane>
            
            <TabPane tab='Rooms' key='2'>
              <AdminRooms />
            </TabPane>

            <TabPane tab='Users' key='4'>
              <AdminUsers />
            </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPanel;
