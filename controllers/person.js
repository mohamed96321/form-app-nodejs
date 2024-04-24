const Person = require('../models/person');

exports.postPerson = async (req, res) => {
  const { name, nationalityId, birthDate } = req.body;

  const existingPerson = await Person.findOne({ where: { nationalityId } });
  
  if (existingPerson) {
    return res.render('form', { message: 'This nationality ID is already exists. Please enter your own ID.' });
  }

   // Check if nationalityId contains exactly 14 numbers
   if (!/^\d{14}$/.test(nationalityId)) {
    return res.render('form', { message: "Nationality ID must contain 14 numbers." });
  }

  // Ensure birthDate is not in the future
  const currentDate = new Date();
  if (new Date(birthDate) > currentDate) {
    return res.render('form', { message: "Future birth date is not possible." });
  }

  // Calculate age based on birthDate and current date
  const age = calculateAge(new Date(birthDate), currentDate);


  Person.create({
    name,
    age,
    nationalityId,
    birthDate
  })
  .then(() => {
    res.redirect('/person/get-persons'); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error'); 
  });
};

// Helper function to calculate age
function calculateAge(birthDate, currentDate) {
  const birth = new Date(birthDate);
  let age = currentDate.getFullYear() - birth.getFullYear();
  const m = currentDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

exports.addPerson = (req, res) => {
  res.render('form', { message: null });
};

exports.getPersons = (req, res, next) => {
  Person.findAll()
    .then(persons => {
      res.render('list-of-data', {
        persons,
        path: '/person/get-persons'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
