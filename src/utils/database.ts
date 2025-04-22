    // import mongoose from "mongoose";

    // export default function connectDB(){
    //     const DATABASE_URL=process.env.DATABASE_URL??""

    //     try{
    //         await mongoose.connect(DATABASE_URL);
    //         console.log(`database connected : ${DATABASE_URL}`);
    //     }catch(error){
    //         console.error("Database connection error:", error);
    //         process.exit(1);
    //     }

    //     const dbConn = mongoose.connection;

    //     dbConn.on("error", (err) => {
    //         console.error("Connection error:", err);
    //     });
    // }

import mongoose from "mongoose";

export default function connectDB() {
	const DATABASE_URL = process.env.DATABASE_URL ?? "";

	try {
		mongoose.connect(DATABASE_URL);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}

	const dbConn = mongoose.connection;

	dbConn.on("open", (_) => {
		console.log(`Database connected: ${DATABASE_URL}`);
	});

	dbConn.on("error", (err) => {
		console.log(`Connection Error: ${err}`);
	});
}
