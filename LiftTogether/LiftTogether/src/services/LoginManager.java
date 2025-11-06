package services;

import java.util.HashMap;
import java.util.Map;
import models.User;

public class LoginManager {
    // sample database
    private Map<String, User> users = new HashMap<>();

    public LoginManager() {
        // example of stored users
        users.put("previousUser@gmail.com", new User("previousUser@gmail.com", "GeorgeWashington1"));
    }



    // log in 
    public String login(String email, String password) {
        if (!AuthValidator.isValidEmail(email)) {
            return "Invalid email format.";
        }

        if (!AuthValidator.isValidPassword(password)) {
            return "Password does not meet requirements.";
        }

        User user = users.get(email);
        if (user == null) {
            return "Email not found.";
        }

        if (!user.getPassword().equals(password)) {
            return "Incorrect password.";
        }

        user.setLoggedIn(true);
        return "Login successful. Welcome, " + email + "!";
    }

    // log out
    public String logout(String email) {
        User user = users.get(email);

        if (user == null) {
            return "User not found.";
        }

        if (!user.isLoggedIn()) {
            return "User is not logged in.";
        }

        user.setLoggedIn(false);
        return "Logout successful. Goodbye, " + email + ".";
    }
}


