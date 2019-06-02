import React from 'react'

import AddOrganizationCmp from './AddOrganizationCmp.js'
import AddDiseaseCmp from './AddDiseaseCmp.js'

import '../css/base.css'
import '../css/registration.css'

const Registration = (props) => {

    const { trackerContract, account } = props;

    return (
        <div className="registration">
            <h3>Registration</h3>
            <div className="paper__container">
                <div className="paper">
                    <AddDiseaseCmp trackerContract={trackerContract} account={account} />
                </div>
                <div className="paper">
                    <AddOrganizationCmp className="paper" trackerContract={trackerContract} account={account} />
                </div>
            </div>
        </div>
    )
}

export default Registration;