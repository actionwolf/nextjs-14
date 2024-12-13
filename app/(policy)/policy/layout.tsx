export default function PolicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <h5>@here is policy</h5>
    </>
  );
}
