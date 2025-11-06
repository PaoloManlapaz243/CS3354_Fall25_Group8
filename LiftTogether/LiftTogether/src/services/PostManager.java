package services;

import java.util.ArrayList;
import models.WorkoutPost;

public class PostManager {
    private final String[] exercises = {"Squat"}; // Should be expanded with more exercises
    private ArrayList<WorkoutPost> posts = new ArrayList<>(); // List of posts created by a single user

    public PostManager() { 
        posts.add(new WorkoutPost("Squat", 1, 1, 1, "example"));
    }

    public String createPost(String exercise, int sets, int reps, double weight, String caption) {
        if (!isValidExercise(exercise)) return "Invalid exercise";
        if (sets <= 0) return "Invalid number of sets.";
        if (reps <= 0) return "Invalid number of reps.";
        if (weight <= 0.0) return "Invalid weight.";

        posts.add(new WorkoutPost(exercise, sets, reps, weight, caption));
        return "Post created successfully.";
    }

    public boolean isValidExercise(String exercise) {
        for (String ex : exercises) {
            if (ex.equals(exercise)) {
                return true;
            }
        }

        return false;
    }

}
