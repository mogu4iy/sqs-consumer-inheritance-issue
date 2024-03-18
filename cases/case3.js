import {Consumer} from 'sqs-consumer';
import {Producer} from 'sqs-producer';
import {config} from 'dotenv';

config()

const QUEUE_NAME = '/dev/case3-jobs-queue'

class SQSConsumer extends Consumer {
    constructor(options) {
        super({
            ...options,
            useQueueUrlAsEndpoint: false
        });
    }
}

const consumer = new SQSConsumer({
    queueUrl: QUEUE_NAME,
    handleMessage: async (message) =>  {
        console.log(message)
    }
})

const producer = new Producer({
    queueUrl: QUEUE_NAME,
    useQueueUrlAsEndpoint: false
})

consumer.start()

const message = {
    id: 'message_1',
    body: JSON.stringify({
        status: 'WORKING'
    })
}
await producer.send(message)