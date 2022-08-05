import MyClassCalendar from '../../components/myclasshistory/MyClassCalendar';
import ReserveClass from '../../components/myclasshistory/ReserveClass';
import CloseClass from '../../components/myclasshistory/CloseClass';

import './MyClassHistory.css';

function MyClassHistory() {
  return (
    <div>
      <div className='myClassHistory'>
        <MyClassCalendar />
      </div>
      <div>
        <ReserveClass />
      </div>
      <div>
        <CloseClass />
      </div>
    </div>
  );
}

export default MyClassHistory;
