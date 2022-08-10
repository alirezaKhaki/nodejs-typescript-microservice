import * as amqp from 'amqplib';

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        //make sure the queue is avilable
        const result = await channel.assertQueue('jobs');
        console.log('waitin for messages...');
        //get message
        channel.consume('jobs', msg => {
            console.log(msg?.content.toString());
            channel.ack(msg)
        })
    } catch (error) {
        console.error(error);

    }
};

connect()