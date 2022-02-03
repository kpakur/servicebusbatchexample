import { AzureFunction, Context } from "@azure/functions"

const serviceBusTopicTrigger: AzureFunction = async function(context: Context, msg: any): Promise<void> {
    context.log(`SINGLE FUNCTION CALL`)
    context.log('ServiceBus topic trigger function processed message', msg);
};

export default serviceBusTopicTrigger;
