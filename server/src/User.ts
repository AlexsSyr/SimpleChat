import { WebSocket } from "ws";

export default class User
{
    name : string;
    private id : string;
    private webSocket : WebSocket;

    constructor(id : string, webSocket : WebSocket)
    {
        this.name = "";
        this.id = id;
        this.webSocket = webSocket;
    }

    getId() : string{
        return this.id;
    }

    getWebSocket() : WebSocket
    {
        return this.webSocket;
    }
}