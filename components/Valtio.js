import { proxy, useSnapshot } from "valtio"

function Valtio() {
    const store = proxy({
        count: 0,
      })
      const { count } = useSnapshot(store);
  return (
    <div>
         <h1>Hello Valtio {count}</h1>
         <button
            onClick={() => {
                store.count++
            }}
            >
            Increment
            </button>
    </div>
    
  )
}

export default Valtio