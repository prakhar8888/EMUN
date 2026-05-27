import prisma from "../lib/prisma.js";

// ======================================
// SUBMIT FEEDBACK
// ======================================
export const submitFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    console.error("Submit Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
    });
  }
};

// ======================================
// GET ALL FEEDBACKS
// ======================================
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Get Feedbacks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch feedbacks",
    });
  }
};
