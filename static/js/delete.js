const { ParseSourceFile } = require('prettier');
const dataService = require('../../services/dataservice');
function deleteData(email, password, age) {
  delete (email, password, age);
}

$('#delete-button').click(
  $.post(
    '/editform/api/password',
    {
      email: data.email,
      Password: data.Password,
      age: data.age,
    },
    deleteData
  )
);
