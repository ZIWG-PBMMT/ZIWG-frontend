import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import LoadPhoto from "./Cat_Images";

function WebcamImage() {
    const [img, setImg] = useState(null);
    const [expectedImg, setExpectedImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    const submit = () => {

        sendImgToAPI(img, expectedImg);
        setImg(null);
        setExpectedImg(null);
        //LoadPhoto.buttonPressedInWebcam = true; //do tego przypisania obrazka 
    }

    const expectedImgHandler = (expectedImg) => {
        setExpectedImg(expectedImg);
    };

    return (
        
        <div className="Container">
            {img === null ? (
                <>
                <div className='row'>
                    <div className='column'>
                        <Webcam
                            audio={false}
                            mirrored={true}
                            height={640}
                            width={640}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                        <button onClick={capture}>Capture photo</button>
                    </div>
                    <div className='collumn'>
                        <LoadPhoto expectedImgHandler={expectedImgHandler} />
                        <p1>Image ID: {expectedImg}</p1>
                    </div>
                        
                </div>
                    
                </>
            ) : (
                <>
                <div className='row'>
                    <div className='column'>
                        <img src={img} alt="screenshot" />
                        <button onClick={submit}>Send to API and Retake</button>
                    </div>

                    <div className='collumn'>
                        <LoadPhoto expectedImgHandler={expectedImgHandler} />
                        <p1>Image ID: {expectedImg}</p1>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}


function sendImgToAPI(pictureBase64, expectedImgId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expected_gesture: expectedImgId, gesture: pictureBase64 })
    };
    fetch('http://127.0.0.1:8000/gestures/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.is_gesture_correct === "True")
        });

}

export default WebcamImage;
