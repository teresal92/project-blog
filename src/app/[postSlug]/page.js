import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params }) {
  const slug = (await params).postSlug;

  const { frontmatter } = await loadBlogPost(slug);
  const { title, abstract } = frontmatter;

  return { title: `${title} - ${BLOG_TITLE}`, description: abstract };
}

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
            <MDXRemote
              source={content}
              components={{
                pre: CodeSnippet,
                DivisionGroupsDemo,
              }}
            />
          </div>
        </>
      ) : (
        <p>No post yet...</p>
      )}
    </article>
  );
}

export default BlogPost;
