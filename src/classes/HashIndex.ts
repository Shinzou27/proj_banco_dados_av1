import { Bucket } from './Bucket';

class HashIndex {
  private buckets: Map<number, Bucket>;

  constructor(private numberOfBuckets: number, private maxBucketSize: number) {
    this.buckets = new Map();
    this.initializeBuckets();
  }

  private initializeBuckets(): void {
    for (let i = 0; i < this.numberOfBuckets; i++) {
      this.buckets.set(i, new Bucket(i, this.maxBucketSize));  
    }
  }

  hash(key: string): number {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue = (hashValue * 97 + key.charCodeAt(i)) % this.numberOfBuckets;
    }
    return hashValue;
  }

  storeInBucket(key: string, pageNumber: number): { collision: 0 | 1, overflow: 0 | 1 } {
    const hashValue = this.hash(key);
    const bucket = this.buckets.get(hashValue);

    if (bucket) {
      const status = bucket.addEntry(key, pageNumber); // Adiciona a palavra ao Bucket
      return status;
    } else {
      throw new Error(`Bucket não encontrado para a chave ${key}`);
    }
  }

  findPage(key: string): number | undefined {
    const hashValue = this.hash(key);
    const bucket = this.buckets.get(hashValue);

    if (bucket) {
      return bucket.getPage(key);
    } else {
      console.log(`Bucket não encontrado para a chave ${key}`);
    }
  }

  displayBuckets(): void {
    this.buckets.forEach((bucket, key) => {
      // console.log(`Bucket ${key}:`);
      bucket.entries.forEach((pageId, word) => {
        // console.table(`  - Palavra: '${word}' | Página: ${pageId}`);
      });
    });
  }
}

export { HashIndex }
