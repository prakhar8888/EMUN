import prisma from "../lib/prisma.js";

// ======================================
// CREATE REGISTRATION
// ======================================

export const createRegistration = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const {
      chamberId,
      portfolio,
      experience,
      motivation,
    } = req.body;

    // ======================================
    // CHECK CHAMBER
    // ======================================

    const chamber =
      await prisma.chamber.findUnique({
        where: {
          id: Number(chamberId),
        },
      });

    if (!chamber) {
      return res.status(404).json({
        success: false,
        message: "Chamber not found",
      });
    }

    // ======================================
    // CHECK EXISTING REGISTRATION
    // ======================================

    const existingRegistration =
      await prisma.registration.findFirst({
        where: {
          userId,
          chamberId: Number(chamberId),
        },
      });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message:
          "You already registered for this chamber",
      });
    }

    // ======================================
    // CREATE REGISTRATION
    // ======================================

    const registration =
      await prisma.registration.create({
        data: {
          userId,

          chamberId: Number(chamberId),

          portfolio,

          experience,

          motivation,
        },
      });

    return res.status(201).json({
      success: true,

      message:
        "Registration submitted successfully",

      data: registration,
    });
  } catch (error) {
    console.error(
      "Create Registration Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create registration",
    });
  }
};

// ======================================
// GET MY REGISTRATIONS
// ======================================

export const getMyRegistrations =
  async (req, res) => {
    try {
      const userId = req.user.id;

      const registrations =
        await prisma.registration.findMany({
          where: {
            userId,
          },

          include: {
            chamber: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      return res.status(200).json({
        success: true,

        count: registrations.length,

        data: registrations,
      });
    } catch (error) {
      console.error(
        "Get My Registrations Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch registrations",
      });
    }
  };
