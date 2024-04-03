const dropFunction = () => {
  document.getElementById('dropDownContainer').classList.toggle('show');
  return;
};
const LogOut = () => {
  fetch(
    'http://127.0.0.1:4000/V1/Auth/Account/LogOut?userID=siddharthghosh3220',
    {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    }
  )
    .then((Res) => Res.json())
    .then((dataFromServer) => {
      if (dataFromServer['success'] === true) {
        alert('LogOut Successfull');
      }
    })
    .catch((Err) => {
      alert('Internal Server Error');
    });
};

// window.onclick = (event) => {
//   const classList = document.getElementById('dropDownContainer').classList;
//   const arrayOfClasses = classList['value'].split(' ');
//   console.log(arrayOfClasses);
//   console.log(arrayOfClasses.indexOf('show'));
//   if (arrayOfClasses.indexOf('show') !== -1) {
//     document.getElementById('dropDownContainer').classList.remove('show');
//   }
// };
