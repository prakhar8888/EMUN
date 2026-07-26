export const getFoundationData =
  async (req, res) => {

    try {

      const founders = [

        {
          id: 1,

          name:
            "Anaadi Shukla",

          title:
            "Secretary General",

          bio:
            "Leading the Secretariat with a vision for elevating Enigma MUN into a premier platform for diplomacy, leadership, and global collaboration.",

          specialty:
            "Global Diplomacy",

          contact:
            "anaadi@enigmamun.org",

          image:
            "/anaadi.jpeg",
        },

        {
          id: 2,

          name:
            "Addhyan Yadav",

          title:
            "Under Secretary General – Delegate Affairs",

          bio:
            "Overseeing delegate experience, registrations, and engagement to ensure every participant feels supported throughout their Enigma MUN journey.",

          specialty:
            "Delegate Experience",

          contact:
            "addhyan@enigmamun.org",

          image:
            "/Addhyan.jpeg",
        },

        {
          id: 3,

          name:
            "Ridhika Koti",

          title:
            "Under Secretary General – Academics",

          bio:
            "Responsible for the academic rigor of committee background guides and ensuring authentic, well-researched procedural standards.",

          specialty:
            "Academic Affairs",

          contact:
            "ridhika@enigmamun.org",

          image:
            "/G.ridhika.png",
        },

        {
          id: 4,

          name:
            "Prakhar Gupta",

          title:
            "Technical Secretary",

          bio:
            "Building and maintaining the digital infrastructure that powers Enigma MUN, from registration systems to live conference operations.",

          specialty:
            "Technical Operations",

          contact:
            "prakhar@enigmamun.org",

          image:
            "/Prakhar.jpeg",
        },

        {
          id: 5,

          name:
            "Samvart Madhukar",

          title:
            "Under Secretary General – Academics",

          bio:
            "Supporting the Academics team in shaping agendas and committee structures that challenge and inspire every delegate.",

          specialty:
            "Academic Affairs",

          contact:
            "samvart@enigmamun.org",

          image:
            "/Samvart.jpeg",
        },

        {
          id: 6,

          name:
            "Vansh Sen",

          title:
            "Under Secretary General – Operations",

          bio:
            "Coordinating the logistics and on-ground operations that bring every Enigma MUN conference to life, seamlessly and on schedule.",

          specialty:
            "Operations & Logistics",

          contact:
            "vansh@enigmamun.org",

          image:
            "/Vansh.jpeg",
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
