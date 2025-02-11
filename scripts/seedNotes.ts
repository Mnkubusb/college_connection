const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function seeding(){

    const categoryName = "Sem 1";
    const notesData = [
        {
            note: "End Sem PyQs",
            notes: [
                { title:"Chemistry PyQs" },
                { title:"Maths(M1) PyQs" },
                { title:"BCEM PyQs" },
                { title:"English PyQs" },
                { title:"PMPS PyQs" },
            ]
        }
    ];

    try {
        const category = await database.category.findUnique({
            where: {
                name: categoryName,
            }
        });
        for(const note of notesData){
            const list = await database.note.findFirst({
                where: {
                    title: note.note,
                    categoryId: category?.id
                }
            })
            if(list){
                for(const noteList of note.notes){
                     await database.notesList.createMany({
                        data: {
                            title: noteList.title,
                            noteId: list?.id,
                            position: note.notes.indexOf(noteList),
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