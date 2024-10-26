import { RotatingSquare } from 'react-loader-spinner'

import s from './loader.module.scss'

export const Loader = () => {
  return (
    <RotatingSquare
      ariaLabel={'rotating-square-loading'}
      color={'#4fa94d'}
      height={'100'}
      visible
      width={'100'}
      wrapperClass={s.loaderWrapper}
    />
  )
}
