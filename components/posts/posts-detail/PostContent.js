import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

import Image from "next/image";

import PostHeader from "./PostHeader";
import styles from "./PostContent.module.css";

const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
