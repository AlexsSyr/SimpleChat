import User from "./User.js";

export default class MessageManager {
    private messages: Array<string>;

    constructor() {
        this.messages = new Array<string>();
    }

    sendMessage(users: Map<string, User>, user: User, message: string) {
        let text = `${user.name}: ${message}`;
        this.messages.push(text + "\n");

        users.forEach((value: User, key: string, map: Map<string, User>) => {
            value.getWebSocket().send(JSON.stringify(
                { action: "message", value: text }));
        });
    }

    getHistory(): string {
        let text = "";
        
        for(let i = 0; i < this.messages.length; ++i)
            text += this.messages[i];

        return text;
    }
}