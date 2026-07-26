import pkg from "../backend/node_modules/@prisma/client/index.js";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// ======================================
// DATABASE SEED FUNCTION
// ======================================

const seedDatabase = async () => {
  try {
    console.log(
      "🌱 Seed process initialized..."
    );

    // ======================================
    // CLEAR EXISTING DATA
    // ======================================

    await prisma.registration.deleteMany();

    await prisma.feedback.deleteMany();

    await prisma.contact.deleteMany();

    await prisma.about.deleteMany();

    await prisma.event.deleteMany();

    await prisma.foundationMember.deleteMany();

    await prisma.chamber.deleteMany();

    await prisma.user.deleteMany();

    console.log(
      "🧹 Existing data cleared"
    );

    // ======================================
    // ABOUT SECTION
    // ======================================

    await prisma.about.create({
      data: {
        title: "About EnigmaMUN",

        content:
          "EnigmaMUN is a next-generation Model United Nations platform focused on diplomacy, leadership, international relations, and impactful debate experiences.",
      },
    });

    console.log(
      "✅ About section seeded"
    );

    // ======================================
    // FOUNDATION MEMBERS
    // ======================================

    await prisma.foundationMember.createMany({
      data: [
        {
          fullName: "Prakhar Sharma",

          role:
            "Founder & Secretary General",

          imageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

          bio:
            "Cybersecurity enthusiast building a next-generation MUN platform.",

          email:
            "prakhar@enigmamun.com",

          linkedinUrl:
            "https://linkedin.com/in/prakhar",

          websiteUrl:
            "https://enigmamun.com",
        },

        {
          fullName: "Aarav Mehta",

          role: "Director General",

          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

          bio:
            "Passionate about diplomacy and global leadership.",

          email:
            "aarav@enigmamun.com",

          linkedinUrl:
            "https://linkedin.com/in/aarav",
        },
      ],
    });

    console.log(
      "✅ Foundation members seeded"
    );

    // ======================================
    // EVENTS
    // ======================================

    await prisma.event.createMany({
      data: [
        {
          title: "EnigmaMUN 2026",

          slug: "enigmamun-2026",

          description:
            "Flagship international MUN conference with delegates from around the globe.",

          location:
            "Lucknow, India",

          startDate:
            new Date("2026-07-15"),

          endDate:
            new Date("2026-07-18"),

          bannerUrl:
            "https://images.unsplash.com/photo-1511578314322-379afb476865",

          isPublished: true,
        },

        {
          title:
            "Cyber Diplomacy Summit",

          slug:
            "cyber-diplomacy-summit",

          description:
            "Conference discussing cyber warfare, privacy, and international digital governance.",

          location:
            "New Delhi, India",

          startDate:
            new Date("2026-09-10"),

          endDate:
            new Date("2026-09-12"),

          bannerUrl:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

          isPublished: true,
        },
      ],
    });

    console.log(
      "✅ Events seeded"
    );

    // ======================================
    // CHAMBERS
    // ======================================

    await prisma.chamber.createMany({
      data: [
        {
          name: "UNSC",

          slug: "unsc",

          agenda:
            "Addressing global cyber warfare threats.",

          description:
            "United Nations Security Council discussing geopolitical security.",

          iconUrl:
            "https://cdn-icons-png.flaticon.com/512/684/684908.png",

          backgroundGuideUrl:
            "https://example.com/unsc-guide.pdf",

          isPublished: true,
        },

        {
          name: "WHO",

          slug: "who",

          agenda:
            "Global healthcare reforms and pandemic preparedness.",

          description:
            "World Health Organization committee discussing healthcare systems.",

          iconUrl:
            "https://cdn-icons-png.flaticon.com/512/2966/2966488.png",

          backgroundGuideUrl:
            "https://example.com/who-guide.pdf",

          isPublished: true,
        },
      ],
    });

    console.log(
      "✅ Chambers seeded"
    );

    // ======================================
    // USERS
    // ======================================

    const hashedAdminPassword =
      await bcrypt.hash("admin123", 12);

    const hashedDelegatePassword =
      await bcrypt.hash("delegate123", 12);

    await prisma.user.createMany({
      data: [
        {
          fullName:
            "Admin User",

          email:
            "admin@enigmamun.com",

          password:
            hashedAdminPassword,

          university:
            "SRMU",

          country:
            "India",

          role: "ADMIN",
        },

        {
          fullName:
            "Delegate User",

          email:
            "delegate@enigmamun.com",

          password:
            hashedDelegatePassword,

          university:
            "Delhi University",

          country:
            "India",

          role: "DELEGATE",
        },
      ],
    });

    console.log(
      "✅ Users seeded"
    );

    console.log(
      "🎉 Database seeded successfully"
    );
  } catch (error) {
    console.error(
      "❌ Database seed failed"
    );

    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
