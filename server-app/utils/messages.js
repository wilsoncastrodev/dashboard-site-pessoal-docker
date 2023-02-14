export const errorMessage = (field, message) => {
    return {
        [field]: message,
    }
};

export const tokenMessage = (message, user, token) => {
    return {
        "message": message,
        "user": user,
        "token": token
    }
};
