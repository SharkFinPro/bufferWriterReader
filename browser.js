(function() {
    class Writer {
        constructor(size) {
            this.index = 0;
            this.buffer = new DataView(new ArrayBuffer(size));
        }

        toBuffer() {
            this.index = 0;
            return this.buffer.buffer;
        }

        writeInt8(n) {
            this.buffer.setInt8(this.index++, n);
            return this;
        }

        writeUInt8(n) {
            this.buffer.setUInt8(this.index++, n);
            return this;
        }

        writeInt16(n, le) {
            this.buffer.setInt16(this.index, n, le);
            this.index += 2;
            return this;
        }

        writeUInt16(n, le) {
            this.buffer.setUInt16(this.index, n, le);
            this.index += 2;
            return this;
        }

        writeInt32(n, le) {
            this.buffer.setInt32(this.index, n);
            this.index += 4;
            return this;
        }

        writeUInt32(n, le) {
            this.buffer.setUInt32(this.index, n);
            this.index += 4;
            return this;
        }

        writeFloat32(n, le) {
            this.buffer.writeFloat(this.index, n);
            this.index += 4;
            return this;
        }

        writeString8(n) {
            if (typeof n !== 'string') return console.error('Data must be a string.');
            for (var i in n) this.writeUInt8(n.charCodeAt(i));
            return this.writeUInt8(0);
        }

        writeString16(n, le) {
            if (typeof n !== 'string') return console.error('Data must be a string.');
            for (var i in n) this.writeUInt16(n.charCodeAt(i), le);
            return this.writeUInt16(0);
        }

        writeString32(n, le) {
            if (typeof n !== 'string') return console.error('Data must be a string.');
            for (var i in n) this.writeUInt32(n.charCodeAt(i), le);
            return this.writeUInt32(0);
        }
    }

    class Reader {
        constructor(buffer) {
            this.index = 0;
            this.buffer = new DataView(buffer);
        }

        readInt8() {
            return this.buffer.getInt8(this.index++);
        }

        readUInt8() {
            return this.buffer.getUint8(this.index++)
        }

        readInt16(le) {
            this.index += 2;
            return this.buffer.getInt16(this.index - 2, le || false);
        }

        readUInt16(le) {
            this.index += 2;
            return this.buffer.getUint16(this.index - 2, le || false);
        }

        readInt32(le) {
            this.index += 4;
            return this.buffer.getInt32(this.index - 4, le || false)
        }

        readUInt32(le) {
            this.index += 4;
            return this.buffer.getUint32(this.index - 4, le || false);
        }

        readFloat32(le) {
            this.index += 4;
            return this.buffer.getFloat32(this.index - 4, le || false);
        }

        readFloat64(le) {
            this.index += 8;
            return this.buffer.getFloat64(this.index - 8, le || false);
        }

        readString8() {
            let data = '';
            while (true) {
                let char = this.readUInt8();
                if (char === 0) return data;
                data += String.fromCharCode(char);
            }
        }

        readString16(le) {
            let data = '';
            while (true) {
                let char = this.readUInt16(le);
                if (char === 0) return data;
                data += String.fromCharCode(char);
            }
        }

        readString32(le) {
            let data = '';
            while (true) {
                let char = this.readUInt32(le);
                if (char == 0) return data;
                data += String.fromCharCode(char);
            }
        }
    }

    window.Buffer = { Writer, Reader };
})();