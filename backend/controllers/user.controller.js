import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL; // Get the admin email from environment variables
    const userId = req.userId; // Assuming you have the user ID stored in the request object after authentication
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    if (user.aiCredits == null && user.AiCradits != null) {
      user.aiCredits = user.AiCradits;
    }
    if (user.email === adminEmail && user.role !== "admin") {
      user.role = "admin";
    }
    if (user.isModified()) {
      await user.save();
    }
    res.status(200).json(user);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};