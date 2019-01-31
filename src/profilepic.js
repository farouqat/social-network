import React from "React";

export default function ProfilePic (props){

    let imageurl ;
    if (props.url) {
        imageurl = props.url;
    } else {
        imageurl = 'https://s3.amazonaws.com/spicedling/TlorU-1JCemXV7-MmulwJzw_SqorVHcD.png';
    }
    return (
        <div  onClick={props.showUploader}>
            <img className="profile_pic" src={imageurl} />
        </div>
    );
}
