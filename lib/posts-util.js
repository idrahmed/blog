import fs from "fs";
import path from "path";

import matter from "gray-matter";

// process.cwd points at to the overall proj folder, then posts dir.
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  // reading contents synchronously from directory (in one go)
  // returns back array of file names
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {

  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension

  // constructing an absolute path to the file. 
  const filePath = path.join(postsDirectory, `${postSlug}.md`);

  // reading contents of file  
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // data is matadata and content is the markdown content. 
  const { data, content } = matter(fileContent);

  // return back object containing data from a single post read from md file
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  // sort our posts based on date
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
