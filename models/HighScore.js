import mongoose from "mongoose";

const HighScoreSchema = new mongoose.Schema({
    initials: {
        type: String,
        required: true
    },
    score: {
        type: Int,
        required: true
    } 
})

const HighScore = mongoose.model('highScore', HighScoreSchema);

export default HighScore;