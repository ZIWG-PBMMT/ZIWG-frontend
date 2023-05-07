import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import loadPhoto from "./Cat_Images";

function WebcamImage() {
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
        // loadPhoto;
    }, [webcamRef]);

    const submit = () => {

        sendImgToAPI(img);
        setImg(null);
    }


    return (
        <div className="Container">
            {img === null ? (
                <>

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
                    
                </>
            ) : (
                <>
                <div className='collumn'>
                    <div className='row'>
                        <img src={img} alt="screenshot" />
                    </div>
                    {/* <div className="row">
                        <script type="text/javascript" src="Cat_Images.js"> 
                            import {loadPhoto} from "./Cat_Images.js";
                            loadPhoto(process.env.PUBLIC_URL + "/signs" + "/cat_3.jpg");
                        </script>
                    </div> */}
                    <button onClick={submit}>Send to API and Retake</button>
                </div>
                </>
            )}
        </div>
    );
}


function sendImgToAPI(pictureBase64) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expected_gesture: 'XD', gesture: pictureBase64 })
    };
    fetch('http://127.0.0.1:8000/gestures/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.is_gesture_correct === "True")
        });

}

export default WebcamImage;