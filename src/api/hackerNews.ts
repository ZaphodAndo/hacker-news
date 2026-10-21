import type { Post } from "../models/Post";
import type { Comment } from "../models/Comment";

const endpoint = "https://hn.algolia.com/api/v1/";

type AlgoliaStory = {
    objectID: string;
    title: string;
    url: string | null;
    author: string;
    points: number | null;
    num_comments: number | null;
    created_at_i: number;
    _tags: Array<string>;
};

type AlgoliaItem = {
    id: number;
    author: string | null;
    text: string | null;
    created_at_i: number;
    children: Array<AlgoliaItem>;
};

async function get<T>(path: string): Promise<T> {
    const response = await fetch(endpoint + path);
    if (!response.ok) {
        throw new Error(`Request to ${path} failed with ${response.status}`);
    }

    return response.json();
}

function toPost(story: AlgoliaStory): Post {
    const id = Number(story.objectID);
    const url = story.url ?? `https://news.ycombinator.com/item?id=${id}`;

    return {
        comments_count: story.num_comments ?? 0,
        domain: new URL(url).hostname.replace(/^www\./, ""),
        id,
        points: story.points ?? 0,
        time: story.created_at_i,
        title: story.title,
        type: story._tags.includes("job")
            ? "job"
            : story._tags.includes("ask_hn")
              ? "ask"
              : "link",
        url,
        user: story.author,
    };
}

function toComment(item: AlgoliaItem, level: number): Comment {
    return {
        comments: item.children.map((child) => toComment(child, level + 1)),
        content: item.text ?? "",
        id: item.id,
        level,
        time: item.created_at_i,
        user: item.author ?? "[deleted]",
    };
}

export async function getTopStories(): Promise<Array<Post>> {
    try {
        const result = await get<{ hits: Array<AlgoliaStory> }>(
            "search?tags=front_page&hitsPerPage=30",
        );
        return result.hits.map(toPost);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getComments(id: number): Promise<Array<Comment>> {
    try {
        const story = await get<AlgoliaItem>(`items/${id}`);
        return story.children.map((child) => toComment(child, 0));
    } catch (error) {
        console.error(error);
        return [];
    }
}
