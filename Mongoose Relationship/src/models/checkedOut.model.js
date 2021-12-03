const mongoose = require('mongoose');

const checkedOutSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    user: {type: String, required: true},
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('checkedOut', checkedOutSchema);