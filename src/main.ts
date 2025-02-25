import { IndexManager } from "./classes/IndexManager";

async function main(searchWord: string){
    const pagesSize = 2 //receber do front
    const bucketSize = 5
    const amountBuckets = 466000/bucketSize //consertar pra calcular com o tamanho do arquivo sozinho

    const indexManager = new IndexManager('src\public\words.txt', pagesSize, amountBuckets, bucketSize); 
    
    await indexManager.loadFile(); 
    
    indexManager.buildIndex(); 

    indexManager.displayIndex();

    //Logica table scan
    console.log(`Iniciando Table Scan para a palavra: '${searchWord}'`);
    const result = indexManager.tableScan(searchWord);

    console.log(`Resultado do Table Scan:`, result);
    return result;
  }
  
  // main().catch(err => console.error(err));
  

export {main}
