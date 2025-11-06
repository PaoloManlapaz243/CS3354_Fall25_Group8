package models;

public class WorkoutPost {
    private String exercise;
    private int sets;
    private int reps;
    private double weight;
    private String caption;

    public WorkoutPost(String exercise, int sets, int reps, double weight, String caption) {
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.caption = caption;
    }

}
