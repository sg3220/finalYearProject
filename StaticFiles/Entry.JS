window.onload = () => {
  const pathName = window.location.pathname;
  const requestedPage = pathName.split('/V1/')[1];
  if (requestedPage === 'LandingLogIn') {
    const button = document.getElementById('button02');
    button.click();
  }
};
const sendData = (buttonClicked) => {
  console.log('Inside sendData');
  if (buttonClicked === 'actualSignUp') {
    const userDetails = new Object();
    userDetails['organizationName'] =
      document.getElementById('organizationName').value;
    userDetails['userID'] = document.getElementById('userID').value;
    userDetails['emailAddress'] = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      alert("Passwords Doesn't Match!!!");
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';
    } else {
      userDetails['password'] = password;
      console.log(userDetails);
      document
        .getElementById('processingImage')
        .classList.remove('displayNone');
      document.getElementById('button01').classList.add('disabledCursor');
      document.getElementById('button02').classList.add('disabledCursor');
      fetch('http://127.0.0.1:4000/V1/Auth/Account/SignUp', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userDetails),
      })
        .then((Res) => {
          if (Res.redirected) {
            window.location.href = Res.url;
          } else {
            return Res.json();
          }
        })
        .then((dataFromServer) => {})
        .catch((error) => {
          alert('❗ Error');
        });
      // .catch((Err) => {
      //   alert('Internal Server Error');
      //   document
      //     .getElementById('processingImage')
      //     .classList.add('displayNone');
      //   document
      //     .getElementById('button01')
      //     .classList.remove('disabledCursor');
      //   document
      //     .getElementById('button02')
      //     .classList.remove('disabledCursor');
      // });
    }
    return false;
  } else if (buttonClicked === 'pseudoLogIn') {
    document.getElementById('pane01').classList.add('displayNone');
    document.getElementById('pane03').classList.remove('displayNone');
  } else if (buttonClicked === 'actualLogIn') {
    const userDetails = new Object();
    userDetails['uniqueID'] = document.getElementById('uniqueID').value;
    userDetails['password'] = document.getElementById('password2').value;
    console.log(userDetails);
    document.getElementById('processingImage').classList.remove('displayNone');
    document.getElementById('button01').classList.add('disabledCursor');
    document.getElementById('button02').classList.add('disabledCursor');

    fetch('http://127.0.0.1:4000/V1/Auth/Account/LogIn', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((Res) => {
        if (Res.redirected) {
          window.location.href = Res.url;
        } else {
          return Res.json();
        }
      })
      .then((dataFromServer) => {})
      .catch((error) => {
        alert('❗ Error');
      });

    return false;
  } else if (buttonClicked === 'pseudoSignUp') {
    document.getElementById('pane03').classList.add('displayNone');
    document.getElementById('pane01').classList.remove('displayNone');
  }
};
