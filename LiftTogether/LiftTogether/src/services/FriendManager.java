package services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import models.User;

public class FriendManager {
    private ArrayList<String> friends = new ArrayList<>();

    public FriendManager() {
        friends.add("friend@gmail.com");
    }

    public String addFriend(String email) {
        if (!AuthValidator.isValidEmail(email)) {
            return "Please enter a valid user email.";
        }

        friends.add(email);
        return "Successfully added friend.";
    }

    public String removeFriend(String email) {
        for (String friend : friends) {
            if (friend.equals(email)) {
                friends.remove(email);
                return "Sucessfully removed friend.";
            }
        }

        return "Could not find friend to remove.";
    }
}
