import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  useWorkout, 
  VALID_EXERCISES,
  validateExercise,
  validateSets,
  validateReps,
  validateWeight
} from '../contexts/WorkoutContext';
import Navigation from './Navigation';
import { Dumbbell, AlertCircle, CheckCircle } from 'lucide-react';

interface NewPostPageProps {
  onNavigate: (page: 'home' | 'friends' | 'prTracker') => void;
  onLogout: () => void;
}

export default function NewPostPage({ onNavigate, onLogout }: NewPostPageProps) {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [showExerciseDropdown, setShowExerciseDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isNewPR, setIsNewPR] = useState(false);
  
  const { user } = useAuth();
  const { addPost } = useWorkout();

  const handlePost = () => {
    setError('');
    setShowSuccess(false);

    // Validate exercise
    const exerciseValidation = validateExercise(exercise);
    if (!exerciseValidation.valid) {
      setError(exerciseValidation.error!);
      return;
    }

    // Validate sets
    const setsValidation = validateSets(sets);
    if (!setsValidation.valid) {
      setError(setsValidation.error!);
      return;
    }

    // Validate reps
    const repsValidation = validateReps(reps);
    if (!repsValidation.valid) {
      setError(repsValidation.error!);
      return;
    }

    // Validate weight
    const weightValidation = validateWeight(weight);
    if (!weightValidation.valid) {
      setError(weightValidation.error!);
      return;
    }

    // All validations passed, create post
    const isPR = addPost({
      userId: user?.id || 'current',
      username: user?.username || 'User',
      exercise,
      sets: setsValidation.value!,
      reps: repsValidation.value!,
      weight: weightValidation.value!,
      caption: caption || ''
    });

    setIsNewPR(isPR);
    setShowSuccess(true);

    // Reset form
    setTimeout(() => {
      onNavigate('home');
    }, 2000);
  };

  const filteredExercises = VALID_EXERCISES.filter(ex => 
    ex.toLowerCase().includes(exercise.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <Navigation 
        currentPage="newPost" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        username={user.username}
      />

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">
        <div className="bg-[#2a2a2a] rounded-xl p-8 shadow-lg border border-[#404040]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4caeff] to-[#179AFF] rounded-full flex items-center justify-center">
              <Dumbbell className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl text-white">Log Your Workout</h2>
              <p className="text-gray-400">Track your progress and share with friends</p>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              isNewPR 
                ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/50' 
                : 'bg-green-500/20 border border-green-500/50'
            }`}>
              <CheckCircle className={isNewPR ? 'text-yellow-400' : 'text-green-500'} size={24} />
              <div>
                <p className={`${isNewPR ? 'text-yellow-400' : 'text-green-400'}`}>
                  {isNewPR ? '🎉 New Personal Record! Amazing work!' : 'Workout logged successfully!'}
                </p>
                <p className="text-gray-300 text-sm">Redirecting to home...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center gap-3">
              <AlertCircle className="text-red-400" size={24} />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Exercise Name */}
            <div className="relative">
              <label className="block text-white mb-2">Exercise *</label>
              <input
                type="text"
                value={exercise}
                onChange={(e) => {
                  setExercise(e.target.value);
                  setShowExerciseDropdown(true);
                }}
                onFocus={() => setShowExerciseDropdown(true)}
                onBlur={() => setTimeout(() => setShowExerciseDropdown(false), 200)}
                className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                placeholder="e.g., Bench Press, Squat, Deadlift"
              />
              {showExerciseDropdown && filteredExercises.length > 0 && exercise && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1f1f1f] border border-[#404040] rounded-lg max-h-48 overflow-y-auto z-10 shadow-xl">
                  {filteredExercises.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => {
                        setExercise(ex);
                        setShowExerciseDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white hover:bg-[#4caeff] transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Weight, Sets, Reps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2">Weight (lbs) *</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                  placeholder="135"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Sets *</label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                  placeholder="3"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Reps *</label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors"
                  placeholder="10"
                  min="1"
                />
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="block text-white mb-2">Caption (optional)</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#4caeff] focus:outline-none transition-colors resize-none"
                placeholder="Share your thoughts about this workout..."
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePost}
              disabled={showSuccess}
              className="w-full bg-gradient-to-r from-[#4caeff] to-[#179AFF] text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {showSuccess ? 'Posted!' : 'Post Workout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
