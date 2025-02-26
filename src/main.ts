import path from "path";
import { IndexManager } from "./classes/IndexManager";

async function main(pageSize: number, searchWord?: string) {
  const bucketSize = 42;

  const data = await IndexManager.loadFileData();

  const amountBuckets = Math.ceil(data.length / bucketSize);

  const indexManager = new IndexManager(
    path.join("src", "public", "words.txt"),
    pageSize,
    amountBuckets,
    bucketSize
  );

  await indexManager.loadFile(data);

  indexManager.buildIndex();

  const { firstPage, lastPage } = indexManager.getFirstAndLastPage();

  const collisionRate = (indexManager.numCollisions / data.length) * 100;
  const overflowRate = (indexManager.numOverflows / data.length) * 100;

  //indexManager.displayIndex();

  const indexSearchResult = searchWord ? indexManager.indexSearch(searchWord!) : null;

  // Logica table scan
  const tableScanResult = searchWord ? indexManager.tableScan(searchWord!) : null;
  console.log(`Resultado do Table Scan:`, tableScanResult);

  return {
    firstPage: firstPage ? { pageNumber: firstPage.pageNumber, content: firstPage.words } : null,
    lastPage: lastPage ? { pageNumber: lastPage.pageNumber, content: lastPage.words } : null,
    collisionRate,
    overflowRate,
    indexSearchResult,
    tableScanResult,
  };
}

// main().catch(err => console.error(err));

export { main };
