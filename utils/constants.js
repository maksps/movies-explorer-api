const urlRegEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const errorMessages = {
  unauthorized: 'Необходимо авторизоваться',
  notFoundMovie: 'Фильм не найден',
  notFoundUser: 'Пользователь не найден',
  forbiddenDelete: 'Нет прав для удаления фильма',
  badRequest: 'Передан некорректный запрос',
  badRequestMovie: 'Переданы некорректные данные в методы добавления фильма',
  badRequestUser: 'Переданы некорректные данные в методы создания пользователя',
  wrongData: 'Неправильный пароль или логин',
  conflictError: 'Пользоватиель с таким email уже существует',
  


  // : 'Неправильный пароль или логин',
  // 'Пользоватиель с таким email уже существует',
  // ,
  // ''





}

module.exports = { urlRegEx, errorMessages };
