import { deleteEmployeeThunk } from '@/app/store/app-thunks'
import { useAppDispatch } from '@/app/store/store'
import { notifyError, notifySuccess } from '@/utils/toastConfig'

type RemoveButtonProps = {
  employeeId: number
}
export const RemoveButton = ({ employeeId }: RemoveButtonProps) => {
  const dispatch = useAppDispatch()

  const handleRemoveEmployee = async (id: number) => {
    const confirmation = confirm('Подтвердите удаление сотрудника из базы')

    if (confirmation) {
      try {
        await dispatch(deleteEmployeeThunk(id))
        notifySuccess('Сотрудник успешно удалён из базы')
      } catch (e) {
        notifyError(`Ошибка ${e}. Попробуйте позже или обратитесь в поддержку. `)
      }
    }
  }

  return <button onClick={() => handleRemoveEmployee(employeeId)}>🗑️</button>
}
