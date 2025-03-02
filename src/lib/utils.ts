import { auth } from "@clerk/nextjs/server";

const getRole = async () => {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata as { role?: string })?.role;
};

// Call auth() to get the userId
const currentUserId = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User ID is not available"); // Handle the null case
    }
    return userId; // Return the userId
};

export { getRole, currentUserId }; // Export both functions