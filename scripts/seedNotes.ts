
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function seeding(){
    const userId = "cm63p2gtb0000js03yyb9w157"
    const categoryName = "Sem 2";
    // const notesData = [
    //     {
    //         note: "Subject Notes",
    //         notes: [
    //             { title:"Physics Notes" },
    //             { title:"FMC Notes" },
    //             { title:"Maths(M2) Notes" },
    //             { title:"BEEE Notes" },
    //             { title:"ENGD Notes" },
    //         ]
    //     },
    //     {
    //         note: "End Sem PyQs",
    //         notes: [
    //             { title:"Year 2024" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfCddEvezHXfMcG5iWqTaZbE3eVAKDBog1Sz20" },
    //             { title:"Year 2023" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfzRIYyDeVdLYR8CEnN6cBiyIwAz149hbkj5DF" },
    //             { title:"Year 2022" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfJXJdM5SzZoj6VYGwb9ipaRsnrC1k3cx7lHev" },
    //             { title:"Year 2021" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfzM0aAbeVdLYR8CEnN6cBiyIwAz149hbkj5DF" },
    //             { title:"Year 2020" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExffeTX1pOCoBrhx4eXSwKAJ7dmn8QviMWD9pI6" },
    //         ]
    //     },
    //     {
    //         note: "Class Test(CT) PyQs",
    //         notes: [
    //             { title:"Year 2024" },
    //             { title:"Year 2023" },
    //             { title:"Year 2022" },
    //         ]
    //     },
    //     {
    //         note: "Lab Manuals",
    //         notes: [
    //             { title:"Physics lab" },
    //             { title:"BEEE lab" },
    //             { title:"ENGD Lab" },
    //             { title:"FMC Lab" },
    //         ]
    //     },
    //     // {
    //     //     note: "Cheet Codes",
    //     //     notes: [
    //     //         { title:"Maths(M2)" },
    //     //         { title:"Physics Ass" },
    //     //         { title:"Mechanics" },
    //     //     ]
    //     // },
    // ]
    const notes = [
        { title:"Year 2024" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfCddEvezHXfMcG5iWqTaZbE3eVAKDBog1Sz20" },
        { title:"Year 2023" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfzRIYyDeVdLYR8CEnN6cBiyIwAz149hbkj5DF" },
        { title:"Year 2022" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfJXJdM5SzZoj6VYGwb9ipaRsnrC1k3cx7lHev" },
        { title:"Year 2021" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfzM0aAbeVdLYR8CEnN6cBiyIwAz149hbkj5DF" },
        { title:"Year 2020" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExffeTX1pOCoBrhx4eXSwKAJ7dmn8QviMWD9pI6" },
    ]
    try {
        // const category = await database.category.findFirst({
        //     where: {
        //         name: categoryName,
        //     }
        // });
        // for(const note of notesData){
        //     const list = await database.note.findFirst({
        //         where: {
        //             title: note.note,
        //             userId
        //         }
        //     })
        //     if(list){
        //         for(const noteList of note.notes){
        //              await database.notesList.createMany({
        //                 data: {
        //                     title: noteList.title,
        //                     noteId: list?.id,
        //                     userId,
        //                     position: note.notes.indexOf(noteList)
        //                 }
        //             })
        //         }
        //     }
        // }

        // for(const note of notes){
        //     await database.notesList.updateMany({
        //         where: {
        //             title: note.title,
        //         },
        //         data: {
        //             imageUrl: note.imageUrl
        //         }
        //     })
        // };
        console.log("Success")
    } catch (error) {
        console.log("Error connecting Database", error);
    }finally{
        await database.$disconnect();
    }
}
seeding();