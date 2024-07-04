import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user._id; //get the user id
    const { id: receiverId } = req.params;
    console.log(receiverId, "receiverId");

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      //if there is no such a conversation between these two users create one
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) return res.status(404).json([]);
    const messages = conversation.messages;

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};

export const getLatestMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("messages");

    // Extract latest message from each conversation
    const latestMessages = conversations.map((conversation) => {
      // Sort messages by timestamp in descending order
      conversation.messages.sort((a, b) => b.createdAt - a.createdAt);
      // Return the first message (latest message) or null if there are no messages
      return conversation.messages.length > 0 ? conversation.messages[0] : null;
    });

    res.status(200).json(latestMessages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get latest messages" });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const message = req.body.message;
    const newMessage = await Message.findOneAndUpdate(
      { _id },
      { message },
      { new: true }
    );
    res.status(200).json(newMessage);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: _id } = req.params
    const deletedMessage = await Message.findByIdAndDelete(_id)
   
    return res.json({
      deletedMessage
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}