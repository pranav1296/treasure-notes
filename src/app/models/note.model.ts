export class Note {
    heading: string;
    content: string;
    time: Number;
    constructor(heading: string, content: string, time: Number) {
        this.heading = heading;
        this.content = content;
        this.time = time;
    }
}