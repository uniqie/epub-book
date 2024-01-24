import { Page } from "@/components/ui/page"

import Reader from "../Reader"

function Home() {
  return (
    <Page>
      <Page.Content className="grid place-content-center">
        <Reader />
      </Page.Content>
    </Page>
  )
}

export default Home
