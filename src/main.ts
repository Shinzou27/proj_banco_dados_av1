import path from "path";
import { IndexManager } from "./classes/IndexManager";

async function main(pageSize: number, searchWord?: string) {
  const bucketSize = 42;
  const amountBuckets = Math.ceil(466000 / bucketSize); //consertar pra calcular com o tamanho do arquivo sozinho

  const indexManager = new IndexManager(
    path.join("src", "public", "words.txt"),
    pageSize,
    amountBuckets,
    bucketSize
  );

  await indexManager.loadFile();

  indexManager.buildIndex();

  const collisionRate = (indexManager.numCollisions / 466000) * 100;
  const overflowRate = (indexManager.numOverflows / 466000) * 100;

  //indexManager.displayIndex();

  // Logica table scan
  let tableScanResult = searchWord ? indexManager.tableScan(searchWord!) : null;
  console.log(`Resultado do Table Scan:`, tableScanResult);

  return {
    collisionRate,
    overflowRate,
    tableScanResult,
  };
}

// main().catch(err => console.error(err));

export { main };
