const mongoose = require('mongoose');

// Criar tabelas
const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person