import mongoose from "mongoose"

export const connectMongoDB = async () => {
    const DatabaseURI = process.env.MONGODB_URI
    const connectionState = mongoose.connection.readyState;

        if (connectionState === 1) {
            //console.log('Already Connected!!');
            return;
        }

        if (connectionState === 2) {
            console.log('Connecting...');
            return;
        }
    
    try {        
        await mongoose.connect(DatabaseURI);
        
        //connectionState.isConnected = await mongoose.connect(DatabaseURI).connections[0].readyState;

        console.log("Database Connected Successfully....");
    } catch (error) {
        console.error("Error Connection MongoDB Database..", error);
        await mongoose.connection.close()
        throw new Error("Error in Connecting Database");
    }

}
 