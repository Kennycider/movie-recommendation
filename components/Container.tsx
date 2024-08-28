
const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col container py-10 min-h-screen">
      {children}
    </main>
  )
}

export default Container