const JWT_SECRET =
  process.env.JWT_SECRET || "kjfsjoiwrjfajklfkvnfjkfwiaosjdfnjkdnfklajsdfhehwi";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/userAuth";

module.exports = {
  JWT_SECRET,
  MONGO_URI,
};
