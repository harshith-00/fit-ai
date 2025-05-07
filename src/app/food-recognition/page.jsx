"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [mode, setMode] = useState(null);
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Camera error:", err);
      setError(
        "Could not access camera. Please make sure you have granted camera permissions."
      );
      setMode(null);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(
      async (blob) => {
        try {
          const { url, error: uploadError } = await upload({ file: blob });
          if (uploadError) {
            setError(uploadError);
            return;
          }
          setImage(url);
          analyzeImage(url);
          stopCamera();
        } catch (err) {
          console.error("Capture error:", err);
          setError("Failed to capture image");
        }
      },
      "image/jpeg",
      0.8
    );
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    setAnalysis(null);

    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) {
        setError(uploadError);
        return;
      }
      setImage(url);
      analyzeImage(url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image");
    }
  };

  const analyzeImage = async (imageUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result;

        try {
          const visionResponse = await fetch("/integrations/gpt-vision/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Analyze this food image. Tell me what food items you see and provide an estimate of their calories and nutritional value. Keep the response concise.",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: base64data,
                      },
                    },
                  ],
                },
              ],
            }),
          });

          if (!visionResponse.ok) {
            throw new Error("Failed to analyze image");
          }

          const data = await visionResponse.json();
          setAnalysis(data.choices[0].message.content);
        } catch (err) {
          console.error("Vision API error:", err);
          setError("Failed to analyze image");
        }
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Image processing error:", err);
      setError("Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setMode(null);
    setImage(null);
    setAnalysis(null);
    setError(null);
    stopCamera();
  };

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    }
  }, [mode]);

  return (
    <div
      className="min-h-screen text-white p-4 relative"
      style={{
        backgroundImage:
          "url('https://ucarecdn.com/cbe86451-2403-40d1-a962-58cbbd63fd18/-/format/auto/')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-2xl font-bold">Food Recognition</h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {!mode && !image && (
            <div className="space-y-4">
              <h2 className="text-xl text-center mb-8">
                Choose an option to identify food:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode("camera")}
                  className="bg-blue-600 p-6 rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center gap-4"
                >
                  <i className="fas fa-camera text-4xl"></i>
                  <span className="text-lg">Use Camera</span>
                </button>
                <label className="bg-green-600 p-6 rounded-xl hover:bg-green-700 transition-colors flex flex-col items-center gap-4 cursor-pointer">
                  <i className="fas fa-image text-4xl"></i>
                  <span className="text-lg">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {mode === "camera" && !image && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-[4/3]">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <button
                    onClick={captureImage}
                    className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-camera text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {image && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Food"
                  className="w-full h-64 object-cover"
                />
                {loading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-spinner fa-spin text-3xl mb-2"></i>
                      <p>Analyzing image...</p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-900 text-white p-4 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {analysis && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Analysis Results:</h3>
                  <p className="text-gray-300">{analysis}</p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleTryAgain}
                  className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;