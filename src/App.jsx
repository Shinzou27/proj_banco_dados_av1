import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Section from './components/Section'
import Warning from './components/Warning'
import Loading from './components/Loading'
import { api } from './services/api'
import Page from './components/Page'
import FoundStats from './components/FoundStats'

function App() {
  const [pageSize, setPageSize] = useState()
  const [searchKey, setSearchKey] = useState("")
  const [pageSizeSet, setPageSizeSet] = useState(false)
  const [searchKeySet, setSearchKeySet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [loading])

  const handleRequest = async () => {
    setLoading(true);
    setSearchKeySet(true)
    await api.get(`/?pageSize=${pageSize}&searchWord=${searchKey}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res.data);
      setResults(res.data);
      setLoading(false);
    })
  }

  return (
    <div className='size-full flex'>
      <Section bg={'bg-gray-700'}>
        <h1 className='text-center mx-4'>Escolha do tamanho das páginas</h1>
        <input disabled={pageSizeSet} onChange={(e) => setPageSize(e.target.value)} value={pageSize} className='w-96 h-16 mb-8 mt-auto text-gray-500 bg-gray-200 focus:outline-none rounded-md px-4 box-border disabled:opacity-40' type="number" name="collision_rate" placeholder='Insira o tamanho da página...' />
        <button disabled={pageSize == 0} onClick={() => setPageSizeSet(true)} className='w-64 mt-auto mb-16 h-16 bg-gray-500 rounded-xl hover:bg-gray-800 disabled:opacity-40'>Definir tamanho de página</button>
      </Section>
      <Section bg={'bg-gray-600'}>
        <h1 className='text-center mx-4'>Busca por uma chave específica</h1>
        <input disabled={!pageSizeSet || searchKeySet} onChange={(e) => setSearchKey(e.target.value)} value={searchKey} className='disabled:bg-gray-400 w-96 h-16 mt-auto text-gray-500 bg-gray-200 focus:outline-none rounded-md px-4 box-border' type="text" name="search_key" placeholder='Insira a chave de busca...' />
        <Warning condition={searchKey == "" && !pageSizeSet} label={"Preencha a quantidade de páginas primeiro!"} />
        <button disabled={searchKey == ""} onClick={async () => await handleRequest()} className='w-64 mt-auto mb-16 h-16 bg-gray-500 rounded-xl hover:bg-gray-800 disabled:opacity-40'>Buscar</button>
      </Section>
      <Section bg={'bg-gray-900'}>
        <div className='mb-auto'>
          <h1 className='text-center mx-4'>Dados da pesquisa</h1>
        </div>
        <div className='mb-auto w-full flex items-center justify-center'>
          {
            searchKeySet ?
              (loading && results == undefined) ?
                <Loading />
                :
                <div className='w-full'>
                  {results && results.indexSearchResult.pageFound >= 0 ? (
                    <>
                      <div className="text-center text-lg">
                        <p>Chave <span className="text-bold text-yellow-400">{searchKey}</span> encontrada na página <span className="text-bold text-yellow-400">{results.indexSearchResult.pageFound}</span>.</p>
                      </div>
                      <FoundStats data={results} />
                    </>
                  ) : (
                    <div className="text-center text-lg">
                      <p>A chave <span className="text-bold text-yellow-400">{searchKey}</span> não foi encontrada.</p>
                    </div>
                  )}
                  <h3 className='text-xl font-bold text-center my-8 py-4 border-t-2 border-t-white mx-8'>Primeira e última páginas</h3>
                  <div className='flex w-full items-center justify-center gap-16'>
                    {results && results.firstPage && results.lastPage && (
                      <>
                        <Page number={results.firstPage.pageNumber} keys={results.firstPage.content} />
                        <Page number={results.lastPage.pageNumber} keys={results.lastPage.content} />
                      </>
                    )}
                  </div>
                </div>
              :
              <p>Aguardando a chave a ser buscada.</p>
          }
        </div>
      </Section>
    </div>
  )
}

export default App
