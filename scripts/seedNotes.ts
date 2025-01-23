
async function seeding(){
    try {
        await database.notes.createMany({
            data:[
                { title: "Subject Notes",  }
            ]
        })
    } catch (error) {
        console.log("Error connecting Database", error);
    }finally{
        await database.$disconnect();
    }
}