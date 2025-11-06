import services.FriendManager;
import services.LoginManager;
import services.PostManager;

public class Main {
    public static void main(String[] args) {
        LoginManager manager = new LoginManager();
        PostManager pm = new PostManager();
                FriendManager fm = new FriendManager();

       /*  System.out.println(manager.login("previousUser@gmail.com", "GeorgeWashington1"));  // Valid
        System.out.println(manager.login("previousUser@gmail.com", "alexham"));      // Invalid
        System.out.println(manager.login("previousUser@gmail.com", "AlexHamburger"));      // Invalid
        System.out.println(manager.login("previousUser@gmail.com", "AlexHam1"));      // Invalid
        System.out.println(manager.login("PreviousUser@gwagon.car", "hford"));      // Invalid
        System.out.println(manager.logout("previousUser@gmail.com"));                  // Logout
        System.out.println(manager.logout("john.doe@gmail.com"));                  // already logged out


        System.out.println(pm.createPost("Squat", 3, 12, 135.0, "Live, laugh, love"));
        System.out.println(pm.createPost("Bench Press", 3, 12, 135.0, "Live, laugh, love"));
        System.out.println(pm.createPost("Squat", -3, 12, 135.0, "Live, laugh, love"));
        System.out.println(pm.createPost("Squat", 3, -12, 135.0, "Live, laugh, love"));
        System.out.println(pm.createPost("Squat", 3, 12, -135.0, "Live, laugh, love"));


    */

        // new part using asserts
         // 1. Valid login
        String result1 = manager.login("previousUser@gmail.com", "GeorgeWashington1");
        assert result1.equals("Login successful. Welcome, previousUser@gmail.com!") : "Test 1 failed";

        // 2. Missing capital letter
        String result2 = manager.login("previousUser@gmail.com", "alexham");
        assert result2.equals("Password does not meet requirements.") 
            : "Test 2 failed";

        // 3. Missing number
        String result3 = manager.login("previousUser@gmail.com", "AlexHamburger");
        assert result3.equals("Password does not meet requirements.") 
            : "Test 3 failed";

        // 4. Too short
        String result4 = manager.login("previousUser@gmail.com", "AlexHam1");
        assert result4.equals("Password does not meet requirements.") 
            : "Test 4 failed";

        // 5. Invalid email
        String result5 = manager.login("PreviousUser@gwagon.car", "GeorgeWashington1");
        assert result5.equals("Email not found.") 
            : "Test 5 failed";

        // 6. New user
        String result6 = manager.login("NewUser@gmail.com", "GeorgeWashington1");
        assert result6.equals("Email not found.") 
            : "Test 6 failed";

        // 7. Log Out
        String result7 = manager.logout("previousUser@gmail.com");
        assert result7.equals("Logout successful. Goodbye, previousUser@gmail.com.") 
            : "Test 7 failed";
        
             // 7. Already Logged out
        String result8 = manager.logout("previousUser@gmail.com");
        assert result8.equals("User is not logged in.") 
            : "Test 8 failed";

        

        System.out.println("All login tests passed successfully!");

          // 1. Valid input — all fields valid
        String workoutResult1 = pm.createPost("Squat", 3, 12, 135, "Live, laugh, love");
        assert workoutResult1.equals("Post created successfully.") : "Workout Test 1 failed";

        // 2. Invalid exercise name
        String workoutResult2 = pm.createPost("Bench Press", 3, 12, 135, "Live, laugh, love");
        assert workoutResult2.equals("Invalid exercise") : "Workout Test 2 failed"+workoutResult2;

        // 3. Sets negative
        String workoutResult3 = pm.createPost("Squat", -2, 20, -100, "Live, laugh, love");
        assert workoutResult3.equals("Invalid number of sets.") : "Workout Test 3 failed";

        // 4. Missing reps
        String workoutResult4 = pm.createPost("Squat", 3, 0, -100, "Live, laugh, love");
        assert workoutResult4.equals("Invalid number of reps.") : "Workout Test 4 failed";

          // 5. Sets is negative
        String workoutResult5 = pm.createPost("Squat", -3, 12, -100, "Live, laugh, love");
        assert workoutResult5.equals("Invalid number of sets.") : "Workout Test 5 failed";

        // 6. Weight is missing or invalid
        String workoutResult6 = pm.createPost("Squat", 3, 12, 0, "Live, laugh, love");
        assert workoutResult6.equals("Invalid weight.") : "Workout Test 6 failed";


        // 7. Weight is negative
        String workoutResult7 = pm.createPost("Squat", 3, 12, -12, "Live, laugh, love");
        assert workoutResult7.equals("Invalid weight.") : "Workout Test 7 failed";

        System.out.println("All createPost tests passed successfully!");


        // 1. Friend Added
         String friendResult1 = fm.addFriend("abc123@gmail.com");
        assert friendResult1.equals("Successfully added friend.") : "Friend Test 1 failed";

         // 2. Friend Removed
         String friendResult2 = fm.removeFriend("abc123@gmail.com");
        assert friendResult2.equals("Sucessfully removed friend.") : "Friend Test 2 failed";

         // 3. Couldnt find friend to remove
         String friendResult3 = fm.removeFriend("abc123@gmail.com");
        assert friendResult3.equals("Could not find friend to remove.") : "Friend Test 3 failed";

        System.out.println("All friend tests passed successfully");
    }
}
