export class Chatbots{
    static id = "56siYYa2GpTS"
    static description = "Provides an answer using a personality"
    static outputSchema = {
        reply: "string",
        emotion: {
            name: "string",
            emoji: "string"
        }
    }
    constructor() {
    }
    async start(context, personality) {
        let systemMessage = `Step into the shoes of ${personality.name}, a character known for their distinctive traits: ${personality.description}. Your mission is to respond to the replies of the user while emanating an emotion that naturally aligns with the replies and encapsulates the distinct essence of this character. Please answer in the same language as the given replies. Please only use emojis that have faces. The response should have the following structure: {\"reply\": \"reply to the given text\", \"emotion\":{\"name\":\"name of the emotion\", \"emoji\":\"emoji of the emotion\"}}`;
        if(!context.conversation.isInstructed){
            await context.chatbotObj.addMessage(context.conversation, "system", systemMessage);
            await context.chatbotObj.addContext(context.conversation, systemMessage);
        }
        context.conversation.setCurrentEmotion(context.emotion);
        await context.chatbotObj.addMessage(context.conversation, "user", context.userPrompt);
        let llm = assistOS.space.getLLM();
        llm.setResponseFormat("json_object");
        let text = await llm.chatbot(context.userPrompt, "", context.replyHistory);
        this.return(text);
    }
}