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

  storeInBucket(key: string, pageNumber: number): void {
    const hashValue = this.hash(key);
    const bucket = this.buckets.get(hashValue);

    if (bucket) {
      const added = bucket.addEntry(key, pageNumber); // Tenta adicionar a palavra ao Bucket
      if (!added) {
        // console.log(`Bucket ${hashValue} cheio, não foi possível adicionar '${key}'`);
      } else {
        // console.log(`Palavra '${key}' adicionada ao Bucket ${hashValue}, Página ${pageNumber}`);
      }
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
