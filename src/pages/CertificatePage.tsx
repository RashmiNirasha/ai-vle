import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function CertificatePage() {

  const studentName = "John Doe"
  const courseName = "Computer Ethics"
  const completionDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link to="/grades" className="print:hidden">
            <button className="inline-flex items-center text-sm text-blue-600 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Grades
            </button>
          </Link>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition print:hidden"
          >
            Print / Download
          </button>
        </div>

        {/* Certificate Image */}
        <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden bg-white">
          <img
            src="/Images/certificate.png"
            alt="Certificate"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Optional Certificate Info (if needed under image) */}
        <div className="text-center text-sm text-gray-500 print:hidden">
          Issued to <span className="font-semibold text-gray-700">{studentName}</span> for completing
          <span className="font-semibold text-gray-700"> {courseName}</span> on{" "}
          {completionDate}.
        </div>
      </div>
    </div>
  )
}
