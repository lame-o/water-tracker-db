// Initialize Supabase client
// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://dviopdujfwbpckfatwqf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2aW9wZHVqZndicGNrZmF0d3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTkxNTQsImV4cCI6MjA1MDAzNTE1NH0.fteonZ_l_SIx8-2A5-m1S25cCPkPoXVtPPoGdTILHns'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// DOM elements
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const authMessage = document.getElementById('auth-message')
const userInfo = document.getElementById('user-info')
const signOutBtn = document.getElementById('sign-out')

// Check if user is already signed in
async function checkUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (user) {
        showAuthenticatedState(user)
    }
}

// Sign up function
async function signUp() {
    const email = emailInput.value
    const password = passwordInput.value

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        showMessage(error.message, 'error')
    } else {
        showMessage('Signup successful! Check your email for verification.', 'success')
    }
}

// Sign in function
async function signIn() {
    const email = emailInput.value
    const password = passwordInput.value

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        showMessage(error.message, 'error')
    } else {
        showAuthenticatedState(user)
        showMessage('Signed in successfully!', 'success')
    }
}

// Sign out function
async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        showMessage(error.message, 'error')
    } else {
        showUnauthenticatedState()
        showMessage('Signed out successfully!', 'success')
    }
}

// Helper functions
function showMessage(message, type) {
    authMessage.textContent = message
    authMessage.className = type
}

function showAuthenticatedState(user) {
    emailInput.style.display = 'none'
    passwordInput.style.display = 'none'
    document.querySelector('button[onclick="signUp()"]').style.display = 'none'
    document.querySelector('button[onclick="signIn()"]').style.display = 'none'
    signOutBtn.style.display = 'block'
    userInfo.style.display = 'block'
    userInfo.textContent = `Logged in as: ${user.email}`
    document.getElementById('water-tracking').style.display = 'block'
    loadWaterIntake() // Load water intake when user is authenticated
}

function showUnauthenticatedState() {
    emailInput.style.display = 'block'
    passwordInput.style.display = 'block'
    document.querySelector('button[onclick="signUp()"]').style.display = 'block'
    document.querySelector('button[onclick="signIn()"]').style.display = 'block'
    signOutBtn.style.display = 'none'
    userInfo.style.display = 'none'
    document.getElementById('water-tracking').style.display = 'none'
}

// Water tracking functions
async function trackWater() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const cups = parseInt(document.getElementById('cups-input').value)
    if (isNaN(cups) || cups < 0) {
        showMessage('Please enter a valid number of cups', 'error')
        return
    }

    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
        .from('water_intake')
        .insert([
            {
                user_id: user.id,
                date: today,
                cups: cups,
            }
        ])

    if (error) {
        showMessage('Error saving water intake: ' + error.message, 'error')
        return
    }

    document.getElementById('cups-input').value = ''
    showMessage('Water intake logged successfully!', 'success')
    loadWaterIntake()
}

async function loadWaterIntake() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
        .from('water_intake')
        .select('cups')
        .eq('user_id', user.id)
        .eq('date', today)

    if (error) {
        showMessage('Error loading water intake: ' + error.message, 'error')
        return
    }

    const totalCups = data.reduce((sum, record) => sum + record.cups, 0)
    document.getElementById('water-total').textContent = `Total cups today: ${totalCups}`
}

// Check user status on page load
checkUser()
