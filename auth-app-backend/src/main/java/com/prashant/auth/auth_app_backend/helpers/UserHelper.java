package com.prashant.auth.auth_app_backend.helpers;

import java.util.UUID;

public class UserHelper {

    public static UUID parseUUID(String id){
        return UUID.fromString(id);
    }
}
