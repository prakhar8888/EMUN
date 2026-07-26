import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { sendRegistrationEmail, sendConfirmationEmail } from "../services/emailService.js";

// ======================================
// PUBLIC DELEGATE REGISTRATION (NEW)
// ======================================
export const createPublicRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      university,
      chamberId,
      portfolio,
      experience,
      motivation,
    } = req.body;

    // 1. CHECK IF CHAMBER EXISTS
    const chamber = await prisma.chamber.findUnique({
      where: {
        id: Number(chamberId),
      },
    });

    if (!chamber) {
      return res.status(404).json({
        success: false,
        message: "Committee not found",
      });
    }

    // 2. FIND OR CREATE THE DELEGATE USER IN THE BACKGROUND
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Generate a strong random password since they will never log in
      const randomString = Math.random().toString(36).slice(-10) + Date.now().toString();
      const hashedPassword = await bcrypt.hash(randomString, 10);

      user = await prisma.user.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          password: hashedPassword,
          university: university || null,
          role: "DELEGATE",
        },
      });
    } else {
      // Returning email: always refresh their details to match this
      // latest submission, since a delegate may re-register under the
      // same email for a different committee with updated information.
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          fullName: fullName || user.fullName,
          university: university || user.university,
          phone: phone || user.phone,
        },
      });
    }

    // 3. CHECK FOR EXISTING REGISTRATION (same email + same committee)
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId: user.id,
        chamberId: Number(chamberId),
      },
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "This email address has already been registered for this committee.",
      });
    }

    // 4. CREATE THE REGISTRATION
    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        chamberId: Number(chamberId),
        portfolio,
        experience,
        motivation,
      },
      include: {
        chamber: {
          select: { name: true },
        },
      },
    });

    // 5. SEND CONFIRMATION EMAIL (does not block the response either way)
    const emailResult = await sendConfirmationEmail(
      user.email,
      user.fullName,
      chamber.name
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: registration,
      emailSent: emailResult.emailSent,
      emailWarning: emailResult.emailSent ? null : emailResult.warning,
    });
  } catch (error) {
    console.error("Public Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit application. Please try again.",
    });
  }
};

// ======================================
// CREATE REGISTRATION (LEGACY PROTECTED)
// ======================================
export const createRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      chamberId,
      portfolio,
      experience,
      motivation,
    } = req.body;

    const chamber = await prisma.chamber.findUnique({
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

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId,
        chamberId: Number(chamberId),
      },
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You already registered for this chamber",
      });
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        chamberId: Number(chamberId),
        portfolio,
        experience,
        motivation,
      },
      include: {
        chamber: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration created successfully",
      data: registration,
    });
  } catch (error) {
    console.error("Create Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create registration",
    });
  }
};

// ======================================
// GET MY REGISTRATIONS
// ======================================
export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;
    const registrations = await prisma.registration.findMany({
      where: {
        userId,
      },
      include: {
        chamber: {
          select: {
            id: true,
            name: true,
            slug: true,
            iconUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Get My Registrations Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};

// ======================================
// GET ALL REGISTRATIONS (ADMIN)
// ======================================
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            university: true,
            country: true,
          },
        },
        chamber: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
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
    console.error("Get All Registrations Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all registrations",
    });
  }
};

// ======================================
// UPDATE REGISTRATION STATUS (ADMIN)
// ======================================
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const existing = await prisma.registration.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    const updated = await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        chamber: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const emailResult = await sendRegistrationEmail(
      updated.user.email,
      updated.user.fullName,
      updated.status,
      updated.chamber.name
    );

    return res.status(200).json({
      success: true,
      message: `Registration ${status.toLowerCase()} successfully`,
      data: updated,
      emailSent: emailResult.emailSent,
      emailWarning: emailResult.emailSent ? null : emailResult.warning,
    });
  } catch (error) {
    console.error("Update Registration Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update registration status",
    });
  }
};
