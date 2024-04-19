import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from "./Routes/route.js";
import Connect from "./Utils/Connection.js";

dotenv.config();
let io;
try {
    const db = await Connect();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        // Socket.IO options go here
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    httpServer.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });

} catch (err) {
    console.log(err);
}
export { io }