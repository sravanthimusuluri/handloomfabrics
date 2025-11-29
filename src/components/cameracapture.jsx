import React, { useState, useRef, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./CameraCapture.css";

function CameraCapture({ onClassify }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      modelRef.current = await mobilenet.load();
      setLoading(false);
      console.log("MobileNet model loaded");
    };
    loadModel();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied or not supported.");
    }
  };

  const capturePhoto = () => {
    if (!modelRef.current) {
      alert("Model is still loading...");
      return;
    }

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setImage(dataUrl);
    classifyImage(dataUrl);
  };

  const classifyImage = (dataUrl) => {
    setLoading(true);
    const img = new Image();
    img.src = dataUrl;
    img.onload = async () => {
      try {
        const predictions = await modelRef.current.classify(img);
        console.log("Predictions:", predictions);
        if (onClassify) onClassify(predictions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="camera-container">
      <h2>Capture Your Photo</h2>
      <video ref={videoRef} width="400" height="300" autoPlay />
      <canvas ref={canvasRef} width="400" height="300" style={{ display: "none" }} />
      <div className="camera-buttons">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={capturePhoto}>Capture & Detect</button>
      </div>
      {loading && <p>Model loading / detecting...</p>}
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" width="400" />
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
