const token =
    localStorage.getItem(
        'token'
    );

if (!token) {

    window.location.href =
        'index.html';
}

async function loadProfile() {

    try {

        const response =
            await fetch(
                'http://localhost:3000/auth/profile',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            localStorage.clear();

            window.location.href =
                'index.html';

            return;
        }

        document.getElementById(
            'userInfo'
        ).textContent =
            `Usuário: ${data.user.username}`;

    } catch (error) {

        console.error(error);
    }
}

document
    .getElementById(
        'logoutBtn'
    )
    .addEventListener(
        'click',
        () => {

            localStorage.clear();

            window.location.href =
                'index.html';
        }
    );

loadProfile();