export const getFoundationData =
  async (req, res) => {

    try {

      const founders = [

        {
          id: 1,

          name:
            "Aarav Mehta",

          title:
            "Secretary General",

          bio:
            "A visionary leader dedicated to building globally aware student communities through diplomacy, debate, and international collaboration.",

          specialty:
            "Global Diplomacy",

          contact:
            "aarav@munsphere.org",

          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        },

        {
          id: 2,

          name:
            "Sophia Williams",

          title:
            "Director General",

          bio:
            "Focused on operational excellence, strategic planning, and delivering world-class MUN experiences for delegates worldwide.",

          specialty:
            "Strategic Leadership",

          contact:
            "sophia@munsphere.org",

          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },

        {
          id: 3,

          name:
            "Daniel Kim",

          title:
            "Head of International Relations",

          bio:
            "Passionate about youth engagement, geopolitical dialogue, and fostering cross-cultural understanding through academic diplomacy.",

          specialty:
            "International Relations",

          contact:
            "daniel@munsphere.org",

          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        },
      ];


      return res.status(200).json({

        success: true,

        message:
          "Foundation members fetched successfully",

        data: founders,
      });

    } catch (error) {

      console.error(
        "Get Foundation Data Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch foundation data",
      });
    }
  };
