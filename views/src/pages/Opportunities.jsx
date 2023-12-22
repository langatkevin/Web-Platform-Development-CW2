import MentorsTable from "../components/mentorTable.jsx";
import StudentsTable from "../components/studentsTable.jsx";
import OpportunitiesTable from "../components/opportunitiesTable.jsx";

export default function Opportunities(){
    return(

        <div className='two-column'>
            <div className='first-sect'>
                <img src='https://epe.brightspotcdn.com/dims4/default/cb9c6c7/2147483647/strip/true/crop/7062x4792+53+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F47%2Fb8%2F2023b1104c70b2761dcc7856912a%2Fgood-mentor-nurture-11222022-1332554256-01.jpg' alt='Photo Missing' className='img-side'/>
            </div>
            <div className='sec-sect'>
                <h2>Available Opportunities</h2>
                <OpportunitiesTable/>
            </div>

        </div>
    )
}