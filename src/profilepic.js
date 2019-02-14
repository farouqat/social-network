import React from "React";

export default function ProfilePic (props){

    return (
        <div  onClick={props.showUploader}>
            <img className="profile_pic" src={props.url} />
        </div>
    );
}
