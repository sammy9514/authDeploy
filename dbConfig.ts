import { connect } from "mongoose";

const url =
  "mongodb+srv://sammy2422:sammy2422@cluster0.2imvkra.mongodb.net/stateMan?retryWrites=true&w=majority";
export const mainConnection = async () => {
  try {
    await connect(url).then(() => {
      console.log("db is connected");
    });
  } catch (error) {
    console.log(error);
  }
};
