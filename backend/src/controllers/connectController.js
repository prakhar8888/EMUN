import prisma from "../lib/prisma.js";

export const getConnectData = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Connect data fetched successfully",
      data: {
        email: "secretariat@enigmamun.org",
        phone: "+91 96969 04321",
        address: "Lucknow, Uttar Pradesh, India",

        socialLinks: {
          instagram: "https://www.instagram.com/enigmamun?igsh=MTJzb2M5d3FkdWZ5bA==",
          twitter: "https://x.com/EnigmaMUN",
          youtube: "#",
          whatsapp: "#",
        },
      },
    });
  } catch (error) {
    console.error("Get Connect Data Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch connect data",
    });
  }
};

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        designation: "Website Visitor",
        subject: subject || null,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message transmitted successfully. The Secretariat will respond shortly.",
      data: contact,
    });
  } catch (error) {
    console.error("Create Contact Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again.",
    });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get All Contact Messages Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contactId = Number(id);

    if (isNaN(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    await prisma.contact.delete({
      where: { id: contactId },
    });

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Message Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};
