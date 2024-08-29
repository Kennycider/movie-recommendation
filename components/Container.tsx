
const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col container z-20 py-10 min-h-screen">
      {children}
    </main>
  )
}

export default Container