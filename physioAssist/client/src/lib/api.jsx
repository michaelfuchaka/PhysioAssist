const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

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