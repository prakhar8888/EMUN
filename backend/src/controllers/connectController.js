export const getConnectData = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Connect data fetched successfully",
      data: {
        email: "contact@munsphere.com",
        phone: "+91 9876543210",
        address: "Lucknow, Uttar Pradesh, India",

        socialLinks: {
          instagram: "https://instagram.com/munsphere",
          linkedin: "https://linkedin.com/company/munsphere",
          github: "https://github.com/munsphere",
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
