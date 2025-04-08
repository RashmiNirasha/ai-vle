"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ArrowLeft, Upload, X, FileText, CheckCircle, AlertTriangle, Info, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function SubmitAssignmentPage() {
  const [notifications, setNotifications] = useState(2)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleSubmit = () => {
    if (!file) return
    setIsSubmitting(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    setTimeout(() => {
      clearInterval(interval)
      setIsSubmitting(false)
      setUploadProgress(100)
      setShowSuccess(true)
      setNotifications((prev) => prev + 1)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-400">
          <Link
            to="/tasks"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-900 text-sm font-medium transition-colors focus:outline-none focus:underline"
            aria-label="Back to assignments"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Assignments
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-500">
          <div className="p-6 pb-2 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-800" id="page-title">
                Submit Your Assignment
              </h1>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle help information"
                aria-expanded={showHelp}
                aria-controls="help-section"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Help section - visible when help button is clicked */}
            {showHelp && (
              <div
                id="help-section"
                className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-slate-700 animate-in fade-in duration-200"
              >
                <h2 className="font-semibold mb-2 text-indigo-800">How to submit your assignment:</h2>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Upload your file by dragging and dropping or clicking "Choose File"</li>
                  <li>Check that you've selected the correct file</li>
                  <li>Click the "Submit Assignment" button</li>
                  <li>Wait for the confirmation message</li>
                </ol>
                <p className="mt-2 text-indigo-700">Need more help? Contact your instructor.</p>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Current step indicator */}
            <div className="flex justify-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-16 h-1 bg-indigo-200">
                  {file && (
                    <div
                      className="h-full bg-indigo-600 transition-all duration-500"
                      style={{ width: file ? "100%" : "0%" }}
                    ></div>
                  )}
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${file ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
                >
                  2
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out
                ${
                  file
                    ? "border-emerald-400 bg-emerald-50/50"
                    : "border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50/50"
                }
                ${isSubmitting ? "opacity-75" : ""}
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              tabIndex={0}
              role="button"
              aria-label="Upload file by clicking or dragging and dropping"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-lg font-medium text-emerald-700">{file.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>

                  {isSubmitting && (
                    <div className="w-full max-w-xs mt-4">
                      {/* Custom Progress Bar */}
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                          role="progressbar"
                          aria-valuenow={uploadProgress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Uploading: {uploadProgress}%</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-10 w-10 text-indigo-600" />
                  </div>
                  <p className="text-lg font-medium text-slate-700 mb-2">Drag & Drop your file here</p>
                  <p className="text-sm text-slate-500 mb-4">or upload from your device</p>
                  {/* Custom Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Choose File
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx"
                aria-label="Upload file"
              />
            </div>

            {/* Guidelines */}
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-lg font-semibold text-amber-800">Submission Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Guideline Card 1 */}
                    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center border border-amber-100 hover:shadow-md transition-all">
                      <Info className="h-5 w-5 text-indigo-600 mb-2" />
                      <p className="text-sm text-slate-600 font-medium">Max File Size</p>
                      <p className="text-xl font-bold text-slate-800">2 GB</p>
                    </div>
                    {/* Guideline Card 2 */}
                    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center border border-amber-100 hover:shadow-md transition-all">
                      <Info className="h-5 w-5 text-indigo-600 mb-2" />
                      <p className="text-sm text-slate-600 font-medium">Max Files</p>
                      <p className="text-xl font-bold text-slate-800">1</p>
                    </div>
                    {/* Guideline Card 3 */}
                    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center border border-amber-100 hover:shadow-md transition-all">
                      <Info className="h-5 w-5 text-indigo-600 mb-2" />
                      <p className="text-sm text-slate-600 font-medium">File Types</p>
                      <p className="text-xl font-bold text-slate-800">PDF, DOCX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Submit Button */}
              <button
                className={`flex-1 py-6 rounded-md font-medium text-white flex items-center justify-center transition-colors ${
                  file && !isSubmitting
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-slate-300 hover:bg-slate-300 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${file ? "focus:ring-emerald-500" : "focus:ring-slate-400"}`}
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                aria-label="Submit assignment"
                aria-disabled={!file || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    <span>Submit Assignment</span>
                  </div>
                )}
              </button>
              {/* Clear Button */}
              <button
                className="flex-1 py-6 rounded-md font-medium text-white bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => setFile(null)}
                disabled={!file || isSubmitting}
                aria-label="Clear selected file"
                aria-disabled={!file || isSubmitting}
              >
                <X className="h-5 w-5 mr-2" /> Clear
              </button>
            </div>
          </div>
        </div>

        {/* Additional help card */}
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-amber-500">
          <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
            <HelpCircle className="h-5 w-5 text-amber-500 mr-2" />
            Need Help?
          </h2>
          <p className="text-slate-600 mb-3">If you're having trouble submitting your assignment, you can:</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Check that your file is in the correct format (PDF or DOCX)</li>
            <li>Make sure your file is under 2GB</li>
            <li>Try a different browser if you're experiencing issues</li>
            <li>Contact your instructor for an extension if needed</li>
          </ul>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div
          className="fixed bottom-6 right-6 animate-in fade-in slide-in-from-bottom-5 duration-300"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-emerald-600 text-white rounded-lg shadow-lg border-none">
            <div className="p-4 flex items-center">
              <div className="bg-white/20 rounded-full p-1 mr-3">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Submission successful!</p>
                <p className="text-xs text-emerald-100">Your assignment has been submitted</p>
              </div>
              <button
                className="ml-4 p-1 rounded-full text-white hover:bg-white/20 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={() => setShowSuccess(false)}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
