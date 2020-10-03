// This would be the main pipeline in my chat bot.
// The different modules announce themselves to the pipeline.

// Inbound modules
// 1) module announces its presence to the backbone
// 2) backbone subscribes to the module

// Outbound modules
// 1) subscribe to the backbone

// Can I as a reponse to getting an announcement message from a module, 
// run a consumer dedicated to that module.

import * as zmq from "zeromq"

class PublisherQueue {
    private queue: Buffer[][] = []
    constructor(private publisher: zmq.Publisher) { }

    send(topic: Buffer, msg: Buffer) {
        this.queue.push([topic, msg]);
    }

    async run() {
        while (true) {
            if (this.queue.length > 0) {
                let msg = this.queue.shift();
                if (msg !== undefined) {
                    await this.publisher.send(msg);
                }
            } else {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}

async function listen(name: string, sub: zmq.Subscriber, pub: PublisherQueue) {
    let id = 0;
    for await (const [topic, msg] of sub) {
        console.log(`BACKBONE | ${name} | received a message id: ${++id} related to: ${topic.toString()} containing message: ${msg.toString()}`);
        pub.send(topic, msg);
    }
}

export async function run() {
    const sock = new zmq.Reply;
    const pub = new zmq.Publisher
    await sock.bind("tcp://127.0.0.1:6666");
    await pub.bind("tcp://127.0.0.1:6667")

    let retransmitter = new PublisherQueue(pub);
    retransmitter.run();

    for await (const [msg] of sock) {
        const sub = new zmq.Subscriber;
        try {
            sub.connect(msg.toString());
            sub.subscribe();
        } catch (err) {
            console.error(`BACKBONE | Backbone received a malformed message : ${err}`);
        }
        listen(msg.toString(), sub, retransmitter);
        await sock.send("ACK").catch(err => {
            console.error(`BACKBONE | Failed to confirm connection of module ${err}`);
        });
    }
}