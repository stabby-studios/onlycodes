import React from 'react'
import './header.css'

export default class Header extends React.Component {

    constructor(props) {
        super()
    }

    render() {
        return (
            <React.Fragment>
                <div className="header-hero">
                    <span>Onlycodes</span>
                </div>
            </React.Fragment>
        );
        
    }

}