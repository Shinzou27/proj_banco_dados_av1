class Bucket {
    id: number;
    entries: Map<string, number>;
    maxSize: number;
  
    constructor(id: number, maxSize: number) {
      this.id = id;
      this.entries = new Map();
      this.maxSize = maxSize;
    }
  
    addEntry(word: string, pageId: number): { collision: 0 | 1, overflow: 0 | 1 } {
      // 1 se houver, 0 se não houver
      // Colisão se o tamanho do bucket for igual ou maior que o tamanho máximo
      // Overflow se houver colisão e o tamanho do bucket com sua extensão for igual a múltiplos do tamanho máximo
      const collision = Number(this.entries.size >= this.maxSize) as 0 | 1;
      const overflow = Number(collision && this.entries.size % this.maxSize === 0) as 0 | 1;


      this.entries.set(word, pageId);

      return { collision, overflow };
    }
  
    getPage(word: string): number | undefined {
      return this.entries.get(word);
    }
  }

  export {Bucket}