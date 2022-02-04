const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-signup').value;
  const emailEl = document.querySelector('#email-signup').value;
  const passwordEl = document.querySelector('#password-signup').value;
  
  if (!usernameEl || !emailEl || !passwordEl) {
    alert ('Please fill out all fields.')
  } else {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        email: emailEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Account created successfully!')
      document.location.replace('/home-page');
    } else {
      alert('Failed to sign up.');
    }
  };
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
