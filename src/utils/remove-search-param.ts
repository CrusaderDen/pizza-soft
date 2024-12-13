import { useSearchParams } from 'react-router-dom'

type updateSearchParamAttr = {
  isChecked: boolean
  param: string
  prevFiltration: string
  role: string
}

export const useFilterSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const removeParam = (param: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.delete(param)
    setSearchParams(newSearchParams)
  }

  const updateSearchParam = ({ isChecked, param, prevFiltration, role }: updateSearchParamAttr) => {
    let nextFiltration = ''

    if (isChecked) {
      nextFiltration = prevFiltration.length === 0 ? role : prevFiltration + ',' + role
    } else {
      nextFiltration = prevFiltration
        .split(',')
        .filter(p => p !== role)
        .join(',')
      if (nextFiltration.length === 0) {
        removeParam(param)

        return
      }
    }

    setSearchParams({ [param]: nextFiltration })
  }

  return { removeParam, updateSearchParam }
}
