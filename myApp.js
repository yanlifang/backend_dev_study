require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//let Person;
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  
  var ada = new Person({
    name: 'Adam',
    age: 37,
    favoriteFoods: ['Spagetti', 'seafood']
  });

  ada.save(function(err, data){
    if(err) return console.error(err);
    done(null, data)
  });
  
};

 var arrayOfPeople = [
    {name: "He Ming", age: 41, favoriteFoods:["Roast duck", "Noodles", "Cake"]},
    {name: "Lifang Yan", age: 40, favoriteFoods: ["Noodles", "Pineapple"]},
    {name: "Adam Li", age: 37, favoriteFoods: ["Spagetti", "Shrimp"]}
  ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people)
                {
                  if(err) return console.log(err);
                  done(null, people);
                });
 

};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound)
              {
                if(err) return console.log(err);
                done(null, personFound);
              });
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound)
              {
                if(err) return console.log(err);
                done(null, foodFound);
              });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, idFound)
                  {
                    if(err) return console.log(err);
                    done(null, idFound);
                  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person)=>{
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, 
                          {new: true}, (err, updatedDoc)=>{
                            if(err) return console.log(err);
                            done(null, updatedDoc);
    })
};


var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";




  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, docs) {
    //do something here
    done(null, docs);
  });
  
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
