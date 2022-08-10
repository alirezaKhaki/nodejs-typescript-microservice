import * as amqp from 'amqplib';

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        //make sure the queue is avilable
        const result = await channel.assertQueue('jobs');
        //send message to queue
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify({ msg: { number: 1444 } })));
        console.log('job sent');
        //close the connection after message sent
        // connection.close();
    } catch (error) {
        console.error(error);

    }
};

connect()