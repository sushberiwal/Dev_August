import React, { Component } from 'react'
import "./ProfileList.css"

const ProfileList = (props) => {
    let {view , userList} = props;

    return (  
        <div className="profile-list">
            <div className="view-name">{view}</div>

            {userList.map(  (user) =>{
                return <div key = {user.uid} className="user">
                    <div className="user-image">
                        <img src={user.pImage} alt=""/>
                    </div>
                    <div className="user-details">
                   <div className="user-name">{user.name}</div>
                   <div className="user-handle">{user.handle}</div>
                    </div>

                </div>
            }  )}

        </div>
    );
}
 
export default ProfileList; 