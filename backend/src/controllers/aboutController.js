export const getAboutData = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "About data fetched successfully",
      data: {
        title: "About MUNSphere",
        description:
          "MUNSphere is a modern Model United Nations platform focused on diplomacy, leadership, collaboration, and global discussions.",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch about data",
      error: error.message,
    });
  }
};
