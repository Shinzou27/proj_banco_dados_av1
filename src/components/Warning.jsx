import icon from '../assets/red-alert-icon.svg';
function Warning({ label, condition }) {
  return (
    <>
      {condition ?
        <div className="h-8 flex gap-4 items-center justify-center">
          <img className='size-4' src={icon} />
          <p className="text-red-500 text-sm font-thin">{label}</p>
        </div>
        :
        <div className="h-8 flex gap-4 items-center justify-center">
        </div>
      }
    </>
  );
}

export default Warning;