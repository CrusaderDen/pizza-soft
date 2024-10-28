import { Bounce, toast } from 'react-toastify'

export const notifyError = (errorMsg: string | undefined) => {
  toast.error(errorMsg, {
    autoClose: 5000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    pauseOnHover: true,
    position: 'bottom-center',
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  })
}

export const notifySuccess = (successMsg: string | undefined) => {
  toast.success(successMsg, {
    autoClose: 5000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    pauseOnHover: true,
    position: 'bottom-center',
    progress: undefined,
    style: { height: '100px' },
    theme: 'colored',
    transition: Bounce,
  })
}
