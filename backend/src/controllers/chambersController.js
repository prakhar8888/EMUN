import prisma from "../lib/prisma.js";
import { uploadPdfToCloudinary } from "../services/pdfService.js";

// ======================================
// CREATE CHAMBER
// ======================================
export const createChamber = async (req, res) => {
  try {
    const {
      name,
      slug,
      agenda,
      description,
      iconUrl,
      isPublished,
    } = req.body;

    const existingChamber = await prisma.chamber.findUnique({
      where: { slug },
    });

    if (existingChamber) {
      return res.status(409).json({
        success: false,
        message: "Chamber with this slug already exists",
      });
    }

    let backgroundGuideUrl = null;

    if (req.file) {
      backgroundGuideUrl = await uploadPdfToCloudinary(
        req.file.path
      );
    }

    const chamber = await prisma.chamber.create({
      data: {
        name,
        slug,
        agenda,
        description,
        iconUrl,
        backgroundGuideUrl,
        isPublished:
          isPublished === undefined
            ? true
            : isPublished,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Chamber created successfully",
      data: chamber,
    });
  } catch (error) {
    console.error("Create Chamber Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create chamber",
    });
  }
};

// ======================================
// GET ALL CHAMBERS
// ======================================
export const getAllChambers = async (req, res) => {
  try {
    const chambers = await prisma.chamber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: chambers.length,
      data: chambers,
    });
  } catch (error) {
    console.error("Get Chambers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chambers",
    });
  }
};

// ======================================
// GET SINGLE CHAMBER
// ======================================
export const getSingleChamber = async (req, res) => {
  try {
    const { slug } = req.params;

    const chamber = await prisma.chamber.findUnique({
      where: {
        slug,
      },
    });

    if (!chamber) {
      return res.status(404).json({
        success: false,
        message: "Chamber not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: chamber,
    });
  } catch (error) {
    console.error("Get Single Chamber Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chamber",
    });
  }
};

// ======================================
// UPDATE CHAMBER
// ======================================
export const updateChamber = async (req, res) => {
  try {
    const { id } = req.params;

    const chamberId = Number(id);

    if (isNaN(chamberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chamber ID",
      });
    }

    const {
      name,
      slug,
      agenda,
      description,
      iconUrl,
      isPublished,
    } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (agenda !== undefined) updateData.agenda = agenda;
    if (description !== undefined)
      updateData.description = description;
    if (iconUrl !== undefined)
      updateData.iconUrl = iconUrl;
    if (isPublished !== undefined)
      updateData.isPublished = isPublished;

    if (req.file) {
      updateData.backgroundGuideUrl =
        await uploadPdfToCloudinary(req.file.path);
    }

    const updatedChamber =
      await prisma.chamber.update({
        where: {
          id: chamberId,
        },
        data: updateData,
      });

    return res.status(200).json({
      success: true,
      message: "Chamber updated successfully",
      data: updatedChamber,
    });
  } catch (error) {
    console.error("Update Chamber Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update chamber",
    });
  }
};

// ======================================
// DELETE CHAMBER
// ======================================
export const deleteChamber = async (req, res) => {
  try {
    const { id } = req.params;

    const chamberId = Number(id);

    if (isNaN(chamberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chamber ID",
      });
    }

    await prisma.chamber.delete({
      where: {
        id: chamberId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Chamber deleted successfully",
    });
  } catch (error) {
    console.error("Delete Chamber Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete chamber",
    });
  }
};
