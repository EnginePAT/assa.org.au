// Setup Supabase
const supabaseClient = supabase.createClient(
  'https://uxxeialwtsreqjmcreya.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4eGVpYWx3dHNyZXFqbWNyZXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTA5MTYsImV4cCI6MjA2Mzg4NjkxNn0.-GQy54PghgCwXGxKAzMRGTfpDDVNm1dC5omNkYnzSdA'
);

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('username').value.trim(); // you are using username as email input
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error');

  const { user, session, error } = await supabaseClient.auth.signIn({ email, password });

  if (error) {
    errorMsg.textContent = "Login failed: " + error.message;
  } else {
    // Redirect to user page
    window.location.href = 'pages/user.html';
  }
});

async function logout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Logout error:', error.message);
  } else {
    // Redirect to login or home page if needed
    window.location.href = 'index.html'; // change this to your actual login route
  }
}

let inactivityTime = () => {
  let timer;
  const logoutTime = 5 * 1000; // 15 minutes

  const resetTimer = () => {
    clearTimeout(timer);
    localStorage.setItem("lastActivity", Date.now());
    timer = setTimeout(logout, logoutTime);
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html"; // or your login page
  };

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
};

inactivityTime();
