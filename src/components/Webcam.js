import React, { useCallback, useRef, useState, Component, useEffect } from "react";
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



function sendImgToAPI(pictureBase64, expectedImgId, gesture_uuid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expected_gesture: expectedImgId, gesture: pictureBase64 })
    };

    //console.log("piwo");

    var uuid_received;

    fetch('http://127.0.0.1:8000/gestures/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            uuid_received = data.gesture_uuid;
            console.log(data)
            console.log("ID : " + data.gesture_uuid)
        });

    const requestOptions_processing = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    componentDidMount();
    async function componentDidMount() {

        console.log("piwo");
        try {
            const res = await fetch('http://127.0.0.1:8000/gestures/{' + gesture_uuid + '}', requestOptions_processing);
            const json = await res.json();
            this.setState({ data: json})

            console.log("piwo2");

            console.log(gesture_uuid);

            if (!res.ok)
                throw Error(res.statusText);
        } catch (error) {
            console.log(error);
        }

        console.log("piwo3");

        //axios a nie fetch
        //timeout - 10 s, nie dostanie odpowiedzi to probuje w petli (trza napisac)
        //jak dostanie odpowiedz pozytywna to wychodzi z pętli
        //zamiast componentDidMount() użyć hooków, np useEffect() 
        //ogarnać metode wywołania tego
    }
    



}

export default WebcamImage;
