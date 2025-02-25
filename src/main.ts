import { IndexManager } from "./classes/IndexManager";

async function main() {
    const pagesSize = 10 //receber do front
    const bucketSize = 5
    const amountBuckets = 466000/bucketSize //consertar pra calcular com o tamanho do arquivo sozinho

    const indexManager = new IndexManager('src\public\words.txt', pagesSize, amountBuckets, bucketSize); 
    
    await indexManager.loadFile(); 
    
    indexManager.buildIndex(); 

    indexManager.displayIndex();
  }
  
  main().catch(err => console.error(err));
  

export {main}
