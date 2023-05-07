import React, { useCallback, useRef, useState } from "react";
//import catImage from "/public/signs/cat_1.jpg" //process.env.PUBLIC_URL + "/cat_1.jpg"

const loadPhoto = function(photoSource) {
    return (
        <div className="signPhoto">
            <React.Fragment>
                <p> Czy chodziło ci o ten znak? </p>
                <img src={process.env.PUBLIC_URL + "/signs" + "/cat_2.jpg"} alt="cat image" />
                {/* <img src= {photoSource} alt="cat image" /> */}
            </React.Fragment>
        </div>
    );
}

export default loadPhoto;