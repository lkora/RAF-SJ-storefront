window.addEventListener('load', () => {

    const form = document.getElementById("admin-login-form");
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };


        fetch('http://127.0.0.1:9001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    alert(data.msg);
                } else {
                    // Save auth token in a cookie
                    document.cookie = `token=${data.token};SameSite=Lax`;
                    // Redirect to index.html on success
                    window.location.href = '../index.html';
                }
            });
    });
});
