const mongoose = require("mongoose");
const User = require("./models/User");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/exemple-mongoose");

  console.log("Connexion ok");

  const user1 = new User({
    email: "jean@example.org",
    firstname: "Jean",
    lastname: "Bon",
    age: 30,
  });
  console.log(user1)
  await user1.save();

  const user2 = await User.create({
    email: "alice@example.org",
    firstname: "Alice",
    age: 25,
  })
}

mongoose.disconnect();

main();
