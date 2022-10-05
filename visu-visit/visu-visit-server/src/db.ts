import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL as string);

mongoose.connection.on("open", () => {
  console.log("✅ DB Connected.");
});

mongoose.connection.once("error", (error) => {
  console.log("⛔️ DB Error Occurred.", error);
});
