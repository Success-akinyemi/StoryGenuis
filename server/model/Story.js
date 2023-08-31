import mongoose from "mongoose";


export const StorySchema = new mongoose.Schema({
    story: {
        type: String, 
    },
    email: {
        type: String
    }
},
{minimize: false}
);

const StoryModel =  mongoose.model('storyGenuisStory', StorySchema);
export default StoryModel