import * as fs from 'fs';
import * as path from 'path';
import { HashIndex } from './HashIndex';
import { Page } from './Page';
import { Bucket } from './Bucket';  

class IndexManager {
  private pages: Page[] = [];
  private hashIndex: HashIndex;
  private outputStream: fs.WriteStream;  // Usando um stream para saída

  public numCollisions: number = 0;
  public numOverflows: number = 0;

  constructor(private filePath: string, private pageSize: number, numberOfBuckets: number, maxBucketSize: number) {
    this.hashIndex = new HashIndex(numberOfBuckets, maxBucketSize); 
    this.outputStream = fs.createWriteStream("src/public/words-pages.txt", { flags: 'a' }); 
  }

  async loadFile(): Promise<void> {
    const data = await this.loadFileData();
  
    let currentPage: string[] = [];
  
    // Criação das páginas e armazenando a relação palavra-página e índice no mesmo loop
    data.forEach((word, index) => {
      if (currentPage.length < this.pageSize) {
        currentPage.push(word);
      } else {
        // Quando atingir o limite da página, armazena a página atual
        this.pages.push(new Page(this.pages.length + 1, currentPage));
  
        // Limpa a página e começa uma nova
        currentPage = [word];
      }
  
      // Salva a relação palavra-página e adiciona ao índice no mesmo momento
       this.saveWordPageRelation(word, this.pages.length + 1);  // Salva relação
      // const {collision, overflow} = this.hashIndex.storeInBucket(word, this.pages.length + 1);  // Adiciona ao índice
      // this.numCollisions += collision;
      // this.numOverflows += overflow;
    });
  
    // Última página, caso haja palavras restantes
    if (currentPage.length > 0) {
      this.pages.push(new Page(this.pages.length + 1, currentPage));
      // Também salva a relação e o índice para a última página
       currentPage.forEach(word => {
         this.saveWordPageRelation(word, this.pages.length);
      //   const {collision, overflow} = this.hashIndex.storeInBucket(word, this.pages.length);
      //   this.numCollisions += collision;
      //   this.numOverflows += overflow;
       });
    }
  
    // console.log(`Páginas carregadas: ${this.pages.length}`);
    // this.displayPages();
  }
  

  private async saveWordPageRelation(word: string, pageNumber: number): Promise<void> {
    const relation = `Palavra: ${word} -> Página: ${pageNumber}\n`;
    try {
      this.outputStream.write(relation);
    } catch (error) {
      console.error("Erro ao salvar relação palavra-página:", error);
    }
  }

  private async loadFileData(): Promise<string[]> {
     try {
        const data = fs.readFileSync(path.resolve("src/public/words.txt"), "utf-8");
        const dataFormatt = data.split("\n").map((line) => line.trim()).filter(Boolean); // Remove espaços e linhas vazias
        // console.log(dataFormatt.length)

        return dataFormatt;
     } catch (error) {
        console.error("Erro ao carregar o arquivo:", error);
        return [];
     }
  }

  tableScan(searchWord: string): { 
    pageFound: number | null, 
    pagesScanned: number, 
    pagesRead: { pageNumber: number, content: string[] }[], 
    timeElapsed: number 
  } {
    const startTime = performance.now();
    let pagesScanned = 0;
    let pagesRead: { pageNumber: number, content: string[] }[] = [];
    let pageFound: number | null = null;

    for (const page of this.pages) {
        pagesScanned++;
        pagesRead.push({ pageNumber: page.pageNumber, content: page.words });

        if (page.words.includes(searchWord)) {
            pageFound = page.pageNumber;
            break;
        }
    }

    const endTime = performance.now();
    const timeElapsed = endTime - startTime; 

    return { 
        pageFound, 
        pagesScanned, 
        timeElapsed, 
        pagesRead
    };
  }

  getFirstAndLastPage(): { firstPage: Page | null; lastPage: Page | null } {
    return {
      firstPage: this.pages.length > 0 ? this.pages[0] : null,
      lastPage: this.pages.length > 0 ? this.pages[this.pages.length - 1] : null
    };
  }

  displayPages(): void {
    // this.pages.forEach(page => {
    //   console.log(`Página ${page.pageNumber}: ${page.words.join(', ')}`);
    // });
  }

  // Construção do índice hash e associando páginas aos buckets
  buildIndex(): void {
    this.pages.forEach(page => {
      page.words.forEach(word => {
        const {collision, overflow} = this.hashIndex.storeInBucket(word, page.pageNumber);
        this.numCollisions += collision;
        this.numOverflows += overflow
      });
    });
  }

  displayIndex(): void {
    this.hashIndex.displayBuckets();
  }
}

export { IndexManager }
