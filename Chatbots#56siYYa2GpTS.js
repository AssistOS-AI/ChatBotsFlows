export class Chatbots {
    static id = "56siYYa2GpTS";
    static description = "Provides an answer using a personality";
    constructor() {

    }

    async start(chatbot, conversation, prompt, emotion, personalityId, replyHistory) {
        let personality = system.space.getPersonality(personalityId);
        let systemMessage = `Step into the shoes of ${personality.name}, a character known for their distinctive traits: ${personality.description}. Your mission is to respond to the replies of the user while emanating an emotion that naturally aligns with the replies and encapsulates the distinct essence of this character. Please answer in the same language as the given replies. Please only use emojis that have faces. The response should have the following structure: {\"reply\": \"reply to the given text\", \"emotion\":{\"name\":\"name of the emotion\", \"emoji\":\"emoji of the emotion\"}}`;
        this.prompt = prompt;
        if(!conversation.isInstructed){
            await chatbot.addMessage(conversation, "system", systemMessage);
            await chatbot.addContext(conversation, systemMessage);
        }
        conversation.setCurrentEmotion(emotion);
        await chatbot.addMessage(conversation, "user", prompt);
        this.setDefaultValues();
        this.setIntelligenceLevel(3);
        this.setResponseFormat("json_object");
        this.setThink("Thinking...");
        this.execute(replyHistory);
    }

    async execute(replyHistory) {
        let text = await this.chatbot(this.prompt, "", replyHistory);
        this.return(text);
    }
}