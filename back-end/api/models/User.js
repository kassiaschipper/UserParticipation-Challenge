const { model, schema } = require('mongoose');

const userSchema = new Schema ({
    name: String,
    lastName: String, 
    participation: Number, 
    createdAt: String,
});

module.exports = model('User', userSchema);