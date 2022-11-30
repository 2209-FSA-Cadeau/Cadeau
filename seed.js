const { db, models: {User, Recipient, Preference, Gift, Note, Holiday, Comment} } = require('./db')

function createIdentifier(info) {
    if(info === "date"){
        return "2012-11-29"
    }

    if(info === "decimal"){
        return 0.60
    }

    if(info === "number"){
        return 3
    }

    if(info === "preference"){
        const num = Math.floor(Math.random() * (2 - 1 + 1) + 1)
        if(num === 1){
            return "like"
        } else if (num === 2){
            return "dislike"
        }
    }

    let identifier = "";
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    for (let i = 0; i < 17; i++) {
        if(info === "name" && i === 5 || info === "occupation" && i === 5){
            return identifier
        } else if (info === "email" && i === 5){
            identifier += "@gmail.com"
            return identifier
        } else if (info == "holiday" && i === 5){
            identifier += " day"
            return identifier
        }
        const randomnum = Math.floor(Math.random() * (25 - 0 + 1));
        identifier += alphabet[randomnum];
    }
    return identifier;
}

const users = []
for(let i = 0; i < 50; i++){
    users.push({
        identifier: createIdentifier()
    })
}

const recipients = []
for(let i = 0; i < 100; i++){
    recipients.push({
        name: createIdentifier("name"),
        email: createIdentifier("email"),
        birthday: createIdentifier("date"),
        occupation: createIdentifier("occupation")
    })
}

const gifts = []
for(let i = 0; i < 50; i++){
    gifts.push({
        name: createIdentifier("name"),
        description: createIdentifier(),
        imageUrl: createIdentifier(),
        price: createIdentifier("decimal"),
        link: createIdentifier(),
        rating: createIdentifier("number"),
    })
}

const preferences = []
for(let i = 0; i < 200; i++){
    preferences.push({
        preference: createIdentifier("preference"), 
        category: createIdentifier("name")
    })
}

const holidays = []
for(let i = 0; i < 50; i++){
    holidays.push({
        name: createIdentifier("holiday"),
        date: createIdentifier("date")
    })
}

async function seed(){
    await db.sync({force: true})

    //Create dummy users
    await Promise.all(users.map(user => User.create(user)))

    //Create dummy recipients
    await Promise.all(recipients.map(recipient => Recipient.create(recipient)))

    //Create dummy gifts
    await Promise.all(gifts.map(gift => Gift.create(gift)))

    //Create dummy preferences
    await Promise.all(preferences.map(preference => Preference.create(preference)))

    //Create dummy holidays
    await Promise.all(holidays.map(holiday => Holiday.create(holiday)))

    //Join users and recipients -> each user has two recipients
    const allRecipients = await Recipient.findAll()
    const userRecipJoinTable = []
    let index = 1
    let counter = 0
    for(let i = 0; i < allRecipients.length; i++){
        userRecipJoinTable.push(allRecipients[i].addUser(index))
        counter++
        if(counter % 2 === 0){
            index++
        }
    }
    await Promise.all(userRecipJoinTable)

    //Join recipients and preferences -> each recipient has two preferences
    const allPreferences = await Preference.findAll()
    index = 1
    counter = 0
    const setPrefToRecip = []
    for(let i = 0; i < allPreferences.length; i++){
        setPrefToRecip.push(allPreferences[i].setRecipient(index))
        counter++
        if(counter % 2 === 0){
            index++
        }
    }
    await Promise.all(setPrefToRecip)

    //Join recipients and gifts -> each recipient has two gifts
    await Promise.all(allRecipients.map(recipient => {
        const id = Math.floor(Math.random() * (50 - 1 + 1) + 1)
        return recipient.addGift(id)
    }))

    //Join recipients and holidays -> each recipient is paired with a random holiday - duplicates can occur
    await Promise.all(allRecipients.map(recipient => {
        const id = Math.floor(Math.random() * (100 - 1 + 1) + 1)
        return recipient.setHolidays(id)
    }))


    console.log("seed was successful!!!")
}

seed()