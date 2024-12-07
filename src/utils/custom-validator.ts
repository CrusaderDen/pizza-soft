export const customValidator = (data: any) => {
  const errors: Record<string, string> = {}

  if (data?.name === '') {
    errors.name = 'Введите имя'
  } else if (data?.name.length > 25) {
    errors.name = 'Имя не может быть длиннее 25 символов'
  } else if (data?.name.length < 2) {
    errors.name = 'Имя не может быть короче 2 символов'
  }

  if (data?.phone.split('').includes('_')) {
    errors.phone = 'Введите номер телефона до конца'
  } else if (data?.phone === '') {
    errors.phone = 'Введите номер телефона'
  }

  if (data.role === '' || data.role === '-') {
    errors.role = 'Выберите должность'
  }

  if (data?.birthday === '') {
    errors.birthday = 'Заполните дату рождения'
  } else if (data?.birthday.split('').includes('_')) {
    errors.birthday = 'Заполните дату рождения до конца'
  } else {
    const dateArr = data?.birthday.split('.')

    let birthdayErr = ''

    if (dateArr[0] < 1 || dateArr[0] > 31) {
      birthdayErr = 'Пожалуйста, исправьте день'
    }
    if (dateArr[1] < 1 || dateArr[1] > 12) {
      birthdayErr = birthdayErr.length > 0 ? birthdayErr + ', месяц' : 'Пожалуйста, исправьте месяц'
    }
    if (dateArr[2] < new Date().getFullYear() - 100 || dateArr[2] > new Date().getFullYear()) {
      birthdayErr = birthdayErr.length > 0 ? birthdayErr + ' и год' : 'Пожалуйста, исправьте год'
    }
    if (birthdayErr) {
      errors.birthday = birthdayErr
    }
  }

  return errors
}
