import React, { Component } from 'react'
import Preview from './preview';
import "./education.css";

class Education extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="education">
                <div className="education-form-details">
                    Education page
                </div>
                <div className="preview-form">
                    <Preview contact={{}}></Preview>
                </div>
            </div>
         );
    }
}
 
export default Education;