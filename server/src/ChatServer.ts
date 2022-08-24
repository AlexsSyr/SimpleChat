import { WebSocketServer, WebSocket } from "ws";
import MessageManager from "./MessageManager.js";
import UserManager from "./UserManager.js";

export default class ChatServer {

    private wsServer: WebSocketServer;
    private messageManager: MessageManager;
    private userManager: UserManager;

    constructor() {
        this.wsServer = new WebSocketServer({ port: 1000 });
        this.messageManager = new MessageManager();
        this.userManager = new UserManager(this.messageManager);
    }

    run() {
        this.wsServer.on('connection', (ws: WebSocket) => {
            this.userManager.addUser(ws);
        });
    }

}