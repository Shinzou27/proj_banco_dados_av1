function FoundStats({ data }) {
  function parseRate(rate) {
    let value = typeof rate == 'string' ? Number(rate) : rate;
    return `${((value - 1) * 100).toFixed(2).replace(".", ",")}%`
  }
  return (
    <div>
      <div className="mx-16" >
        <div className="w-full flex justify-between items-center text-xl">
          <span className="font-thin">Taxa de colisão</span>
          <p className="font-bold">{parseRate(data.collisionRate)}</p>
        </div>
        <div className="w-full flex justify-between items-center text-xl">
          <span className="font-thin">Taxa de overflow</span>
          <p className="font-bold">{parseRate(data.overflowRate)}</p>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mb-auto p-8 gap-4'>
        <div className='text-center text-gray-100 font-bold flex flex-col p-2 border border-gray-100 rounded-xl justify-center items-center text-wrap w-1/3' id='index_time_elapsed'>
          <h4 className="font-thin">Custo de acesso</h4>
          <p className='font-thin text-xs'>(Índice Hash)</p>
          <span className='text-2xl font-black'>{data.indexSearchResult.pagesScanned} acessos</span>
        </div>
        <div className='text-center text-gray-100 font-bold flex flex-col p-2 border border-gray-100 rounded-xl justify-center items-center text-wrap w-1/3' id='table_scan_time_elapsed'>
          <h4 className="font-thin">Custo de acesso</h4>
          <p className='font-thin text-xs'>(Table Scan)</p>
          <span className='text-2xl font-black'>{data.tableScanResult.pagesScanned} acessos</span>
        </div>
      </div>
      <div className='flex w-full items-center justify-center mb-auto p-8 gap-4'>
        <div className='text-center text-gray-100 font-bold flex flex-col p-2 border border-gray-100 rounded-xl justify-center items-center text-wrap w-1/3' id='index_time_elapsed'>
          <h4 className="font-thin">Tempo decorrido</h4>
          <p className='font-thin text-xs'>(Índice Hash)</p>
          <span className='text-2xl font-black'>{data.indexSearchResult.timeElapsed.toFixed(4)}ms</span>
        </div>
        <div className='text-center text-gray-100 font-bold flex flex-col p-2 border border-gray-100 rounded-xl justify-center items-center text-wrap w-1/3' id='table_scan_time_elapsed'>
          <h4 className="font-thin">Tempo decorrido</h4>
          <p className='font-thin text-xs'>(Table Scan)</p>
          <span className='text-2xl font-black'>{data.tableScanResult.timeElapsed.toFixed(4)}ms</span>
        </div>
      </div>
      <div className='text-center'>
        <h4 className='font-thin text-sm'>Diferença (ms):</h4>
        <span className='text-2xl font-black'>{Math.abs(data.indexSearchResult.timeElapsed - data.tableScanResult.timeElapsed).toFixed(4)}</span>
      </div>
    </div>
  );
}
export default FoundStats;
