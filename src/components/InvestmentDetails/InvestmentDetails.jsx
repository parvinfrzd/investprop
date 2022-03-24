import './InvestmentDetails.css'

export default function InvestmentDetails(props) {
    let localTime = new Date(props.investment.updatedAt).toLocaleString(); 
    return (
        <div className="InvestmentDetails">
            <div>
                <div>Investment Id: <span className="smaller">{props.investment._id}</span></div>
                <div className="smaller">{localTime}</div>
            </div>
            <div className="align-rt">
                <div>Property name: <span className="smaller">{props.investment.name}</span></div>
                <div>Description: <span className="smaller">{props.investment.description}</span></div>
                <div>Value: <span className="smaller">{props.investment.value}</span></div>
            </div>
        </div>
    )

}