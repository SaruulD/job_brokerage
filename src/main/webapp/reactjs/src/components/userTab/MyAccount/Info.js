import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Info extends Component {
    render() {
        return (
            <div style={{display: 'flex', paddingLeft: 50}}>
                <div style={{width: '70%'}} >
                    <h6>{this.props.title}:</h6>
                    <p style={{paddingLeft: 50}} >{this.props.detail}</p>
                </div>
                {this.props.url ? 
                <Link to={this.props.url} className="nav-link">{
                    <Button variant="outline-secondary">{this.props.title} солих</Button>
                }</Link>
                :
                <p></p>
                }
                
            </div>
        )
    }
}

export default Info
