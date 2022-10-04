bmj//create an API for login
var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './index.html'
}

//create a a login function
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  //calling the API for loginrv using XMLHttpRequest
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://www.mecallapi.com/api/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "username": username,
    "password": password
  }));
  
  //when the user enter correct details from the one in the API it should accept the user info and log in
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects['status'] == 'ok') {
        localStorage.setItem("jwt", objects['accessToken']);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });

        //when the user enters incorrect details from the one in the API it should show an error message and not log in
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}

