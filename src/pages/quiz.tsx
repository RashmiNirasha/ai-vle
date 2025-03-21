import type React from "react"
import { useState } from "react"
import { ArrowLeft, Check, X, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

type QuizAnswer = {
  [key: string]: string
}

const correctAnswers: QuizAnswer = {
  q1: "falsifiability",
  q2: "pseudo-science",
  q3: "Einstein's theory of relativity",
  q4: "empirical",
  q5: "risky",
  q6: "confirmation",
  q7: "Ad Hoc",
  q8: "Einstein",
  q9: "False",
  q10: "False",
}

export default function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswer>({})
  const [score, setScore] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)

  const questions = [
    {
      id: "q1",
      type: "mcq",
      question: "What is Popper's key criterion for scientific theories?",
      options: ["verifiability", "falsifiability", "reliability"],
    },
    {
      id: "q2",
      type: "mcq",
      question: "Astrology is considered by Popper as:",
      options: ["science", "pseudo-science", "non-empirical"],
    },
    {
      id: "q3",
      type: "mcq",
      question: "Which example demonstrates a scientific approach, according to Popper?",
      options: ["Freud's psychoanalysis", "Adler's psychology", "Einstein's theory of relativity"],
    },
    {
      id: "q4",
      type: "fill",
      question: "Scientific methods must rely on _____ evidence.",
      hint: "Observational or experimental data",
    },
    {
      id: "q5",
      type: "fill",
      question: "A good scientific theory makes _____ predictions.",
      hint: "Type of predictions that could be proven wrong",
    },
    {
      id: "q6",
      type: "fill",
      question: "Easy _____ alone doesn't make a theory scientific.",
      hint: "Finding evidence that supports a theory",
    },
    {
      id: "q7",
      type: "fill",
      question: "Popper warned against _____ adjustments to theories.",
      hint: "Latin term for modifications made specifically to save a theory",
    },
    {
      id: "q8",
      type: "fill",
      question: "_____ proposed a theory that was scientifically testable by predicting the bending of light.",
      hint: "Famous physicist who developed the theory of relativity",
    },
    {
      id: "q9",
      type: "tf",
      question: "Confirmation alone is sufficient to prove a theory scientific.",
      options: ["True", "False"],
    },
    {
      id: "q10",
      type: "tf",
      question: "Theories that can explain everything are the most scientific.",
      options: ["True", "False"],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let correctCount = 0
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key]?.toLowerCase() === correctAnswers[key].toLowerCase()) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
  }

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index)
    }
  }

  const isAnswered = (questionId: string) => {
    return answers[questionId] !== undefined && answers[questionId] !== ""
  }

  const isCorrect = (questionId: string) => {
    return answers[questionId]?.toLowerCase() === correctAnswers[questionId].toLowerCase()
  }

  const progressPercentage = (Object.keys(answers).length / questions.length) * 100

  const renderQuestion = (q: any, index: number) => {
    const isActive = reviewMode || currentQuestion === index
    const questionAnswered = isAnswered(q.id)

    if (!isActive) return null

    const cardStyle = {
      marginBottom: "1.5rem",
      borderRadius: "0.5rem",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e5e7eb",
      borderLeftWidth: "4px",
      borderLeftColor:
        reviewMode && isCorrect(q.id) ? "#22c55e" : reviewMode && questionAnswered ? "#ef4444" : "#3b82f6",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      backgroundColor: "#ffffff",
    }

    const cardHeaderStyle = {
      padding: "1rem 1.5rem",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "0.5rem",
    }

    const cardTitleStyle = {
      fontSize: "1.125rem",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }

    const cardContentStyle = {
      padding: "1.5rem",
    }

    const questionStyle = {
      fontWeight: 500,
      fontSize: "1.125rem",
      marginBottom: "1rem",
    }

    const radioGroupStyle = {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
    }

    const radioItemStyle = (selected: boolean, isCorrectAnswer: boolean) => ({
      display: "flex",
      alignItems: "center",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: selected ? "#3b82f6" : "#e5e7eb",
      backgroundColor: selected
        ? "rgba(59, 130, 246, 0.1)"
        : reviewMode && isCorrectAnswer
          ? "rgba(34, 197, 94, 0.1)"
          : "transparent",
      marginBottom: "0.5rem",
      cursor: reviewMode ? "default" : "pointer",
      transition: "all 0.2s",
    })

    const radioLabelStyle = {
      marginLeft: "0.5rem",
      cursor: reviewMode ? "default" : "pointer",
      flexGrow: 1,
    }

    const inputStyle = (isCorrectInReview: boolean) => ({
      display: "block",
      width: "100%",
      padding: "0.5rem 0.75rem",
      borderRadius: "0.375rem",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: reviewMode ? (isCorrect(q.id) ? "#22c55e" : "#ef4444") : "#e5e7eb",
      backgroundColor: reviewMode ? (isCorrect(q.id) ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)") : "#ffffff",
      fontSize: "1rem",
      lineHeight: "1.5",
      outline: "none",
    })

    const hintStyle = {
      display: "flex",
      alignItems: "center",
      fontSize: "0.875rem",
      color: "#6b7280",
      marginTop: "0.5rem",
    }

    const correctAnswerStyle = {
      fontSize: "0.875rem",
      color: "#16a34a",
      marginTop: "0.5rem",
    }

    const reviewStatusStyle = (isCorrect: boolean) => ({
      display: "flex",
      alignItems: "center",
      color: isCorrect ? "#22c55e" : "#ef4444",
    })

    return (
      <div key={q.id} style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div style={cardTitleStyle}>
            <span>
              Question {index + 1} of {questions.length}
            </span>
            {reviewMode && (
              <span style={reviewStatusStyle(isCorrect(q.id))}>
                {isCorrect(q.id) ? <Check className="h-5 w-5 mr-1" /> : <X className="h-5 w-5 mr-1" />}
                {isCorrect(q.id) ? "Correct" : "Incorrect"}
              </span>
            )}
          </div>
        </div>
        <div style={cardContentStyle}>
          <div>
            <h3 style={questionStyle}>{q.question}</h3>

            {q.type === "mcq" && (
              <div style={radioGroupStyle}>
                {q.options.map((option: string) => {
                  const isSelected = answers[q.id] === option
                  const isCorrectAnswer = option.toLowerCase() === correctAnswers[q.id].toLowerCase()

                  return (
                    <div key={option} style={radioItemStyle(isSelected, isCorrectAnswer)}>
                      <input
                        type="radio"
                        id={`${q.id}-${option}`}
                        name={q.id}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleInputChange(q.id, option)}
                        disabled={reviewMode}
                        style={{ margin: 0 }}
                      />
                      <label htmlFor={`${q.id}-${option}`} style={radioLabelStyle}>
                        {option}
                      </label>
                    </div>
                  )
                })}
              </div>
            )}

            {q.type === "fill" && (
              <div>
                <input
                  type="text"
                  placeholder="Type your answer here"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  disabled={reviewMode}
                  style={inputStyle(isCorrect(q.id))}
                />
                <div style={hintStyle}>
                  <HelpCircle className="h-4 w-4 mr-1" />
                  <span>Hint: {q.hint}</span>
                </div>
                {reviewMode && !isCorrect(q.id) && (
                  <div style={correctAnswerStyle}>
                    <span style={{ fontWeight: 500 }}>Correct answer:</span> {correctAnswers[q.id]}
                  </div>
                )}
              </div>
            )}

            {q.type === "tf" && (
              <div style={radioGroupStyle}>
                {q.options.map((option: string) => {
                  const isSelected = answers[q.id] === option
                  const isCorrectAnswer = option === correctAnswers[q.id]

                  return (
                    <div key={option} style={radioItemStyle(isSelected, isCorrectAnswer)}>
                      <input
                        type="radio"
                        id={`${q.id}-${option}`}
                        name={q.id}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleInputChange(q.id, option)}
                        disabled={reviewMode}
                        style={{ margin: 0 }}
                      />
                      <label htmlFor={`${q.id}-${option}`} style={radioLabelStyle}>
                        {option}
                      </label>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderNavigation = () => {
    const buttonBaseStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      padding: "0.5rem 1rem",
      cursor: "pointer",
      transition: "all 0.2s",
    }

    const primaryButtonStyle = {
      ...buttonBaseStyle,
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    }

    const outlineButtonStyle = {
      ...buttonBaseStyle,
      backgroundColor: "transparent",
      color: "#374151",
      border: "1px solid #e5e7eb",
    }

    const disabledButtonStyle = {
      ...buttonBaseStyle,
      backgroundColor: "#e5e7eb",
      color: "#9ca3af",
      border: "none",
      cursor: "not-allowed",
      opacity: 0.7,
    }

    return (
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigateToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0 || reviewMode}
          style={currentQuestion === 0 || reviewMode ? disabledButtonStyle : outlineButtonStyle}
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => navigateToQuestion(currentQuestion + 1)}
            disabled={reviewMode}
            style={reviewMode ? disabledButtonStyle : primaryButtonStyle}
          >
            Next
          </button>
        ) : (
          <button type="submit" disabled={reviewMode} style={reviewMode ? disabledButtonStyle : primaryButtonStyle}>
            Submit Quiz
          </button>
        )}
      </div>
    )
  }

  const renderProgressIndicators = () => {
    const progressContainerStyle = {
      marginBottom: "1.5rem",
    }

    const progressLabelContainerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    }

    const progressLabelStyle = {
      fontSize: "0.875rem",
      fontWeight: 500,
    }

    const progressBarContainerStyle = {
      width: "100%",
      height: "0.5rem",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      overflow: "hidden",
    }

    const progressBarStyle = {
      height: "100%",
      width: `${progressPercentage}%`,
      backgroundColor: "#3b82f6",
      borderRadius: "9999px",
      transition: "width 0.3s ease",
    }

    const questionButtonsContainerStyle: React.CSSProperties = {
      display: "flex",
      flexWrap: "wrap",  // Explicitly typed as FlexWrap
      gap: "0.5rem",
      justifyContent: "center",
      marginTop: "1rem",
    };    

    const questionButtonStyle = (index: number, answered: boolean) => ({
      width: "2.5rem",
      height: "2.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      backgroundColor: answered ? "#3b82f6" : "transparent",
      color: answered ? "white" : "#374151",
      border: answered ? "none" : "1px solid #e5e7eb",
      cursor: reviewMode ? "not-allowed" : "pointer",
      boxShadow: currentQuestion === index ? "0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.3)" : "none",
      transition: "all 0.2s",
    })

    return (
      <div style={progressContainerStyle}>
        <div style={progressLabelContainerStyle}>
          <span style={progressLabelStyle}>Your progress</span>
          <span style={progressLabelStyle}>
            {Object.keys(answers).length}/{questions.length} answered
          </span>
        </div>
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle}></div>
        </div>

        <div style={questionButtonsContainerStyle}>
          {questions.map((_, index) => (
            <button
              key={index}
              type="button"
              style={questionButtonStyle(index, isAnswered(questions[index].id))}
              onClick={() => navigateToQuestion(index)}
              disabled={reviewMode}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderResults = () => {
    if (!showResults) return null

    const modalOverlayStyle = {
      position: "fixed" as const,
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      zIndex: 50,
    }

    const modalContentStyle = {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "2rem",
      maxWidth: "28rem",
      width: "100%",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }

    const modalTitleStyle = {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "1rem",
    }

    const scoreContainerStyle = {
      textAlign: "center" as const,
      marginBottom: "1.5rem",
    }

    const scoreStyle = {
      fontSize: "3rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
    }

    const scoreMessageStyle = {
      color: "#6b7280",
    }

    const buttonContainerStyle = {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    }

    const primaryButtonStyle = {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "0.75rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: 500,
      border: "none",
      cursor: "pointer",
      width: "100%",
    }

    const secondaryButtonStyle = {
      backgroundColor: "transparent",
      color: "#374151",
      padding: "0.75rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: 500,
      border: "1px solid #e5e7eb",
      cursor: "pointer",
      width: "100%",
    }

    return (
      <div style={modalOverlayStyle} role="dialog" aria-modal="true">
        <div style={modalContentStyle}>
          <h2 style={modalTitleStyle}>Quiz Results</h2>

          <div style={scoreContainerStyle}>
            <div style={scoreStyle}>{score} / 10</div>
            <div style={scoreMessageStyle}>
              {score === 10 ? "Perfect score!" : score >= 7 ? "Well done!" : "Keep studying!"}
            </div>
          </div>

          <div style={buttonContainerStyle}>
            <button
              style={primaryButtonStyle}
              onClick={() => {
                setReviewMode(true)
                setShowResults(false)
              }}
            >
              Review Answers
            </button>

            <button
              style={secondaryButtonStyle}
              onClick={() => {
                setAnswers({})
                setScore(null)
                setShowResults(false)
                setCurrentQuestion(0)
                setReviewMode(false)
              }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "1rem",
    "@media (min-width: 768px)": {
      padding: "2rem",
    },
  }

  const containerStyle = {
    maxWidth: "48rem",
    marginLeft: "auto",
    marginRight: "auto",
  }

  const headerStyle = {
    marginBottom: "2rem",
  }

  const backLinkStyle = {
    display: "inline-flex",
    alignItems: "center",
    color: "#3b82f6",
    marginBottom: "1rem",
    textDecoration: "none",
    ":hover": {
      color: "#2563eb",
    },
  }

  const titleStyle = {
    fontSize: "1.875rem",
    fontWeight: 700,
    color: "#111827",
  }

  const subtitleStyle = {
    color: "#6b7280",
    marginTop: "0.5rem",
  }

  const reviewHeaderStyle = {
    marginBottom: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }

  const reviewTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
  }

  const newQuizButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "0.5rem 1rem",
    backgroundColor: "transparent",
    color: "#374151",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <Link to="/course/SCS2201" style={backLinkStyle}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Course</span>
          </Link>
          <h1 style={titleStyle}>Quiz: Conjectures and Refutations</h1>
          <p style={subtitleStyle}>Test your knowledge of Popper's philosophy of science</p>
        </div>

        {reviewMode ? (
          <>
            <div style={reviewHeaderStyle}>
              <h2 style={reviewTitleStyle}>Review Mode</h2>
              <button
                style={newQuizButtonStyle}
                onClick={() => {
                  setAnswers({})
                  setScore(null)
                  setCurrentQuestion(0)
                  setReviewMode(false)
                }}
              >
                Start New Quiz
              </button>
            </div>
            {questions.map((q, index) => renderQuestion(q, index))}
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
          >
            {renderProgressIndicators()}
            {questions.map((q, index) => renderQuestion(q, index))}
            {renderNavigation()}
          </form>
        )}

        {renderResults()}
      </div>
    </div>
  )
}

