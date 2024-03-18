import {Consumer} from 'sqs-consumer';
import {Producer} from 'sqs-producer';
import {config} from 'dotenv';

config()

const QUEUE_NAME = '/dev/case1-jobs-queue'

class SQSConsumer extends Consumer {
    constructor(options) {
        super({
            ...options,
            useQueueUrlAsEndpoint: false
        });
    }
}

class SQSProducer extends Producer {
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

