require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

// APP CONFIG
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ASYNC DB CONNECTION (Fixing Mongoose Errors)
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reminderAppDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}

connectDB(); // Call the database connection function

// SCHEMA & MODEL
const reminderSchema = new mongoose.Schema({
  reminderMsg: { type: String, required: true },
  remindAt: { type: Date, required: true }, // Changed to Date type for accuracy
  isReminded: { type: Boolean, default: false },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// WHATSAPP REMINDER FUNCTIONALITY
const sendWhatsAppReminder = async () => {
  try {
    const reminders = await Reminder.find({ isReminded: false });

    reminders.forEach(async (reminder) => {
      const now = new Date();
      if (new Date(reminder.remindAt) <= now) {
        // Mark as reminded
        await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });

        // Send WhatsApp Message
        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        await client.messages.create({
          body: `Reminder: ${reminder.reminderMsg}`,
          from: "whatsapp:+14155238886",
          to: "whatsapp:+917987122703", // Replace with user's number
        });

        console.log(`📢 WhatsApp reminder sent: ${reminder.reminderMsg}`);
      }
    });
  } catch (error) {
    console.error("❌ Error in sending WhatsApp reminders:", error);
  }
};

// RUN REMINDER CHECK EVERY 60 SECONDS
setInterval(sendWhatsAppReminder, 60000);

// API ROUTES

// Get all reminders
app.get("/getAllReminder", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// Add a new reminder
app.post("/addReminder", async (req, res) => {
  try {
    const { reminderMsg, remindAt } = req.body;
    if (!reminderMsg || !remindAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReminder = new Reminder({
      reminderMsg,
      remindAt: new Date(remindAt), // Convert to Date object
    });
    await newReminder.save();

    const reminders = await Reminder.find();
    res.status(201).json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

// Delete a reminder
app.post("/deleteReminder", async (req, res) => {
  try {
    const { id } = req.body;
    await Reminder.findByIdAndDelete(id);

    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Reminder App! 🚀");
});

// START SERVER
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
