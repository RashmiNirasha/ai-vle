import React, { useState } from 'react';
import { BookOpen, Code2, Brain, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/navBar';

const Course: React.FC = () => {
  const [notifications] = useState(2); // Set notifications state to 2

  return (
    <>
      <Navbar notifications={notifications} />
      
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/course/SCS2201" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Course
            </Link>
          </div>

          {/* Unit Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Unit 1: Introduction to Programming</h1>
            <div className="flex items-center gap-2 text-slate-600 mb-4">
              <BookOpen className="h-5 w-5" />
              <span>Estimated time: 45 minutes</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                <Brain className="h-4 w-4" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Interactive Learning</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">What is Programming?</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Programming is the process of designing, writing, testing, and maintaining a set of instructions (called
              code) that a computer can execute. It enables us to create software applications, websites, games, and much
              more.
            </p>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">With programming, you can:</h3>
              <ul className="space-y-3">
                {[
                  'Solve real-world problems through automation',
                  'Create interactive user experiences in apps and websites',
                  'Process large volumes of data efficiently',
                  'Develop artificial intelligence and machine learning systems',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programming Languages Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Programming Languages</h2>
              <p className="text-slate-700 mb-4">
                Programming languages are tools that allow us to write code in a way that computers can interpret. Each
                language has its own syntax, structure, and purpose. Here are some popular programming languages:
                <br />
                <br />
                Python: Known for its simplicity, Python is widely used in data science, AI, and web development.
                <br />
                Java: Popular for its portability and often used in enterprise applications and Android app development.
                <br />
                C++: Ideal for system programming, game development, and high-performance applications.
                <br />
                JavaScript: Essential for creating interactive web applications and front-end development.
                <br />
                Ruby: Often used for web development, especially with the Ruby on Rails framework.
              </p>
              Programming languages are chosen based on the type of project, performance requirements, and developer preference.
              <div className="w-full rounded-lg border p-4 overflow-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <img src="./Images/1.png" alt="Flowchart Example" className="col-span-2 md:col-span-3 rounded-lg w-full h-auto" />
                  </div>
                </div>

              {/* Algorithms and Flowcharts */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Algorithms and Flowcharts</h2>
                <p className="text-slate-700 mb-4">
                  Algorithms: Algorithms are step-by-step instructions designed to solve a problem or perform a specific task.
                  They serve as the backbone of programming by providing a clear set of rules to follow. Think of them as a
                  recipe for solving a problem. For instance, an algorithm for making a cup of tea could look like this:
                  <br />
                  1. Boil water.
                  <br />
                  2. Put a tea bag in a cup.
                  <br />
                  3. Pour hot water into the cup.
                  <br />
                  4. Add sugar or milk (optional).
                  <br />
                  5. Stir and serve.
                  <br />
                  Algorithms can be represented in different ways, such as plain text, pseudocode, or flowcharts. They are crucial
                  for defining logical solutions to problems.
                  <br />
                  <br />
                  Flowcharts: Flowcharts visually represent algorithms. They use shapes like rectangles (process), diamonds
                  (decisions), and arrows (flow) to illustrate steps clearly. For example:
                </p>
                <div className="w-full rounded-lg border p-4 overflow-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <img src="/Images/2.png" alt="Flowchart Example" className="col-span-2 md:col-span-3 rounded-lg w-full h-auto" />
                  </div>
                </div>
              </div>

              {/* Compiling Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Compiling: From Code to Machine Instructions</h2>
                <p className="text-slate-700 mb-4">
                  Compiling is the process of converting source code, written by developers in a high-level programming
                  language like Python or C++, into machine code (also known as binary code). Machine code is the language
                  that a computer's processor can understand and execute directly.
                  <br />
                  The compilation process involves several steps:
                  <br />
                  1. Lexical Analysis: Breaking the code into smaller units called tokens (e.g., keywords, variables, symbols).
                  <br />
                  2. Syntax Analysis: Checking the structure of the code to ensure it adheres to the language's grammar.
                  <br />
                  3. Code Optimization: Improving the efficiency of the machine code for better performance.
                  <br />
                  4. Code Generation: Producing the final machine code, which the computer can execute.
                  <br />
                  Compilers play a critical role in ensuring that the code is error-free and optimized before running on the machine.
                </p>
              </div>

              {/* Understanding Binary Code */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Understanding Binary Code</h2>
                <p className="text-slate-700 mb-4">
                  Computers operate on binary code, which is a sequence of 0s and 1s that represent instructions and data.
                  This is because modern computers use digital circuits that can be in one of two states: on (1) or off (0).
                  Everything from images, videos, and text to software applications is ultimately represented in binary format.
                  <br />
                  For example:
                  <br />
                  The binary number 01000001 represents the letter A in the ASCII system.
                  <br />
                  The number 0011 1110 might represent a specific machine instruction.
                  <br />
                  Binary code forms the foundation of all computing, making it essential for programs to be translated (compiled)
                  into this format for execution.
                </p>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                <p className="text-slate-700 mb-4">
                  Programming involves understanding concepts like programming languages, algorithms, and flowcharts. By mastering
                  these basics, you can build a solid foundation for solving complex problems through logical thinking and
                  structured approaches.
                  <br />
                  Algorithms and flowcharts are tools to streamline problem-solving and ensure consistency in your solutions.
                </p>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600" />
                Quick Reference: Popular Languages
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <strong>Python:</strong> Known for its simplicity, widely used in data science and AI
                </li>
                <li>
                  <strong>JavaScript:</strong> Essential for creating interactive web applications
                </li>
                <li>
                  <strong>Java:</strong> Popular for enterprise applications and Android development
                </li>
                <li>
                  <strong>C++:</strong> Ideal for system programming and game development
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h2>
            <p className="mb-4">Take a short quiz to review what you've learned in Unit 1.</p>
            <Link to="/quiz" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors group flex items-center inline-flex">
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
