import { EventEmitter } from 'events';
import { Request } from '../Modals/requests.js';

const eventEmitter = new EventEmitter();

async function setupChangeStream(req, res, next) {//make sure your database is replica set enabled

    const FilterStream = [
        {
            $match: {
                'updateDescription.updatedFields.Status': { $exists: true }
            }
        }
    ]
    const changeStream = Request.watch(FilterStream);
    try {
        changeStream.on('change', (data) => {
            eventEmitter.emit('change', data);
        });
        next();
        await closeChangeStream(5000, changeStream);
    } catch (error) {
        console.error("Error occured in change stream", error);
    }
}

eventEmitter.on('change', (change) => {
    console.log('Change detected:', change);
});


function closeChangeStream(timeInMs = 10000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
        }, timeInMs);
    })

}
export { setupChangeStream };
