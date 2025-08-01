import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  // await prisma.hero.deleteMany();
  // await prisma.experience.deleteMany();
  // await prisma.skill.deleteMany();
  // await prisma.education.deleteMany();

  const hashedPassword = await bcrypt.hash("Rahasia123!", 10);

  await prisma.user.create({
    data: {
      name: "Jamaludin Hakim Harsoyo",
      username: "Jamaludin21",
      email: "jamaludinhakim21@gmail.com",
      phoneNumber: "081514299690",
      password: hashedPassword,
    },
  });

  // await prisma.hero.create({
  //   data: {
  //     name: "Jamaludin Hakim Harsoyo",
  //     role: "Full Stack Developer & Tech Enthusiast",
  //     summary: `Build scalable web applications with clean code and careful design. I focus on modern JavaScript frameworks and backend structure. I create user-friendly interfaces and turn ideas into reality through engaging digital experiences.`,
  //     imageUrl:
  //       "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/hero/20250406_080349_no_background-aKgZZvdK5IDeOKM9Y2kFCeac3eHFgm.png",
  //   },
  // });

  // await prisma.experience.createMany({
  //   data: [
  //     {
  //       title: "APPLICATION DEVELOPER",
  //       company: "PT ASABA DIGITAL INNOTECH",
  //       location: "Setia Budi, Jakarta Selatan, Indonesia",
  //       startDate: new Date("2024-10-01"),
  //       endDate: null,
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/company/1674698164758-1SgrNzj9raWRI6A7SVfzsiId84YozF.jpeg",
  //       content: `· Write and maintain clean, efficient, and scalable code\n· Perform testing and debugging to ensure applications are reliable and perform optimally\n· Gather client requirements and work closely with teams to deliver solutions that meet business needs`,
  //     },
  //     {
  //       title: "FRONTEND DEVELOPER",
  //       company: "PT AKTIVA KREASI INVESTAMA",
  //       location: "Bekasi Timur, Bekasi, Indonesia",
  //       startDate: new Date("2023-08-01"),
  //       endDate: new Date("2024-07-01"),
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/company/1630653420672-moOZImP6IPaWWHXe9ojp9lggDTzYrR.jpeg",
  //       content: `· Implemented designs from Figma into responsive and interactive frontend code\n· Integrated APIs from backend to ensure full application functionality\n· Applied Agile and Scrum methodologies in project development\n· Performed CI/CD for feature development, improving deployment efficiency`,
  //     },
  //     {
  //       title: "BACKEND DEVELOPER",
  //       company: "PT SISTEM MANAJEMEN DEWARANGGA",
  //       location: "Cibubur, Bekasi, Indonesia",
  //       startDate: new Date("2023-01-01"),
  //       endDate: new Date("2023-04-01"),
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/company/1eaafa0d070668d15a1727ca8b0fa237-mr4lkM5x33iAP1YKH7TkBaRQnKZM8u.webp",
  //       content: `· Developed backend logic for company projects\n· Created REST APIs for frontend data consumption\n· Configured VPS for production/live application preparation\n· Translated Figma data into application requirements for building logic and REST APIs`,
  //     },
  //     {
  //       title: "FULLSTACK DEVELOPER",
  //       company: "PT KOGNITIF SKEMA INDONESIA",
  //       location: "Petodjo Selatan, Jakarta Pusat, Indonesia",
  //       startDate: new Date("2022-06-01"),
  //       endDate: new Date("2022-09-01"),
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/company/pt_kognitif_skema_indonesia_logo-gFeCrEdujGyhcLxrFA0DyKvH1hBUq3.jpeg",
  //       content: `· Handled development of E-Commerce module in Solotechnopark & Mandiri projects\n· Developed frontend of the website with data consumption/fetching from MySQL & Firebase databases\n· Collaborated with teams from each department to ensure campaign strategies aligned with business values`,
  //     },
  //   ],
  // });

  // await prisma.skill.createMany({
  //   data: [
  //     { name: "Next Js", level: "Intermediate", category: "Frontend" },
  //     { name: "React Js", level: "Intermediate", category: "Frontend" },
  //     { name: "Node Js", level: "Intermediate", category: "Backend" },
  //     { name: "PostgreSQL", level: "Intermediate", category: "Database" },
  //     { name: "Tailwind CSS", level: "Intermediate", category: "Frontend" },
  //     { name: "Prisma", level: "Beginner", category: "ORM" },
  //   ],
  // });

  // await prisma.education.createMany({
  //   data: [
  //     {
  //       school: "Universitas Bhayangkara Jakarta Raya",
  //       major: "Informatics Engineering",
  //       degree: "Bachelor's Degree",
  //       startDate: new Date("2019-09-01"),
  //       endDate: new Date("2023-08-01"),
  //       description:
  //         "Focused on software development, web apps, and databases.",
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/company/Logo_ubhara-drWVl8tdeVPa7lVmppfAxaPxdTfPw8.png",
  //     },
  //   ],
  // });

  // await prisma.portfolio.createMany({
  //   data: [
  //     {
  //       title: "Lentera Asa",
  //       category: "Fullstack",
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/portofolio/Screenshot%202025-07-30%20140201-1DMkP1K5pY0eN7WRXflyiupMG5UKpF.png",
  //       projectUrl: "https://lentera-asa.vercel.app/",
  //       isPublished: true,
  //       // description:
  //       //   "Email builder online gratis sebagai solusi untuk membantu anda mendesain email dengan drag & drop agar lebih baik dan menarik bagi customer anda, sehingga dapat meningkatkan kepercayaan dan lebih terlihat professional. Terdapat puluhan template email gratis dan siap pakai yang dapat digunakan untuk email newsletter, notifikasi ataupun promosi.",
  //     },
  //     {
  //       title: "Apotek Warehouse",
  //       category: "Fullstack",
  //       imageUrl:
  //         "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/portofolio/Screenshot%202025-07-30%20140120-pVJnItFEFp3oTI8o0bw01EHiL5b0rs.png",
  //       projectUrl: "https://apotek-warehouse.vercel.app/",
  //       isPublished: true,
  //       // description:
  //       //   "Email builder online gratis sebagai solusi untuk membantu anda mendesain email dengan drag & drop agar lebih baik dan menarik bagi customer anda, sehingga dapat meningkatkan kepercayaan dan lebih terlihat professional. Terdapat puluhan template email gratis dan siap pakai yang dapat digunakan untuk email newsletter, notifikasi ataupun promosi.",
  //     },
  //   ],
  // });
}

main()
  .then(() => {
    console.log("Seeding complete.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
