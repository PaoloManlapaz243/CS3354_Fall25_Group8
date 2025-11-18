import { useAuth } from '../contexts/AuthContext';
import { useWorkout, VALID_EXERCISES } from '../contexts/WorkoutContext';
import Navigation from './Navigation';
import { TrendingUp, Award, Calendar } from 'lucide-react';

interface PRTrackerPageProps {
  onNavigate: (page: 'home' | 'friends' | 'newPost') => void;
  onLogout: () => void;
}

export default function PRTrackerPage({ onNavigate, onLogout }: PRTrackerPageProps) {
  const { user } = useAuth();
  const { personalRecords, posts } = useWorkout();

  if (!user) return null;

  // Get user's PRs
  const userPRs = personalRecords;

  // Group PRs by exercise
  const prsByExercise = userPRs.reduce((acc, pr) => {
    if (!acc[pr.exercise]) {
      acc[pr.exercise] = [];
    }
    acc[pr.exercise].push(pr);
    return acc;
  }, {} as Record<string, typeof userPRs>);

  // Get best PR for each exercise
  const bestPRs = Object.entries(prsByExercise).map(([exercise, prs]) => {
    const best = prs.reduce((max, pr) => {
      if (pr.weight > max.weight || (pr.weight === max.weight && pr.reps > max.reps)) {
        return pr;
      }
      return max;
    });
    return { exercise, ...best };
  });

  // Calculate total PRs and recent achievements
  const totalPRs = posts.filter(p => p.userId === user.id && p.isNewPR).length;
  const recentPRs = posts
    .filter(p => p.userId === user.id && p.isNewPR)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  // Calculate progress
  const exercisesWithPRs = bestPRs.length;
  const totalExercises = VALID_EXERCISES.length;
  const progressPercentage = Math.round((exercisesWithPRs / totalExercises) * 100);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <Navigation 
        currentPage="prTracker" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        username={user.username}
      />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-white" size={32} />
              <h3 className="text-white text-xl">Total PRs</h3>
            </div>
            <p className="text-white text-4xl">{totalPRs}</p>
            <p className="text-white/80 text-sm mt-2">Personal records set</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-[#404040]">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-[#4caeff]" size={32} />
              <h3 className="text-white text-xl">Exercises</h3>
            </div>
            <p className="text-white text-4xl">{exercisesWithPRs}</p>
            <p className="text-gray-400 text-sm mt-2">Out of {totalExercises} tracked</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-[#404040]">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-[#4caeff]" size={32} />
              <h3 className="text-white text-xl">Progress</h3>
            </div>
            <p className="text-white text-4xl">{progressPercentage}%</p>
            <p className="text-gray-400 text-sm mt-2">Exercise coverage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Records */}
          <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-[#404040]">
            <div className="p-6 border-b border-[#404040]">
              <h2 className="text-2xl text-white">Personal Records</h2>
              <p className="text-gray-400 mt-1">Your best lifts for each exercise</p>
            </div>
            <div className="p-6">
              {bestPRs.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="mx-auto text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400 mb-4">No PRs yet. Start logging workouts!</p>
                  <button
                    onClick={() => onNavigate('newPost')}
                    className="px-6 py-2 bg-[#4caeff] text-white rounded-lg hover:bg-[#3a9eef] transition-colors"
                  >
                    Log First Workout
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {bestPRs.sort((a, b) => b.weight - a.weight).map((pr, index) => (
                    <div key={index} className="p-4 bg-[#1f1f1f] rounded-lg border border-[#404040] hover:border-[#4caeff]/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white">{pr.exercise}</h3>
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs">
                          PR
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl text-[#4caeff]">
                            {pr.weight > 0 ? `${pr.weight} lbs` : 'Bodyweight'}
                          </p>
                          <p className="text-gray-400 text-sm">{pr.reps} reps</p>
                        </div>
                        <p className="text-gray-400 text-sm">{formatDate(pr.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-[#404040]">
            <div className="p-6 border-b border-[#404040]">
              <h2 className="text-2xl text-white">Recent Achievements</h2>
              <p className="text-gray-400 mt-1">Your latest personal records</p>
            </div>
            <div className="p-6">
              {recentPRs.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="mx-auto text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400">No recent PRs</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPRs.map((pr) => (
                    <div key={pr.id} className="p-4 bg-[#1f1f1f] rounded-lg border border-[#404040]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Award className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white">{pr.exercise}</h3>
                          <p className="text-gray-400 text-sm">{formatDate(pr.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-gray-300">
                          <span className="text-[#4caeff]">{pr.weight > 0 ? `${pr.weight} lbs` : 'Bodyweight'}</span> × {pr.sets} sets × {pr.reps} reps
                        </p>
                      </div>
                      {pr.caption && (
                        <p className="text-gray-400 text-sm mt-2 italic">"{pr.caption}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Exercises Progress */}
        <div className="mt-8 bg-[#2a2a2a] rounded-xl shadow-lg border border-[#404040]">
          <div className="p-6 border-b border-[#404040]">
            <h2 className="text-2xl text-white">Exercise Coverage</h2>
            <p className="text-gray-400 mt-1">Track your progress across all exercises</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {VALID_EXERCISES.map((exercise) => {
                const hasPR = bestPRs.some(pr => pr.exercise === exercise);
                return (
                  <div
                    key={exercise}
                    className={`p-4 rounded-lg border transition-all ${
                      hasPR
                        ? 'bg-[#4caeff]/10 border-[#4caeff]'
                        : 'bg-[#1f1f1f] border-[#404040]'
                    }`}
                  >
                    <p className={`text-sm text-center ${hasPR ? 'text-[#4caeff]' : 'text-gray-400'}`}>
                      {exercise}
                    </p>
                    {hasPR && (
                      <div className="flex justify-center mt-2">
                        <Award className="text-[#4caeff]" size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
