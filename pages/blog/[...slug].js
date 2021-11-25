import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getAllPosts } from '../../lib/data'

export default function BlogPage({ title, slug, date, content }) {
    return (
        <div>
            <Head>
                <title>BlogPage</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>{title}</h1>
                <div>
                    <MDXRemote {...content} />
                </div>
            </main>
        </div>
    )
}
// this generates routes for each blogPost post
export async function getStaticPaths() {
    return {
        paths: getAllPosts().map(post => ({
            params: { slug: [post.slug] }
        })),
        fallback: true
    }
}
// this will generate pages for each route
export async function getStaticProps(context) {
    const { params } = context;
    const allPosts = getAllPosts();
    const {data, content} = allPosts.find(post => post.slug === params.slug.join("/"));
    console.log(data.date)
    const mdxSource = await serialize(content);
    return {
        props: {
            ...data,
            date: data.date.toISOString(),
            content: mdxSource
        }
    }
}

