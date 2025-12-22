const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getCurrentUser(){
    const response = await fetch(`${API_BASE_URL}/api/auth/me`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',

        },
    });
    
    if(!response.ok){
        return null;
      }
 
     const data = await response.json();
    return data.user;    
   
}

// login 
 export async function login(email, password){
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: 'POST',
        credentials: 'include',
        headers:{
              'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email, password }),
    });

    if(!response.ok){
         const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }
    const data = await response.json();
    return data;
    }

    // Register Fn
export async function register (fullname, email, password, gender=null){
    const response =  await fetch(`${API_BASE_URL}/api/auth/register`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password, gender }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
    }

    const data = await response.json();
    return data;
}

// logout
export async function logout() {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Logout failed');
    }

    const data = await response.json();
    return data;
}
