const endpoint = "https://api.hackerwebapp.com/";

async function getItem(id: number) {
    return await fetch(`${endpoint}item/${id}`)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
        });
}

export async function getTopStories() {
    return await fetch(`${endpoint}news`)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
        });
}

export async function getComments(id: number) {
    const post = await getItem(id);
    return post.comments;
}
