"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CheckCircle, Edit, ExternalLink, FileText, X, Upload, AlertCircle } from "lucide-react"

interface SubmittedAssignment {
  id: number
  title: string
  course: string
  submittedDate: string
  status: string
  grade: string | null
  submissionLink?: string
  notes?: string
}

const initialAssignments: SubmittedAssignment[] = [
  {
    id: 1,
    title: "Assignment 1 Submitted",
    course: "IS4108 Natural Language Processing",
    submittedDate: "2024-02-05",
    status: "Graded",
    grade: "A",
    submissionLink: "https://example.com/assignment1",
  },
  {
    id: 2,
    title: "Assignment 2 Submitted",
    course: "IS4109 Cognitive Robotics",
    submittedDate: "2024-02-10",
    status: "Pending",
    grade: null,
    submissionLink: "https://example.com/assignment2",
  },
]

const SubmittedPage: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<SubmittedAssignment | null>(null)

  const [editedLink, setEditedLink] = useState("")
  const [editedNotes, setEditedNotes] = useState("")
  const [editedFile, setEditedFile] = useState<File | null>(null)
  const [linkError, setLinkError] = useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const showModal = (assignment: SubmittedAssignment) => {
    setSelectedAssignment(assignment)
    setEditedLink(assignment.submissionLink || "")
    setEditedNotes(assignment.notes || "")
    setEditedFile(null)
    setLinkError("")
    setModalVisible(true)
  }

  const handleSaveChanges = () => {
    if (!selectedAssignment) return

    // Simple validation
    if (!editedLink) {
      setLinkError("Please provide a submission link")
      return
    }

    const updatedAssignments = assignments.map((a) =>
      a.id === selectedAssignment.id
        ? {
            ...a,
            submissionLink: editedLink,
            notes: editedNotes,
          }
        : a,
    )
    setAssignments(updatedAssignments)
    setModalVisible(false)

    // Show success message
    const successMessage = document.getElementById("success-message")
    if (successMessage) {
      successMessage.classList.remove("opacity-0")
      successMessage.classList.add("opacity-100")
      setTimeout(() => {
        successMessage.classList.remove("opacity-100")
        successMessage.classList.add("opacity-0")
      }, 3000)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setEditedFile(event.target.files[0])
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setEditedFile(event.dataTransfer.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const closeModal = () => {
    setModalVisible(false)
    setLinkError("")
  }

  // Handle keyboard navigation for modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans">
      {/* Success message toast */}
      <div
        id="success-message"
        role="alert"
        aria-live="polite"
        className="fixed top-6 right-6 bg-emerald-600 text-white p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-0 flex items-center"
      >
        <CheckCircle className="h-5 w-5 mr-2" />
        <span className="font-medium">Submission updated successfully!</span>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-blue-400">
          <Link
            to="/tasks"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
            aria-label="Back to assignments"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Assignments</span>
          </Link>
        </div>

        {/* Main content */}
        <main className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500" aria-labelledby="page-title">
          <h1 id="page-title" className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            Submitted Assignments
          </h1>

          {assignments.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
              <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No assignments submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-6" role="list" aria-label="Submitted assignments">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-300"
                  role="listitem"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      {/* Status badge */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            assignment.status === "Graded"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                          aria-label={`Status: ${assignment.status}`}
                        >
                          {assignment.status === "Graded" ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                          )}
                          {assignment.status}
                        </span>

                        {assignment.grade && (
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                            aria-label={`Grade: ${assignment.grade}`}
                          >
                            Grade: {assignment.grade}
                          </span>
                        )}
                      </div>

                      {/* Assignment details */}
                      <h2 className="text-xl font-semibold text-slate-800">{assignment.title}</h2>
                      <p className="text-slate-600 font-medium">{assignment.course}</p>
                      <p className="text-slate-500 text-sm">
                        Submitted:{" "}
                        <time dateTime={assignment.submittedDate}>
                          {new Date(assignment.submittedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </p>

                      {/* Submission link */}
                      {assignment.submissionLink && (
                        <a
                          href={assignment.submissionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-sm mt-1 text-sm font-medium"
                          aria-label={`View submission for ${assignment.title}`}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Submission
                        </a>
                      )}

                      {/* Notes */}
                      {assignment.notes && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                          <h3 className="text-sm font-semibold text-slate-700 mb-1">Notes:</h3>
                          <p className="text-sm text-slate-600">{assignment.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="flex items-start">
                      <button
                        onClick={() => showModal(assignment)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                        aria-label={`Edit submission for ${assignment.title}`}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Submission
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
        >
          {/* Modal content */}
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 id="modal-title" className="text-xl font-bold text-slate-800">
                Edit Submission
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 space-y-4">
              {/* Submission link */}
              <div className="space-y-2">
                <label htmlFor="submission-link" className="block text-sm font-medium text-slate-700">
                  Submission Link <span className="text-red-500">*</span>
                </label>
                <input
                  id="submission-link"
                  type="url"
                  value={editedLink}
                  onChange={(e) => {
                    setEditedLink(e.target.value)
                    if (e.target.value) setLinkError("")
                  }}
                  placeholder="https://example.com/assignment"
                  className={`w-full px-3 py-2 border ${linkError ? "border-red-500" : "border-slate-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  aria-required="true"
                  aria-invalid={!!linkError}
                  aria-describedby={linkError ? "link-error" : undefined}
                />
                {linkError && (
                  <p id="link-error" className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {linkError}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  placeholder="Add any additional information about your submission..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* File upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Replace File (optional)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:bg-slate-50 ${
                    editedFile ? "border-emerald-400 bg-emerald-50/50" : "border-slate-300"
                  }`}
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
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editedFile ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-10 w-10 text-emerald-500 mb-2" />
                      <p className="text-sm font-medium text-emerald-700">{editedFile.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{(editedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click or drag file to upload</p>
                      <p className="text-xs text-slate-500 mt-1">Accepted: PDF, DOCX – max 2GB</p>
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
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                disabled={!editedLink}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmittedPage
