import { db } from "@/utils/db";

export default async function handler(req, res) {
  // Public
  if (req.method === "POST") {
    const { content } = req.body;

    try {
      if (!content) {
        return res.status(400).json({ error: "Message content is required" });
      }
      const newMessage = await db.message.create({
        data: {
          content,
        },
      });
      res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
  // Admin
  else if (req.method === "GET") {
    try {
      const messages = await db.message.findMany();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Server Error" });
    }
  }
  // Admin
  else if (req.method === "DELETE") {
    try {
      await prisma.messages.deleteMany({});
      res.status(200).json({ success: true, message: "All messages deleted successfully" });
    } catch (error) {
      console.error("Error deleting messages:", error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
