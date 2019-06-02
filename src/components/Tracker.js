import React from 'react'
import ReportDiseaseCmp from './ReportDiseaseCmp.js'
import FindDiseaseCmp from './FindDiseaseCmp.js'

import '../css/base.css'
import '../css/tracker.css'

const Tracker = (props) => {

    const { trackerContract, account, onCoorAdded } = props;

    return (
        <div className="tracker">
            <h3>Tracker</h3>
            <div className="paper__container">
                <div className="paper">
                    <ReportDiseaseCmp trackerContract={trackerContract} account={account} />
                </div>
                <div className="paper">
                    <FindDiseaseCmp trackerContract={trackerContract} account={account} onCoorAdded={onCoorAdded} />
                </div>
            </div>
        </div>
    )
}

export default Tracker;