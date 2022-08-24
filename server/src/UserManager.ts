import User from "./User.js";
import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import MessageManager from "./MessageManager.js";

export default class UserManager {
    private users: Map<string, User>;
    private messageManager: MessageManager;

    constructor(messageManager: MessageManager) {
        this.users = new Map<string, User>();
        this.messageManager = messageManager;
    }

    addUser(ws: WebSocket) {
        const id = uuid();
        let newUser = new User(id, ws);
        this.users.set(id, newUser);

        ws.on("close", () => {
            this.removeUser(id);
        });

        ws.on("message", (rawMessage) => {
            this.onMessage(rawMessage);
        });

        ws.send(JSON.stringify({ action: "idAllocation", value: newUser.getId(), history: this.messageManager.getHistory() }));

        console.log(`New user connected ${id}`);
    }

    removeUser(userId: string) {
        this.users.delete(userId);

        console.log(`User ${userId} disconnected`);
    }

    onMessage(rawMessage) {
        const { action, userId, value } = JSON.parse(rawMessage);
        let user = this.users.get(userId);
        if (user == undefined)
            return;

        switch (action) {
            case "setName":
                user.name = value;
                console.log(`User ${user.getId()} - ${value}`);
                break;
            case "sendMessage":
                console.log(value);
                this.messageManager.sendMessage(this.users, user, value);
                break;
        }
    }
}