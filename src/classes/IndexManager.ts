import * as fs from 'fs';
import * as path from 'path';
import { HashIndex } from './HashIndex';
import { Page } from './Page';
import { Bucket } from './Bucket';  

class IndexManager {
  private pages: Page[] = [];
  private hashIndex: HashIndex;
  private outputStream: fs.WriteStream;  // Usando um stream para saída

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
      this.hashIndex.storeInBucket(word, this.pages.length + 1);  // Adiciona ao índice
    });
  
    // Última página, caso haja palavras restantes
    if (currentPage.length > 0) {
      this.pages.push(new Page(this.pages.length + 1, currentPage));
      // Também salva a relação e o índice para a última página
      currentPage.forEach(word => {
        this.saveWordPageRelation(word, this.pages.length);
        this.hashIndex.storeInBucket(word, this.pages.length);
      });
    }
  
    console.log(`Páginas carregadas: ${this.pages.length}`);
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

  displayPages(): void {
    // this.pages.forEach(page => {
    //   console.log(`Página ${page.pageNumber}: ${page.words.join(', ')}`);
    // });
  }

  // Construção do índice hash e associando páginas aos buckets
  buildIndex(): void {
    this.pages.forEach(page => {
      page.words.forEach(word => {
        this.hashIndex.storeInBucket(word, page.pageNumber); // Usando o novo método de armazenamento com Bucket
      });
    });
  }

  displayIndex(): void {
    this.hashIndex.displayBuckets();
  }
}

export { IndexManager }
