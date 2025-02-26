function Page({ number, keys }) {
  return (
    <div className="bg-gray-600 rounded-xl flex flex-col size-40 gap-4 p-2" >
      <span className="h-4 w-full text-center font-bold">Página {number}</span>
      <ul className="size-full overflow-y-auto page-scrollbar">
        {keys.map((item) => <li className="size-full h-6">{item}</li>)}
        {keys.map((item) => <li className="size-full h-6">{item}</li>)}
      </ul>
    </div>
  );
}

export default Page;