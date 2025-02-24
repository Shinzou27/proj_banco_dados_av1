function Section({bg, children, flex = 'col'}) {
  return (
    <div className={`${bg} h-full w-1/3 flex flex-${flex} items-center justify-center`}>
      {children}
    </div>
  );
}

export default Section;