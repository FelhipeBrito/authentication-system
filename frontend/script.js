const yearNow = document.getElementById("yearNow");
const date = new Date();
yearNow.textContent = date.getFullYear();

const loginForm =
    document.getElementById(
        'loginForm'
    );

loginForm.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const username =
            document.getElementById(
                'login'
            ).value;

        const password =
            document.getElementById(
                'password'
            ).value;

        try {

            const response =
                await fetch(
                    'http://localhost:3000/auth/login',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                alert(data.message);

                return;
            }

            localStorage.setItem(
                'token',
                data.token
            );

            localStorage.setItem(
                'username',
                data.user.username
            );

            window.location.href =
                'dashboard.html';

        } catch (error) {

            console.error(error);

            alert(
                'Erro ao conectar ao servidor'
            );
        }
    }
);

