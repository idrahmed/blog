import Head from 'next/head'

import PostContent from "../../components/posts/posts-detail/PostContent";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage({ post }) {
  return (
    <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt}/>
    </Head>
  <PostContent post={post} />
  </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false  // returns 404 page if url does not match a path
  };
}

export default PostDetailPage;
