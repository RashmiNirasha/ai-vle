"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Link } from "react-router-dom"

type QuizAnswer = {
  [key: string]: string
}

const correctAnswers: QuizAnswer = {
  q1: "Python",
  q2: "flowchart",
  q3: "True",
  q4: "compiling",
  q5: "binary",
  q6: "False",
  q7: "Syntax Error Execution",
  q8: "lexical analysis",
  q9: "JavaScript",
  q10: "False",
}

export default function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswer>({})
  const [score, setScore] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let correctCount = 0
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key]?.toLowerCase() === correctAnswers[key].toLowerCase()) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowModal(true)
  }

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/course01" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Quiz: Introduction to Programming</h1>
        </div>

        {/* Quiz Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">1. Which of the following is a popular programming language?</h3>
            <div className="space-y-2">
              {["Python", "HTML", "CSS"].map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="q1"
                    value={option}
                    onChange={(e) => handleInputChange("q1", e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">2. A ________ is a diagram that visually represents an algorithm.</h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q2", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your answer here"
            />
          </div>

          {/* Question 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">
              3. Algorithms are step-by-step instructions to solve a problem. (True/False)
            </h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q3", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="True or False"
            />
          </div>

          {/* Question 4 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">
              4. The process of converting source code into machine code is called ________.
            </h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q4", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your answer here"
            />
          </div>

          {/* Question 5 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">5. Computers understand code written in ________ form.</h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q5", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your answer here"
            />
          </div>

          {/* Question 6 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">6. Java is a low-level programming language. (True/False)</h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q6", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="True or False"
            />
          </div>

          {/* Question 7 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">
              7. Which of the following is NOT a step in the process of compiling code?
            </h3>
            <div className="space-y-2">
              {["Lexical Analysis", "Code Optimization", "Syntax Error Execution", "Code Generation"].map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="q7"
                    value={option}
                    onChange={(e) => handleInputChange("q7", e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 8 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">
              8. The first step in the compilation process, where code is broken into tokens, is called ________.
            </h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q8", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your answer here"
            />
          </div>

          {/* Question 9 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">9. ________ is a language commonly used for front-end web development.</h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q9", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Your answer here"
            />
          </div>

          {/* Question 10 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">
              10. Compiling ensures that the code is error-free and optimized. (True/False)
            </h3>
            <input
              type="text"
              onChange={(e) => handleInputChange("q10", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="True or False"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Score Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Quiz Result</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{score} / 10</p>
                <p className="text-lg text-gray-700">Correct Answers</p>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 text-center">
                  {score !== null && score >= 7
                    ? "Great job! You've mastered the basics of programming."
                    : "Keep practicing! You're on your way to understanding programming concepts."}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

