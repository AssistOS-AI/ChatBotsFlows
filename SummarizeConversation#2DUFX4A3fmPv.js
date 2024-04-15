export class SummarizeConversation {
    static id = "2DUFX4A3fmPv";
    static description = "Makes a summary of the conversation between you and a personality";

    constructor() {
    }

    async start(context) {
        let prompt = `Please summarize the following conversation between a user and an AI model by extracting information about the discussion: "${JSON.stringify(context.replyHistory)}". Keep in mind the subject they are discussing and the questions and answers that have been said. The AI model is using a predefined personality in order to give an authentic chatting experience.`;
        let llm = assistOS.space.getLLM();
        let summary = await llm.request(prompt);
        this.return(summary);
    }
}