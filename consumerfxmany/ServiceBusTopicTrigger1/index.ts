import { AzureFunction, Context } from "@azure/functions"

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, msgs: any[]): Promise<void> {
    //https://github.com/kedacore/sample-javascript-eventhub-azure-function
    context.log(`SINGLE FUNCTION CALL`)
    context.log('ServiceBus topic trigger function processed message', msgs);
};

export default serviceBusTopicTrigger;
