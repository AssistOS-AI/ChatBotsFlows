export class SummarizeConversation {
    static id = "2DUFX4A3fmPv";
    static description = "Makes a summary of the conversation between you and a personality";

    constructor() {
    }

    start(replyHistory) {
        this.prompt = `Please summarize the following conversation: "${replyHistory}" by creating the main idea that each role has. the response should have the following structure: {\"summary\":[{role:\"user\", content:\"main idea of user replies\"}, {role:\"assistant\", content:\"main idea of assistant replies\"}]}.`;
        this.setThink("");
        this.setDefaultValues();
        this.setIntelligenceLevel(3);
        this.execute();
    }

    async execute() {
        let summary = await this.summarize(this.prompt);
        try {
            JSON.parse(summary);
        } catch (e) {
            this.fail(e);
        }
        this.return(summary);
    }
}