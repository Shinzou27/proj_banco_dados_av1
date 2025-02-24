import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Section from './components/Section'
import Warning from './components/Warning'
import Loading from './components/Loading'

function App() {
  const [pageSize, setPageSize] = useState();
  const [key, setKey] = useState("");
  const [pageSizeSet, setPageSizeSet] = useState(false);
  const [keySet, setKeySet] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading])
  return (
    <div className='size-full flex'>
      <Section bg={'bg-gray-700'}>
        <h1 className='text-center mx-4'>Escolha do tamanho das páginas</h1>
        <input onChange={(e) => setPageSize(e.target.value)} value={pageSize} className='w-96 h-16 mb-8 mt-auto text-gray-500 bg-gray-200 focus:outline-none rounded-md px-4 box-border' type="number" name="page_size" placeholder='Insira o tamanho da página...' />
        <button disabled={pageSize == 0} onClick={() => setPageSizeSet(true)} className='w-64 mt-auto mb-16 h-16 bg-gray-500 rounded-xl hover:bg-gray-800 disabled:opacity-40'>Definir tamanho de página</button>
      </Section>
      <Section bg={'bg-gray-600'}>
        <h1 className='text-center mx-4'>Busca por uma chave específica</h1>
        <input disabled={!pageSizeSet} onChange={(e) => setKey(e.target.value)} value={key} className='disabled:bg-gray-400 w-96 h-16 mt-auto text-gray-500 bg-gray-200 focus:outline-none rounded-md px-4 box-border' type="text" name="key" placeholder='Insira a chave de busca...' />
        <Warning condition={key == "" && !pageSizeSet} label={"Preencha a quantidade de páginas primeiro!"} />
        <button disabled={key == ""} onClick={() => setKeySet(true)} className='w-64 mt-auto mb-16 h-16 bg-gray-500 rounded-xl hover:bg-gray-800 disabled:opacity-40'>Buscar</button>
      </Section>
      <Section bg={'bg-gray-900'}>
        <div className='mb-auto'>
          <h1 className='text-center mx-4'>Dados da pesquisa</h1>
        </div>
        <div className='mb-auto w-full flex items-center justify-center'>
          {
            keySet ?
              loading ?
                <Loading />
                :
                <div className='w-full'>
                  <div className='flex w-full items-center justify-center mb-auto'>
                    <div className='text-center text-gray-100 font-bold flex flex-col justify-center items-center text-wrap w-1/3' id='index_time_elapsed'>
                      <h4>Tempo decorrido</h4>
                      <p className='font-thin mb-8'>(Índice Hash)</p>
                      <div id='placeholder_index' className='size-36 bg-gray-400 rounded-xl shadow-xl drop-shadow-md'>
                      </div>
                    </div>
                    <div className='text-center text-gray-100 font-bold flex flex-col justify-center items-center text-wrap w-1/3' id='table_scan_time_elapsed'>
                      <h4>Tempo decorrido</h4>
                      <p className='font-thin mb-8'>(Table Scan)</p>
                      <div id='placeholder_table_scan' className='size-36 bg-gray-400 rounded-xl shadow-xl drop-shadow-md'>
                      </div>
                    </div>
                  </div>
                  <div className='text-center'>
                    <h4 className='font-thin text-sm'>Diferença (ms):</h4>
                    <span className='text-2xl font-black'>255</span>
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
