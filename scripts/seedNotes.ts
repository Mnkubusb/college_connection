
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function seeding(){

    const userId = "cm63p2gtb0000js03yyb9w157"
    try {
        const notes = [
            { title: "Subject Notes" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfFVftIOkbazAf4NvD8xRupUoQnm9GyVBq6wMj", category: "Sem 1"},
            { title: "End Sem PyQs" , imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfSr78dWRZ7LpkdtBNijxlQhu2qFMYwKTzI0b9" , category: "Sem 1"},
            { title: "Class Test(CT) PyQs",imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfdmbV31NeuYJBOPLdbUyZ9tRVaC2FW1rsizk4" , category: "Sem 1"},
            { title: "Lab Manuals", imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfAVVQGxheL6zOJN3T2dBXhmP8lf5vDYyoksVj" , category: "Sem 1"}, ,
            { title: "Cheet Codes",imageUrl: "https://9y2d0vlzyn.ufs.sh/f/5BUL5Wu0UExfAVVQGxheL6zOJN3T2dBXhmP8lf5vDYyoksVj" ,category: "Sem 1"},
        ]
        for (const note of notes) {
            const category = await database.category.findFirst({where:{name: note?.category}})
            if (category) {
                await database.note.create({
                    data: {
                        userId,
                        title: note?.title,
                        categoryId: category?.id,
                        imageUrl: note?.imageUrl
                    }
                });
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