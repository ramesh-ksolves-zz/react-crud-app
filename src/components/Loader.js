import React from 'react'
import loader  from '../assets/images/loader.gif'
const Loader = () => {
    return (
        <React.Fragment>
            <div className="text-center loading">
                <img src={loader} alt="Loading..." />
            </div>
        </React.Fragment>
    )
}
export default Loader