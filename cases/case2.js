import {Consumer} from 'sqs-consumer';
import {Producer} from 'sqs-producer';
import {config} from 'dotenv';

config()

const QUEUE_NAME = '/dev/case2-jobs-queue'

class SQSProducer extends Producer {
    constructor(options) {
        super({
            ...options,
            useQueueUrlAsEndpoint: false
        });
    }
}


const consumer = new Consumer({
    queueUrl: QUEUE_NAME,
    useQueueUrlAsEndpoint: false,
    handleMessage: async (message) =>  {
        console.log(message)
    }
})

const producer = new SQSProducer({
    queueUrl: QUEUE_NAME
})

consumer.start()

const message = {
    id: 'message_1',
    body: JSON.stringify({
        status: 'WORKING'
    })
}
await producer.send(message)

