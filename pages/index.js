import Head from 'next/head'

import { FeaturedPosts } from "../components/home-page/FeaturedPosts";
import Hero from "../components/home-page/Hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage({posts}) {
  return (
    <>
      <Head>
        <title>Bob's Blog</title>
        <meta name="description" content="Blog posts about modern programming and web development"/>
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    }, 
  };
}

export default HomePage;
