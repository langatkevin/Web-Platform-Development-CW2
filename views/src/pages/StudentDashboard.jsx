import { Link } from 'react-router-dom';
import React from 'react';

export default function StudentDashboard() {
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
                <div className='btn-sect'>
                    <h1>Student Dashboard</h1>

                    <Link to='/opportunities'>
                        <button className='dash-btns'>View Opportunities</button>
                    </Link>
                    <Link to='/request-opportunity'>
                        <button className='dash-btns'>Request Opportunity</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
