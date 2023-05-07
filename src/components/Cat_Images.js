import React, { useCallback, useRef, useState } from "react";
//import catImage from "/public/signs/cat_1.jpg" //process.env.PUBLIC_URL + "/cat_1.jpg"


const LoadPhoto = () => {

    //do wybierania losowo zdjecia
    const [randomImage, setRandomImage] = React.useState('');

    const renderImage = () => {
        const Images = [
            {image: process.env.PUBLIC_URL + "/signs" + "/cat_1.jpg"},
            {image: process.env.PUBLIC_URL + "/signs" + "/cat_2.jpg"},
            {image: process.env.PUBLIC_URL + "/signs" + "/cat_3.jpg"},
        ];

        const randomImageIndex = Math.floor(Math.random() * Math.floor(3));
        return Images[randomImageIndex].image;
    };

    React.useEffect(() => {
        setRandomImage(renderImage);
    });
    //-----------------------

    return (
        <div className="signPhoto">
            <React.Fragment>
                <p> Czy chodziło ci o ten znak? </p>
                
                <img src={renderImage()} alt="cat image" />  {/* do wybierania losowo zdjecia, src ma byc tym zdjeciem jaki chcemy*/}

                {/* <img src={process.env.PUBLIC_URL + "/signs" + "/cat_2.jpg"} alt="cat image" /> */}
                {/* <img src= {photoSource} alt="cat image" /> */}

            </React.Fragment>
        </div>
    );
}

export default LoadPhoto;