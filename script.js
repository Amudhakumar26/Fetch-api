document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  const container = document.getElementById('userContainer');
  const reloadBtn = document.getElementById('reloadBtn');

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.zipcode}`;
  };

  const createUserCard = (user) => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${formatAddress(user.address)}</p>
    `;
    return card;
  };

  const displayUsers = (users) => {
    container.innerHTML = '';
    users.forEach(user => {
      const card = createUserCard(user);
      container.appendChild(card);
    });
  };

  const fetchUsers = async () => {
    container.innerHTML = 'Loading...';
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to load users');
      const data = await res.json();
      displayUsers(data);
    } catch (err) {
      container.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  };

  reloadBtn.addEventListener('click', fetchUsers);

  fetchUsers(); // Initial load
});
