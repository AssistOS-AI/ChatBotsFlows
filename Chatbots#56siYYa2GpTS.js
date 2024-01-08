export class Chatbots {
    static id = "56siYYa2GpTS";

    constructor() {
        this.name = "Chatbots";
        this.description = "Provides an answer using a personality";
    }

    start(prompt, personalityId, replyHistory) {
        let personality = webSkel.currentUser.space.getPersonality(personalityId);
        this.prompt = `Step into the shoes of ${personality.name}, a character known for their distinctive traits: ${personality.description}. Your mission is to respond to the given text: "${prompt}" while emanating an emotion that naturally aligns with the text and encapsulates the distinct essence of this character. Please answer in the same language as the given text. Please only use emojis that have faces. The response should have the following structure: {\"reply\": \"reply to the given text\", \"emotion\":{\"name\":\"name of the emotion\", \"emoji\":\"emoji of the emotion\"}}`;
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