import { useSearchParams } from 'react-router-dom'

type updateSearchParamAttr = {
  isChecked: boolean
  param: string
  prevFiltration: string
  role: string
}

export const useUpdateSearchParam = () => {
  const [_, setSearchParams] = useSearchParams()
  const params = new URLSearchParams(window.location.search)

  const updateSearchParam = ({ isChecked, param, prevFiltration, role }: updateSearchParamAttr) => {
    let nextFiltration

    if (isChecked) {
      nextFiltration = prevFiltration.length === 0 ? role : prevFiltration + ',' + role
    } else {
      nextFiltration = prevFiltration
        .split(',')
        .filter(p => p !== role)
        .join(',')
      if (nextFiltration.length === 0) {
        params.delete(param)

        return
      }
    }
    params.set(param, nextFiltration)
    setSearchParams(params)
  }

  return { updateSearchParam }
}
