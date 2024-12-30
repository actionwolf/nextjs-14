export default function PolicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <h5 className='italic'>@here is policy</h5>
    </>
  );
}
