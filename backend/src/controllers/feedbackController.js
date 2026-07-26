import prisma from "../lib/prisma.js";

// ======================================
// SUBMIT FEEDBACK (Public Route)
// ======================================
export const submitFeedback = async (req, res) => {
  try {
    const { fullName, email, message, rating } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        fullName,
        email,
        message,
        rating: rating !== undefined ? Number(rating) : null,
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
// GET ALL FEEDBACKS (Admin Route)
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

// ======================================
// UPDATE FEEDBACK STATUS (Admin Route)
// ======================================
export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status field is required",
      });
    }

    const feedbackId = Number(id);

    if (isNaN(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback ID",
      });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { status: status },
    });

    return res.status(200).json({
      success: true,
      message: "Feedback status updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    console.error("Update Feedback Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update feedback status",
    });
  }
};

// ======================================
// DELETE FEEDBACK (Admin Route)
// ======================================
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedbackId = Number(id);

    if (isNaN(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback ID",
      });
    }

    await prisma.feedback.delete({
      where: { id: feedbackId },
    });

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete feedback",
    });
  }
};
