class Bucket {
    id: number;
    entries: Map<string, number>;
    maxSize: number;
  
    constructor(id: number, maxSize: number) {
      this.id = id;
      this.entries = new Map();
      this.maxSize = maxSize;
    }
  
    addEntry(word: string, pageId: number): boolean {
      if (this.entries.size < this.maxSize) {
        this.entries.set(word, pageId);
        return true;
      }
      return false;
    }
  
    getPage(word: string): number | undefined {
      return this.entries.get(word);
    }
  }

  export {Bucket}