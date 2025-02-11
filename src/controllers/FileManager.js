import { log } from "console";
import fs from "fs";

export class FileManager {
    constructor(filepath) {
        this.filepath = filepath;
        this.init();
    }

    async validFile() {
        try {
            await fs.promises.access(this.filepath, fs.constants.F_OK);
            return true
        } catch (e) {
            return false;
        }
    }
    
    async read() {
        const data = await fs.promises.readFile(this.filepath, 'utf-8');
        return data ? data : [];
    }

    async init() {
        if (! await this.validFile()) {
            console.log("NOT VALID FILE");
            return;
        }
    }

    async save(data) {
        try {
            await fs.promises.writeFile(this.filepath, JSON.stringify(data, null, 4));
        } catch (e) {
            console.log("Error trying to save.");
        }
    }

    combineObjs(ob1, ob2) {
        for (let key in ob2) {
            if (key in ob1 && key != "id") ob1[key] = ob2[key];
        }
        return ob1;
    }

    // The only way to get a duplicated id is modifying the file products.json
    getNextId(data) {
        if (!data || !data[data.length-1]) return 1;
        return data[data.length-1].id+1;
    }
}