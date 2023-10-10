const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    contact:{
        type: Number,
        required: true
    },
    count:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    packageName: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
