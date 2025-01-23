
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function seeding(){
    const userId = "cm63p2gtb0000js03yyb9w157"
    const categoryName = "Sem 2";
    const notesData = [
        {
            note: "Subject Notes",
            notes: [
                { title:"Physics Notes" },
                { title:"FMC Notes" },
                { title:"Maths(M2) Notes" },
                { title:"BEEE Notes" },
                { title:"ENGD Notes" },
            ]
        },
        {
            note: "End Sem PyQs",
            notes: [
                { title:"Year 2024" },
                { title:"Year 2023" },
                { title:"Year 2022" },
                { title:"Year 2021" },
                { title:"Year 2020" },
            ]
        },
        {
            note: "Class Test(CT) PyQs",
            notes: [
                { title:"Year 2024" },
                { title:"Year 2023" },
                { title:"Year 2022" },
            ]
        },
        {
            note: "Lab Manuals",
            notes: [
                { title:"Physics lab" },
                { title:"BEEE lab" },
                { title:"ENGD Lab" },
                { title:"FMC Lab" },
            ]
        },
        // {
        //     note: "Cheet Codes",
        //     notes: [
        //         { title:"Maths(M2)" },
        //         { title:"Physics Ass" },
        //         { title:"Mechanics" },
        //     ]
        // },
    ]
    try {
        const category = await database.category.findFirst({
            where: {
                name: categoryName,
            }
        });
        for(const note of notesData){
            const list = await database.note.findFirst({
                where: {
                    title: note.note,
                    categoryId: category?.id,
                    userId
                }
            })
            if(list){
                for(const noteList of note.notes){
                     await database.notesList.createMany({
                        data: {
                            title: noteList.title,
                            noteId: list?.id,
                            userId,
                            position: note.notes.indexOf(noteList)
                        }
                    })
                }
            }
        }
        console.log("Success")
    } catch (error) {
        console.log("Error connecting Database", error);
    }finally{
        await database.$disconnect();
    }
}
seeding();