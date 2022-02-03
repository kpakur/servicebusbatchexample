const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = "connection string here"
const topicName = "mytopic";

const messages = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" }
];

// Example from // https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-topics-subscriptions
async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  const sender = sbClient.createSender(topicName);

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    // await sender.sendMessages(messages);

    // create a batch object
    let batch = await sender.createMessageBatch();
    for (let i = 0; i < messages.length; i++) {
      // for each message in the arry			

      // try to add the message to the batch
      if (!batch.tryAddMessage(messages[i])) {
        // if it fails to add the message to the current batch
        // send the current batch as it is full
        await sender.sendMessages(batch);

        // then, create a new batch 
        batch = await sender.createMessageBatch();

        // now, add the message failed to be added to the previous batch to this batch
        if (!batch.tryAddMessage(messages[i])) {
          // if it still can't be added to the batch, the message is probably too big to fit in a batch
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    // Send the last created batch of messages to the topic
    await sender.sendMessages(batch);

    console.log(`Sent a batch of messages to the topic: ${topicName}`);

    // Close the sender
    await sender.close();
  } finally {
    await sbClient.close();
  }
}

// call the main function
main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});   