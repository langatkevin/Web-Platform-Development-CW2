import { Link } from 'react-router-dom';
import MentorsTable from '../components/mentorTable.jsx';

export default function AdminDashboard() {
    return (
        <div className='two-column'>
            <div className='first-sect'>
                <img
                    src='https://epe.brightspotcdn.com/dims4/default/cb9c6c7/2147483647/strip/true/crop/7062x4792+53+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F47%2Fb8%2F2023b1104c70b2761dcc7856912a%2Fgood-mentor-nurture-11222022-1332554256-01.jpg'
                    alt='Photo Missing'
                    className='img-side'
                />
            </div>
            <div className='sec-sect'>
                <h1>Admin Dashboard</h1>
                <div className='btn-sect'>
                    <Link to='/students'>
                        <button className='dash-btns'>View Student Records</button>
                    </Link>
                    <Link to='/mentors'>
                        <button className='dash-btns'>View Mentors</button>
                    </Link>
                    <Link to='/adminops'>
                        <button className='dash-btns'>View Mentoring/Coaching Opportunities</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
