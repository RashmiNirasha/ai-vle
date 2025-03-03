import type React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, X, FileText, CheckCircle } from "lucide-react";

const SubmitPage: React.FC = () => {
  const [notifications, setNotifications] = useState(2);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (!file) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setNotifications((prev) => prev + 1);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4" style={{ fontFamily: 'Arial', fontSize: '10px' }}>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-3">
            <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Assignment</h1>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${file ? "border-green-400 bg-green-50" : "border-blue-300 hover:border-blue-400 hover:bg-blue-50"}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-12 w-12 text-green-500 mb-3" />
                  <p className="text-md font-medium text-green-600">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">File selected</p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-blue-500 mb-3" />
                  <p className="text-lg text-gray-600 mb-2">Drag & Drop your file here</p>
                  <p className="text-sm text-gray-500 mb-3">or</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                </>
              )}
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold mb-3 text-yellow-700">Submission Guidelines</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-3 rounded-lg shadow">
                  <p className="text-blue-600 font-medium mb-1">Max File Size</p>
                  <p className="text-xl font-bold text-gray-700">2 GB</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow">
                  <p className="text-blue-600 font-medium mb-1">Max Files</p>
                  <p className="text-xl font-bold text-gray-700">1</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow">
                  <p className="text-blue-600 font-medium mb-1">File Types</p>
                  <p className="text-xl font-bold text-gray-700">PDF, DOCX</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
  <button
    className={`flex-1 py-3 rounded-md text-white text-sm font-medium flex items-center justify-center gap-1 ${file ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
    onClick={handleSubmit}
    disabled={!file || isSubmitting}
  >
    {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Upload className="h-5 w-5" /> Submit Assignment</>}
  </button>
  <button className="flex-1 py-3 rounded-md text-white text-sm font-medium flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600" onClick={() => setFile(null)}>
    <X className="h-5 w-5" /> Clear
  </button>
</div>


          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Submission successful!</span>
        </div>
      )}
    </>
  );
};

export default SubmitPage;
