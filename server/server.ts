import express from "express";
import cors from "cors";
import { Packer } from "docx";
import { DocumentCreator } from "./DocumentCreator.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/generate", async (req, res) => {
  const { name, city, skills, experience } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name and city are required" });
  }

  const doc = DocumentCreator(name, city, skills, experience);

  const buffer = await Packer.toBuffer(doc);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader("Content-Disposition", "attachment; filename=resume.docx");
  res.send(buffer);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
