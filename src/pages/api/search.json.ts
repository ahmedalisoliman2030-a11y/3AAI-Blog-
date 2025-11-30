import { getCollection } from 'astro:content';

export async function GET() {
    const posts = await getCollection('blog');

    const searchData = posts
        .filter(post => !post.data.draft)
        .map(post => ({
            title: post.data.title,
            description: post.data.description,
            slug: post.slug,
            tags: post.data.tags || [],
            category: post.data.category,
        }));

    return new Response(JSON.stringify(searchData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
