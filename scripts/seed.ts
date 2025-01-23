// const { PrismaClient } = require("@prisma/client");
// const database = new PrismaClient();

// async function main() {
//     try {
//         await database.category.createMany({
//             data:[
//                 { name: "Sem 1" },
//                 { name: "Sem 2" },
//                 { name: "Sem 3" },
//                 { name: "Sem 4" },
//                 { name: "Sem 5" },
//                 { name: "Sem 6" },
//                 { name: "Sem 7" },
//                 { name: "Sem 8" },
//             ]
//         });

//         console.log("Success")
//     } catch (error) {
//         console.log("Error seeding Category block", error);
//     }finally{
//         await database.$disconnect();
//     }
// }

// main();