import type React from "react"
import { useState, useRef } from "react"
import {
  BookOpen,
  Brain,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Radio,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Volume2,
} from "lucide-react"
import { Link } from "react-router-dom"

const Course: React.FC = () => {
  const [textSize, setTextSize] = useState("medium")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleZoom = (change: number) => {
    setZoomLevel((prev) => Math.min(150, Math.max(75, prev + change)))
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setAudioPlaying(!audioPlaying)
    }
  }

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  const getFontSize = () => {
    switch (textSize) {
      case "small":
        return "0.875rem"
      case "medium":
        return "1rem"
      case "large":
        return "1.125rem"
      case "x-large":
        return "1.25rem"
      default:
        return "1rem"
    }
  }

  const getHeadingSize = () => {
    switch (textSize) {
      case "small":
        return "1.5rem"
      case "medium":
        return "1.75rem"
      case "large":
        return "2rem"
      case "x-large":
        return "2.25rem"
      default:
        return "1.75rem"
    }
  }

  const getSubheadingSize = () => {
    switch (textSize) {
      case "small":
        return "1.25rem"
      case "medium":
        return "1.5rem"
      case "large":
        return "1.75rem"
      case "x-large":
        return "2rem"
      default:
        return "1.5rem"
    }
  }

  // Main container styles
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: "1rem",
    backgroundColor: isDarkMode ? "#121212" : "#f8fafc",
    color: isDarkMode ? "#e5e7eb" : "#1f2937",
    fontSize: getFontSize(),
    transition: "background-color 0.3s, color 0.3s",
    zoom: `${zoomLevel}%`,
  }

  // Layout styles
  const layoutStyle: React.CSSProperties = {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    gap: "1.5rem",
  }

  const accessibilityPanelStyle: React.CSSProperties = {
  width: "250px",
  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
  padding: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  position: "sticky",
  top: "1rem",
  height: "fit-content",
  display: "block",
};


  const accessibilityTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: isDarkMode ? "#e5e7eb" : "#1f2937",
  }

  const accessibilitySectionStyle: React.CSSProperties = {
    marginBottom: "1.25rem",
  }

  const accessibilitySectionTitleStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "0.5rem",
    color: isDarkMode ? "#d1d5db" : "#4b5563",
  }

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  }

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: isActive ? (isDarkMode ? "#3b82f6" : "#3b82f6") : isDarkMode ? "#374151" : "#f3f4f6",
    color: isActive ? "#ffffff" : isDarkMode ? "#d1d5db" : "#4b5563",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "background-color 0.2s",
  })

  // Content area styles
  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
  }

  const backLinkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    color: isDarkMode ? "#60a5fa" : "#2563eb",
    textDecoration: "none",
    marginBottom: "1rem",
    fontWeight: 500,
  }

  const headerStyle: React.CSSProperties = {
    background: isDarkMode
      ? "linear-gradient(to right, #1e3a8a, #1e40af)"
      : "linear-gradient(to right, #3b82f6, #2563eb)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    color: "#ffffff",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }

  const headerTitleStyle: React.CSSProperties = {
    fontSize: getHeadingSize(),
    fontWeight: 700,
    marginBottom: "0.75rem",
  }

  const headerMetaStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  }

  const tagContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  }

  const tagStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "0.375rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: 600,
  }

  // Content section styles
  const sectionStyle: React.CSSProperties = {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: getSubheadingSize(),
    fontWeight: 600,
    marginBottom: "1rem",
    color: isDarkMode ? "#e5e7eb" : "#1f2937",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }

  const paragraphStyle: React.CSSProperties = {
    marginBottom: "1rem",
    lineHeight: 1.6,
    color: isDarkMode ? "#d1d5db" : "#4b5563",
  }

  const listStyle: React.CSSProperties = {
    paddingLeft: "1.5rem",
    marginBottom: "1rem",
  }

  const listItemStyle: React.CSSProperties = {
    marginBottom: "0.5rem",
    lineHeight: 1.6,
    color: isDarkMode ? "#d1d5db" : "#4b5563",
  }

  const highlightStyle: React.CSSProperties = {
    backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    borderLeft: `4px solid ${isDarkMode ? "#60a5fa" : "#3b82f6"}`,
  }

  const calloutStyle: React.CSSProperties = {
    background: isDarkMode
      ? "linear-gradient(to right, #065f46, #047857)"
      : "linear-gradient(to right, #10b981, #059669)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    color: "#ffffff",
    marginTop: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }

  const calloutTitleStyle: React.CSSProperties = {
    fontSize: getSubheadingSize(),
    fontWeight: 700,
    marginBottom: "0.75rem",
  }

  const calloutButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: isDarkMode ? "#047857" : "#059669",
    padding: "0.625rem 1.25rem",
    borderRadius: "0.5rem",
    fontWeight: 600,
    marginTop: "0.75rem",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  }

  const accordionButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    textAlign: "left",
    padding: "0.75rem",
    backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
    borderRadius: "0.375rem",
    marginBottom: expandedSection !== null ? "0.75rem" : "0",
    border: "none",
    cursor: "pointer",
    color: isDarkMode ? "#e5e7eb" : "#1f2937",
    fontWeight: 600,
  }

  const accordionContentStyle = (isExpanded: boolean): React.CSSProperties => ({
    padding: isExpanded ? "0.75rem" : "0",
    maxHeight: isExpanded ? "1000px" : "0",
    overflow: "hidden",
    transition: "all 0.3s ease",
    opacity: isExpanded ? 1 : 0,
    marginBottom: isExpanded ? "0.75rem" : "0",
  })

  const sections = [
    {
      title: "The Problem of Distinguishing Science from Pseudo-Science",
      content:
        "Popper's main question was: How can we tell if a theory is truly scientific or just pseudo-science? This was different from asking whether a theory is true or whether we accept it. Popper was concerned with the method used by theories. He wanted to distinguish between genuine scientific methods and methods that might look scientific but are actually flawed or non-scientific.",
    },
    {
      title: "The Role of Empirical Methods",
      content:
        "Most people thought science could be distinguished from pseudo-science by its empirical methods (methods based on observation and experimentation). However, Popper felt that some theories, like astrology, were based on observation but still not scientific. So, he began questioning what made some methods 'scientific' and others not.",
    },
    {
      title: "Examples from Popper's Time",
      content:
        "After World War I, Popper became interested in several theories, especially Einstein's theory of relativity, Marxism, Freud's psychoanalysis, and Alfred Adler's individual psychology. These theories were widely discussed, but Popper became doubtful about their scientific status. His question was: What makes Einstein's theory different from Marxism or psychoanalysis?",
    },
    {
      title: "Why Marxism, Psychoanalysis, and Adler's Psychology Seem Like Pseudo-Science",
      content:
        "Popper noticed that the followers of Marx, Freud, and Adler seemed to always find evidence that confirmed their theories. For example, Marxists found evidence in the news to support their ideas about class struggles, and Freudians could always explain any behavior in Freudian terms. Popper thought this was a problem because it made the theories seem too flexible—they could explain anything and everything, so they were hard to disprove. This made them more like myths or pseudo-science than real science.",
    },
    {
      title: "Contrast with Einstein's Theory",
      content:
        "In contrast, Einstein's theory of relativity made specific predictions that were risky. For example, Einstein predicted that light would bend around the sun, which could be tested during an eclipse. If this prediction had been wrong, it would have refuted his theory. Popper thought this kind of risky prediction was a key feature of scientific theories.",
    },
    {
      title: "Popper's Conclusions",
      content:
        "Popper summarized his conclusions about what makes a theory scientific:\n\n• Scientific theories must be testable: A theory is scientific if it can be tested and potentially proven false (falsifiable). The more a theory forbids (i.e., predicts specific outcomes), the better.\n• Conformation isn't enough: It's easy to find confirming evidence for a theory if you look for it. What matters is whether the theory can withstand attempts to prove it wrong.\n• Falsifiability is key: Theories that cannot be proven false, no matter what happens, are not scientific. This is because the ability to be refuted by evidence is what makes a theory scientific.",
    },
    {
      title: "Testability vs. Confirmation",
      content:
        "Popper emphasized that scientific theories should be subject to tests that could potentially show them to be false. He argued that any theory that can't be tested or refuted doesn't deserve to be called scientific. For instance, a theory that fits every situation (like psychoanalysis) doesn't really advance knowledge because it can't be disproven.",
    },
    {
      title: "The Problem of Ad Hoc Adjustments",
      content:
        "Sometimes, people try to protect a theory from being falsified by adding extra assumptions or reinterpreting it when evidence contradicts it. Popper warned that this kind of 'adjustment' lowers the scientific value of a theory because it avoids genuine testing.",
    },
  ]

  return (
    <div style={containerStyle}>
      <div style={layoutStyle}>
        {/* Accessibility Panel */}
        <div style={accessibilityPanelStyle}>
          <h3 style={accessibilityTitleStyle}>Accessibility Options</h3>

          <div style={accessibilitySectionStyle}>
            <h4 style={accessibilitySectionTitleStyle}>Text Size</h4>
            <div style={buttonGroupStyle}>
              <button onClick={() => setTextSize("small")} style={buttonStyle(textSize === "small")}>
                Small
              </button>
              <button onClick={() => setTextSize("medium")} style={buttonStyle(textSize === "medium")}>
                Medium
              </button>
              <button onClick={() => setTextSize("large")} style={buttonStyle(textSize === "large")}>
                Large
              </button>
              <button onClick={() => setTextSize("x-large")} style={buttonStyle(textSize === "x-large")}>
                Extra Large
              </button>
            </div>
          </div>

          <div style={accessibilitySectionStyle}>
            <h4 style={accessibilitySectionTitleStyle}>Display Mode</h4>
            <div style={buttonGroupStyle}>
              <button onClick={() => setIsDarkMode(false)} style={buttonStyle(!isDarkMode)}>
                <Sun size={16} /> Light Mode
              </button>
              <button onClick={() => setIsDarkMode(true)} style={buttonStyle(isDarkMode)}>
                <Moon size={16} /> Dark Mode
              </button>
            </div>
          </div>

          <div style={accessibilitySectionStyle}>
            <h4 style={accessibilitySectionTitleStyle}>Zoom</h4>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleZoom(-10)} style={{ ...buttonStyle(false), flex: 1 }}>
                <ZoomOut size={16} />
              </button>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                  backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                  borderRadius: "0.375rem",
                  fontWeight: 500,
                  minWidth: "60px",
                }}
              >
                {zoomLevel}%
              </span>
              <button onClick={() => handleZoom(10)} style={{ ...buttonStyle(false), flex: 1 }}>
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          <div style={accessibilitySectionStyle}>
            <h4 style={accessibilitySectionTitleStyle}>Audio</h4>
            <button onClick={toggleAudio} style={buttonStyle(audioPlaying)}>
              {audioPlaying ? <Volume2 size={16} /> : <Radio size={16} />}
              {audioPlaying ? "Stop Audio" : "Listen to Content"}
            </button>
            <audio ref={audioRef} style={{ display: "none" }} controls>
              <source src="#" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        {/* Main Content */}
        <div style={contentAreaStyle}>
          {/* Header */}
          <Link to="/course/SCS2201" style={backLinkStyle}>
            <ArrowLeft size={16} style={{ marginRight: "0.25rem" }} />
            Back to Course
          </Link>

          {/* Unit Header */}
          <div style={headerStyle}>
            <h1 style={headerTitleStyle}>Unit 1: Conjectures and Refutations</h1>
            <div style={headerMetaStyle}>
              <BookOpen size={18} />
              <span>Estimated time: 30 minutes</span>
            </div>
            <div style={tagContainerStyle}>
              <div style={tagStyle}>
                <Brain size={16} /> Critical Thinking
              </div>
              <div style={tagStyle}>
                <CheckCircle size={16} /> Interactive Content
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Introduction to Popper's Philosophy</h2>
            <div style={highlightStyle}>
              <p style={{ ...paragraphStyle, marginBottom: 0, fontWeight: 500 }}>
                "The criterion of the scientific status of a theory is its falsifiability, or refutability, or
                testability." - Karl Popper
              </p>
            </div>
            <p style={paragraphStyle}>
              Karl Popper revolutionized our understanding of what makes a theory scientific. Instead of focusing on
              what's true, he asked a more fundamental question: What distinguishes genuine science from pseudo-science?
              His answer—falsifiability—has become a cornerstone of scientific philosophy.
            </p>
            <p style={paragraphStyle}>
              This unit explores Popper's key ideas about scientific theories, why some theories qualify as scientific
              while others don't, and how to distinguish between them.
            </p>
          </div>

          {/* Main Content Sections */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Key Concepts</h2>

            {sections.map((section, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <button
                  onClick={() => toggleSection(index)}
                  style={accordionButtonStyle}
                  aria-expanded={expandedSection === index}
                >
                  {section.title}
                  {expandedSection === index ? <span aria-hidden="true">−</span> : <span aria-hidden="true">+</span>}
                </button>
                <div style={accordionContentStyle(expandedSection === index)}>
                  {section.content.split("\n\n").map((paragraph, pIndex) =>
                    paragraph.startsWith("•") ? (
                      <ul style={listStyle} key={pIndex}>
                        {paragraph.split("\n").map((item, iIndex) => (
                          <li style={listItemStyle} key={iIndex}>
                            {item.substring(1).trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={paragraphStyle} key={pIndex}>
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Comparison */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Science vs. Pseudo-Science: A Comparison</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    color: isDarkMode ? "#e5e7eb" : "#1f2937",
                  }}
                >
                  Scientific Theories
                </h3>
                <ul style={listStyle}>
                  <li style={listItemStyle}>Make specific, testable predictions</li>
                  <li style={listItemStyle}>Can be proven false by observations</li>
                  <li style={listItemStyle}>Take risks by making bold claims</li>
                  <li style={listItemStyle}>Example: Einstein's theory of relativity</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                  borderLeft: "4px solid #ef4444",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    color: isDarkMode ? "#e5e7eb" : "#1f2937",
                  }}
                >
                  Pseudo-Scientific Theories
                </h3>
                <ul style={listStyle}>
                  <li style={listItemStyle}>Explain everything, even contradictions</li>
                  <li style={listItemStyle}>Cannot be proven false by any observation</li>
                  <li style={listItemStyle}>Avoid risks by being too flexible</li>
                  <li style={listItemStyle}>Examples: Marxism, Freudian psychoanalysis</li>
                </ul>
              </div>
            </div>

            <p style={{ ...paragraphStyle, fontWeight: 500 }}>
              The key difference: A scientific theory makes predictions that could potentially be proven wrong, while a
              pseudo-scientific theory can explain any outcome and cannot be refuted.
            </p>
          </div>

          {/* Summary */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Summary</h2>
            <p style={paragraphStyle}>
              Popper's criterion of falsifiability provides a clear way to distinguish science from pseudo-science.
              Scientific theories must be testable and potentially refutable. The more specific and risky the
              predictions a theory makes, the more scientific it is.
            </p>
            <p style={paragraphStyle}>
              Theories that can explain everything and cannot be proven wrong—no matter what evidence is presented—are
              not scientific. This includes theories that are constantly adjusted to accommodate contradictory evidence.
            </p>
            <p style={paragraphStyle}>
              Einstein's theory of relativity exemplifies a scientific theory because it made specific, testable
              predictions that could have proven it wrong. In contrast, theories like Marxism and psychoanalysis could
              explain any outcome and were therefore not genuinely scientific according to Popper.
            </p>
          </div>

          {/* Call to Action */}
          <div style={calloutStyle}>
            <h2 style={calloutTitleStyle}>Ready to Test Your Understanding?</h2>
            <p style={{ marginBottom: "1rem", lineHeight: 1.6 }}>
              Take the quiz to see how well you understand Popper's concept of falsifiability and the distinction
              between science and pseudo-science.
            </p>
            <Link to="/quiz" style={calloutButtonStyle}>
              Start Quiz <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course

