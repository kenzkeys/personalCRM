import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Get all contacts
app.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany({ include: { interactions: true } });
  res.json(contacts);
});

// Add a contact
app.post("/contacts", async (req, res) => {
  const { name, email, phone, notes } = req.body;
  const contact = await prisma.contact.create({
    data: { name, email, phone, notes, userId: 1 }
  });
  res.json(contact);
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
