import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const { content, frontmatter } = await loadBlogPost(postSlug);
  const { title, publishedOn } = frontmatter;

  return (
    <article className={styles.wrapper}>
      {content ? (
        <>
          <BlogHero title={title} publishedOn={new Date(publishedOn)} />
          <div className={styles.page}>
            <MDXRemote source={content} />
          </div>
        </>
      ) : (
        <p>No post yet...</p>
      )}
    </article>
  );
}

export default BlogPost;
