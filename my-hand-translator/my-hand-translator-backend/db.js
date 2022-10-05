const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST);

const db = mongoose.connection;

db.on("error", (error) => console.error("⛔ Connection Error:", error));
db.once("open", () => console.log("✅ DB Connected."));
