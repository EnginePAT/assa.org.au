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
