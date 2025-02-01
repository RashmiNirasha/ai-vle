import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle, 
  PlayCircle, 
  FileText, 
  PieChart,
  ArrowLeft,
  Download,
  Clock
} from 'lucide-react';

// Mock course data - in a real app, this would come from an API
const courseData = {
  'SCS2201': {
    id: 'SCS2201',
    name: 'Data Structures and Algorithms',
    description: 'Learn about fundamental data structures and algorithms essential for software development.',
    progress: 65,
    topics: [
      {
        id: 1,
        name: 'Introduction to Data Structures',
        completed: true,
        materials: ['Lecture Notes', 'Tutorial Sheet'],
        duration: '2 hours'
      },
      {
        id: 2,
        name: 'Arrays and Linked Lists',
        completed: true,
        materials: ['Lecture Recording', 'Lab Materials'],
        duration: '3 hours'
      },
      {
        id: 3,
        name: 'Trees and Graphs',
        completed: false,
        materials: ['Lecture Slides', 'Practice Questions'],
        duration: '4 hours'
      },
      {
        id: 4,
        name: 'Sorting Algorithms',
        completed: false,
        materials: ['Lecture Notes', 'Assignment'],
        duration: '3 hours'
      }
    ],
    quizzes: [
      {
        id: 1,
        name: 'Quiz 1: Basic Data Structures',
        score: '85%',
        completed: true,
        deadline: '2024-01-15'
      },
      {
        id: 2,
        name: 'Quiz 2: Arrays and Lists',
        score: '90%',
        completed: true,
        deadline: '2024-01-30'
      },
      {
        id: 3,
        name: 'Quiz 3: Trees',
        completed: false,
        deadline: '2024-02-15'
      }
    ],
    assignments: [
      {
        id: 1,
        name: 'Lab 1: Array Implementation',
        status: 'Completed',
        score: '92%',
        deadline: '2024-01-20'
      },
      {
        id: 2,
        name: 'Lab 2: Linked List Operations',
        status: 'Pending',
        deadline: '2024-02-10'
      }
    ]
  }
  // Add more courses as needed
};

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-slate-600">{course.id}</p>
              <p className="mt-2 text-slate-700">{course.description}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                <PieChart className="h-4 w-4 mr-2" />
                {course.progress}% Complete
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.topics.map((topic) => (
                  <div 
                    key={topic.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {topic.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <Clock className="h-5 w-5 text-slate-400 mr-3" />
                        )}
                        <div>
                          <h3 className="font-medium">{topic.name}</h3>
                          <p className="text-sm text-slate-500">{topic.duration}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {topic.materials.map((material, index) => (
                          <button
                            key={index}
                            className="p-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quizzes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quizzes</h2>
              <div className="space-y-3">
                {course.quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-3 border border-slate-200 rounded-lg">
                    <h3 className="font-medium">{quiz.name}</h3>
                    {quiz.completed ? (
                      <div className="mt-2 text-sm text-green-600">
                        Score: {quiz.score}
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-orange-600">
                        Due: {quiz.deadline}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Assignments</h2>
              <div className="space-y-3">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border border-slate-200 rounded-lg">
                    <h3 className="font-medium">{assignment.name}</h3>
                    <div className={`mt-2 text-sm ${
                      assignment.status === 'Completed' 
                        ? 'text-green-600' 
                        : 'text-orange-600'
                    }`}>
                      {assignment.status === 'Completed' 
                        ? `Score: ${assignment.score}` 
                        : `Due: ${assignment.deadline}`
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;