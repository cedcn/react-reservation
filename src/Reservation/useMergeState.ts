import { useState } from 'react'

const useMergeState = <T extends {}>(initialState: any): [T, any] => {
  const [state, setState] = useState(initialState)
  const setMergedState = (newState: any) => setState((prevState: any) => Object.assign({}, prevState, newState))
  return [state, setMergedState]
}

export default useMergeState
