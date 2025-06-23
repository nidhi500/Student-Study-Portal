import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CareerQuiz from '../components/CareerQuiz';
import PlacementDashboard from '../components/PlacementDashboard';

const validGoals = ['GATE', 'UPSC', 'CAT', 'PLACEMENT'];

export default function CareerGoalPage() {
  const { goal } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);

  if (!goal) {
    return <div className="text-center text-red-600 py-20">⚠️ Career Goal not specified.</div>;
  }

  const normalizedGoal = goal.toUpperCase();

  if (!validGoals.includes(normalizedGoal)) {
    return <div className="text-center text-red-600 py-20">❌ Invalid goal: <strong>{goal}</strong></div>;
  }

  if (normalizedGoal === 'PLACEMENT') return <PlacementDashboard />;

  return quizStarted ? (
    <CareerQuiz goal={normalizedGoal} />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{normalizedGoal} Quiz</h2>
        <p className="text-gray-600 mb-2">📝 You will get <strong>20 questions</strong></p>
        <p className="text-gray-600 mb-4">⏱️ Time Limit: <strong>20 minutes</strong></p>

        <ul className="text-sm text-gray-500 text-left mb-6 list-disc list-inside">
          <li>Each question carries equal marks.</li>
          <li>No negative marking.</li>
          <li>Answers are auto-submitted on time out.</li>
        </ul>

        <button
          onClick={() => setQuizStarted(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
}
