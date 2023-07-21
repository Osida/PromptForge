import mongoose from "mongoose";
import {userSchema} from "@/lib/mongodb/models/user";
import {promptSchema} from "@/lib/mongodb/models/prompt";

// Check if 'User' model is already compiled, if not, compile it
// This prevents OverwriteModelError which occurs when a model is compiled more than once.
if (!mongoose.models.User) {
    mongoose.model("User", userSchema);
}
const User = mongoose.models.User;

if (!mongoose.models.Prompt) {
    mongoose.model("Prompt", promptSchema);
}
const Prompt = mongoose.models.Prompt;


export {User, Prompt};