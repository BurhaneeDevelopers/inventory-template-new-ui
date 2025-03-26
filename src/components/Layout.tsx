import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}

export default Layout
