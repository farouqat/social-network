import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";


export default function Profile (props) {
    return (
        <div className="profile_comp">
            <ProfilePic showUploader={props.showUploader} url={props.url}/>
            <div  ClassName="profile_info">
                <h2>{props.first} {props.last}</h2>
                <BioEditor className="bio_comp" onClick={props.showBioEditor}
                    showBioEditor={props.showBioEditor} setBio={props.setBio} bio={props.bio}/>
            </div>
        </div>
    );
}
