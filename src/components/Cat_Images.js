import React, { useCallback, useRef, useState } from "react";
//import catImage from "/public/signs/cat_1.jpg" //process.env.PUBLIC_URL + "/cat_1.jpg"


const LoadPhoto = ({ expectedImgHandler }) => {

    //do wybierania losowo zdjecia
    const [randomImage, setRandomImage] = React.useState('');

    const renderImage = () => {
        const Images = [
            {id: 1, image: process.env.PUBLIC_URL + "/signs" + "/cat_1.jpg"},
            {id: 2, image: process.env.PUBLIC_URL + "/signs" + "/cat_2.jpg"},
            {id: 3, image: process.env.PUBLIC_URL + "/signs" + "/cat_3.jpg"},
            {id: 4, image: process.env.PUBLIC_URL + "/signs" + "/cat_4.jpg"},
            {id: 5, image: process.env.PUBLIC_URL + "/signs" + "/cat_5.jpg"},
            {id: 6, image: process.env.PUBLIC_URL + "/signs" + "/cat_6.jpg"},
        ];

        const randomImageIndex = Math.floor(Math.random() * Images.length);
        const randomImage = Images[randomImageIndex];

        expectedImgHandler(randomImage.id);
        return randomImage.image;
    };

    const image = renderImage();

    React.useEffect(() => {
        setRandomImage(image);
    }, []);
    //-----------------------

    /* tutaj chcialem jakies przypisanie zeby obraz losowalo raz podczas podgladu na zywo z kamery i potem zostal po zrobieniu zdjecia do momentu kiedy kliknie sie "wyslij do API"
    i potem losuje nowy znak
    kazdy znak by mial ID ktore bylo by po prostu przekazywane zeby model wiedzial jaki znak byl wybrany i jaki pokazany
    (wysylane razem ze zdjeciem z kamery)

    ale nie ogarniam jezykow wysokopoziomowych na tyle xDDD
    wiec trzeba zrobic to + kolejkowanie i imo bym zostawil ten modul losowania obrazka na poczatku zeby jakies random zdjecie bylo i trzeba bylo je pokazac
    jeszcze w Webcam.js tam jest linijka w submit() do tego */
    
    //const buttonPressedInWebcam = false;
    // const setPhoto = renderImage.generatedImage;
    // if(buttonPressedInWebcam == true) {
    //     setPhoto = renderImage();
    //     buttonPressedInWebcam = false
    // }

    return (
        <div className="signPhoto">
            <React.Fragment>
                
                <p> Pokaż ten znak </p>
                <img src={renderImage()} alt="cat image" />  {/* do wybierania losowo zdjecia, src ma byc tym zdjeciem jaki chcemy*/}
                <p> Khajiit has wares, if you have coin </p>

                {/* <img src={process.env.PUBLIC_URL + "/signs" + "/cat_2.jpg"} alt="cat image" /> */}
                {/* <img src= {photoSource} alt="cat image" /> */}

            </React.Fragment>
        </div>
    );
}

export default LoadPhoto;
