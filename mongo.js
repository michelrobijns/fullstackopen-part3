const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('Please provide the name and number as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.fewyp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

// Define the schema for a person and the matching model
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (name) {
  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })

    console.log('closing')
    mongoose.connection.close()
    console.log('done closing')
  })
}
