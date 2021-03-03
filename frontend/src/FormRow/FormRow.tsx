import React from 'react'
import Form from '../Form/Form'

const FormRow = ({worldFlag, api, refreshTrips, trips}: any) => {
    return (
        <div className="w-full py-16" style={{backgroundColor: "#4F9419"}}>
            <Form worldFlag={worldFlag} api={api} refreshTrips={refreshTrips} trips={trips}/>
        </div>
    )
}

export default FormRow
