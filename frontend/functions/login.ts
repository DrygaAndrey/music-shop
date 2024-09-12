const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function login(email: string, password: string) {
    try {
        //Get bookmarks from localStorage to sync them with data from database
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password, bookmarks }),
        });

        const status = response.status;

        if (status === 200) {
            const data = await response.json();
            localStorage.setItem('bookmarks', JSON.stringify(data.user.bookmarks));

            return { user: data.user, message: data.message };
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error checking auth:', error);
        return { error: 'Network error occurred' };
    }
}