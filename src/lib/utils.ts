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


const currentWorkWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0-6)

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to the start of the week (Monday)
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

    return startOfWeek;
}

export const adjustedScheduleToCurrentWeek = (lessons: { title: string; start: Date; end: Date; }[]) : { title: string; start: Date; end: Date; }[] => {
    const startOfWeek = currentWorkWeek();

    return lessons.map(lesson => {
        const lessonDayOfWeek = lesson.start.getDay();
        const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1; // Adjust for Sunday

        const adjustedStartDate = new Date(startOfWeek);
        adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
        adjustedStartDate.setHours(
            lesson.start.getHours(),
            lesson.start.getMinutes(),
            lesson.start.getSeconds(),
        );

        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedEndDate.setHours(adjustedStartDate.getHours() + 1); // Set end time to 1 hour after start time

        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate,
        };
    });
}