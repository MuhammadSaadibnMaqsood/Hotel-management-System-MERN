import User from "../models/user.js";

export const protect = async (req, res, next) => {
    const { userId } = req.auth;

    if (!userId) {
        return res.status(401).json({ success: false, message: "User is not authorized" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in DB" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protect middleware:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
