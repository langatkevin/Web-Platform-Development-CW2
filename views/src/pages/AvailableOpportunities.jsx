import AvailableOpportunitiesTable from "../components/availableOpportunities.jsx";
import RequestedOpportunitiesTable from "../components/requestedOpportunities.jsx";
import JoinedOpportunitiesTable from "../components/joinedEvents.jsx";


export default function AvailableOpportunities(){
    return(
        <div className='ops'>
            <h1>Opportunities</h1>

            <h3>Available Opportunities</h3>
            <div className='req'>
                <AvailableOpportunitiesTable/>
            </div>

            <h3>Opportunity Requests</h3>
            <div className='req'>
                <RequestedOpportunitiesTable/>
            </div>

            <div className='req'>
                <h3>Joined Opportunities </h3>
                <JoinedOpportunitiesTable/>
            </div>



        </div>
    )
}