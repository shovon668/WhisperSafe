
import connectDB from '../../../utils/db';
import Message from '../../../models/Message';

connectDB();

export default async function handler(req, res) {
 
  const secretToken = process.env.NEXT_PUBLIC_API_SECRET_TOKEN;

  if (req.method === 'POST') {
    const { content } = req.body;

    try {
      if (!content) {
        return res.status(400).json({ error: 'Message content is required' });
      }

     
      const token = req.headers.authorization;
      if (!token || token !== `Bearer ${secretToken}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const newMessage = new Message({ content });
      await newMessage.save();
      res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
     
      const token = req.headers.authorization;
      if (!token || token !== `Bearer ${secretToken}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const messages = await Message.find().sort({ timestamp: -1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
     
      const token = req.headers.authorization;
      if (!token || token !== `Bearer ${secretToken}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

     
      await Message.deleteMany({});
      res.status(200).json({ success: true, message: 'All messages deleted successfully' });
    } catch (error) {
      console.error('Error deleting messages:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
