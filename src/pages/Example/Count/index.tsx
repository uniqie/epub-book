import { Button } from "@/components/ui/button"
import { useState } from "react"

function Count() {
  const [number, setNumber] = useState(0)

  return (
    <div className="flex">
      <Button onClick={() => setNumber((number) => number - 1)}>-</Button>
      <Button className="bg-white text-black mx-2" disabled>{number}</Button>
      <Button onClick={() => setNumber((number) => number + 1)}>+</Button>
    </div>
  )
}


export default Count