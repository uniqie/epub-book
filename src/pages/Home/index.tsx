import { Page } from "@/components/ui/page"
import { Outlet } from "react-router-dom"

function Home() {
  return (
    <Page className="bg-gradient-to-br from-light-dark	to-weight-dark w-100 h-100">
      <Page.Content className="grid place-content-center">
        <Outlet></Outlet>
      </Page.Content>
    </Page>
  )
}

export default Home
