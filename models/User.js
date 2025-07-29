const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    age: {
        type: Number,
        min: [0, 'Age must be positive'],
        max: [120, 'Age must be realistic']
    },
    city: {
        type: String,
        trim: true,
        maxlength: [30, 'City name cannot exceed 30 charcters']
    }
}, {
    timestamp: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);