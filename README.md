# service bus batch example

A short example how to consume messages from the Azure Service Bus Topics in batch, multiple messages at once.

You need to create Azure Service Bus, with Topics and add new topic called `mytopic` and subscription to it `mysubscription`. Then update the conecction string in the project files.

`producer` - adds a few messages to the service bus in batch.

`consumerfx` - azure function triggered by service bus message that consumes only 1 message at once.

`consumerfxmany` - azure function triggered by service bus message that consumes many messages at once (configurable in the `prefetchCount` hosts.json settings).
