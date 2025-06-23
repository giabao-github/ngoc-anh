import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

/* 
  Error codes:
    INVALID_EMAIL
    PASSWORD_TOO_SHORT
    USER_ALREADY_EXISTS
    INVALID_EMAIL_OR_PASSWORD
    PROVIDER_NOT_FOUND
*/
