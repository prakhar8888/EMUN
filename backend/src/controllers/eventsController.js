import prisma from "../lib/prisma.js";

// ======================================
// GET ALL EVENTS
// ======================================
export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Get Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ======================================
// GET SINGLE EVENT
// ======================================
export const getSingleEvent = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get Single Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};
