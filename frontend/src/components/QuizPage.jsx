// src/components/QuizPage.jsx
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import CareerQuiz from "./CareerQuiz";

export default function QuizPage() {
  const goal = useAuthStore((state) => state.user?.goal || "GATE");
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
        {!started ? (
          <>
            <h1 className="text-4xl font-bold text-indigo-700 mb-4 text-center">📝 {goal} Quiz</h1>
            <p className="text-gray-700 text-center mb-8">
              This quiz consists of <strong>20 random questions</strong> based on your career goal: <span className="text-indigo-600 font-semibold">{goal}</span>.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 text-gray-700 px-6 py-4 rounded-lg mb-6">
              <h2 className="font-semibold mb-2">📋 Instructions:</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>You will be asked 20 multiple choice questions.</li>
                <li>Each question has only one correct answer.</li>
                <li>Your score will be shown instantly after submission.</li>
                <li>No negative marking — just your best shot!</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStarted(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition duration-300"
              >
                🚀 Start Quiz
              </button>
            </div>
          </>
        ) : (
          <CareerQuiz goal={goal} />
        )}
      </div>
    </div>
  );
}
