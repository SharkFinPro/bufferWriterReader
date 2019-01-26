(function() { // Run everything in a function that auto runs to add a level fo security
    class Writer {
        constructor(size) {
            this.index = 0; // Set index to start of buffer
            this.buffer = new DataView(new ArrayBuffer(size)); // Set buffer as passed buffer argument
        }

        toBuffer() {
            this.index = 0; // Set index back to 0
            return this.buffer.buffer; // Return the buffer
        }

        writeInt8(n) {
            this.buffer.setInt8(this.index++, n); // Write Int8 Data & Move index 1 byte
            return this;
        }

        writeUInt8(n) {
            this.buffer.setUInt8(this.index++, n); // Write UInt8 Data & Move index 1 byte
            return this;
        }

        writeInt16(n, le) {
            this.buffer.setInt16(this.index += 2, n, le)); // Write Int16 Data & Move index 2 bytes
            return this;
        }

        writeUInt16(n, le) {
            this.buffer.setUInt16(this.index += 2, n, le)); // Write UInt16 Data & Move index 2 bytes
            return this;
        }

        writeInt32(n, le) {
            this.buffer.setInt32(this.index += 4, n)); // Write Int32 Data & Move index 4 bytes
            return this;
        }

        writeUInt32(n, le) {
            this.buffer.setUInt32(this.index += 4, n)); // Write UInt32 Data & Move index 4 bytes
            return this;
        }

        writeFloat32(n, le) {
            this.buffer.writeFloat(this.index += 4, n)); // Write Float Data & Move index 2 bytes
            return this;
        }

        writeString8(n) {
            if (typeof n !== 'string') return console.error('Data must be a string.'); // Return error if data passed is not a string
            for (var i in n) this.writeUInt8(n.charCodeAt(i)); // Write a UInt8 of each character's char code.
            return this.writeUInt8(0); // Write a 0 to signify end of string.
        }

        writeString16(n, le) {
            if (typeof n !== 'string') return console.error('Data must be a string.'); // Return error if data passed is not a string
            for (var i in n) this.writeUInt16(n.charCodeAt(i), le); // Write a UInt16 of each character's char code.
            return this.writeUInt16(0); // Write a 0 to signify end of string.
        }

        writeString32(n, le) {
            if (typeof n !== 'string') return console.error('Data must be a string.'); // Return error if data passed is not a string
            for (var i in n) this.writeUInt32(n.charCodeAt(i), le); // Write a UInt32 of each character's char code.
            return this.writeUInt32(0); // Write a 0 to signify end of string.
        }
    }

    class Reader {
        constructor(buffer) {
            this.index = 0; // Set index to start of buffer
            this.buffer = buffer; // Set buffer as passed buffer argument
        }

        readInt8() {
            return this.buffer.readInt8(this.index++); // Return read Int8 data & Move index 1 byte
        }

        readUInt8() {
            return this.buffer.readUInt8(this.index++); // Return read UInt8 data & Move index 1 byte
        }

        readInt16(le) {
            this.index += 2; // Move index 2 bytes
            return le ? this.buffer.readInt16(this.index - 2) : this.buffer.readInt16(this.index - 2)); // Return read Int16 data
        }

        readUInt16(le) {
            this.index += 2; // Move index 2 bytes
            return le ? this.buffer.readUInt16(this.index - 2) : this.buffer.readUInt16(this.index - 2)); // Return read UInt16 data
        }

        readInt32(le) {
            this.index += 4; // Move index 4 bytes
            return le ? this.buffer.readInt32(this.index - 4) : this.buffer.readInt32(this.index - 4)); // Return read Int32 data
        }

        readUInt32(le) {
            this.index += 4; // Move index 4 bytes
            return le ? this.buffer.readUInt32(this.index - 4) : this.buffer.readUInt32(this.index - 4)); // Return read UInt32 data
        }

        readFloat32(le) {
            this.index += 4; // Move index 4 bytes
            return le ? this.buffer.readFloat(this.index - 4) : this.buffer.readFloat(this.index - 4)); // Return read Float data
        }

        readString8() {
            let data = ''; // Set data as a string
            while (true) { // Run following code until it returns itself
                let char = this.readUInt8(); // Read char code as UInt8
                if (char === 0) return data; // Return the string when the character is 0
                data += String.fromCharCode(char); // Add the character to the data string
            }
        }

        readString16(le) {
            let data = ''; // Set data as a string
            while (true) { // Run following code until it returns itself
                let char = this.readUInt16(le); // Read char code as UInt16
                if (char === 0) return data; // Return the string when the char code is 0
                data += String.fromCharCode(char); // Add the character to the data string
            }
        }

        readString32(le) {
            let data = ''; // Set data as a string
            while (true) { // Run following code until it returns itself
                let char = this.readUInt32(le); // Read char code as UInt32
                if (char == 0) return data; // Return the string when the char code is 0
                data += String.fromCharCode(char); // Add the character to the data string
            }
        }
    }

    window.Buffer = { Writer, Reader }; // Set Writer & Reader as properties in window.Buffer
})();
