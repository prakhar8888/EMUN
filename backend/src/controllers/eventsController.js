import prisma from "../lib/prisma.js";

// ======================================
// GET ALL EVENTS
// ======================================
export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: "asc",
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

// ======================================
// CREATE EVENT
// ======================================
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      location,
      highlight,
      startDate,
      endDate,
      bannerUrl,
      isPublished,
    } = req.body;

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    const existingEvent = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    if (existingEvent) {
      return res.status(409).json({
        success: false,
        message: "An event with this slug already exists",
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        location,
        highlight: highlight || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        bannerUrl: bannerUrl || null,
        isPublished: isPublished ?? true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// ======================================
// UPDATE EVENT
// ======================================
export const updateEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (req.body.slug) {
      const duplicateSlug = await prisma.event.findFirst({
        where: {
          slug: req.body.slug,
          NOT: {
            id: eventId,
          },
        },
      });

      if (duplicateSlug) {
        return res.status(409).json({
          success: false,
          message: "Slug already in use",
        });
      }
    }

    const finalStartDate = req.body.startDate
      ? new Date(req.body.startDate)
      : existingEvent.startDate;

    const finalEndDate = req.body.endDate
      ? new Date(req.body.endDate)
      : existingEvent.endDate;

    if (finalEndDate <= finalStartDate) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...req.body,
        startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// ======================================
// DELETE EVENT
// ======================================
export const deleteEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};
