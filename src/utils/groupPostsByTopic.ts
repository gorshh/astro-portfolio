import type { CollectionEntry } from "astro:content";

type TopicGroup = {
  topic: string; // React
  subtopics: {
    [subtopic: string]: CollectionEntry<"posts">[];
  };
};

export function groupPostsByTopic(posts: CollectionEntry<"posts">[]) {
  const result: Record<string, TopicGroup> = {};

  for (const post of posts) {
    const fullTopic = post.data.topic;
    if (!fullTopic) continue;

    const [main, sub = 'General'] = fullTopic.split('/');

    if (!result[main]) {
      result[main] = {
        topic: main,
        subtopics: {}
      };
    }

    if (!result[main].subtopics[sub]) {
      result[main].subtopics[sub] = [];
    }

    result[main].subtopics[sub].push(post);
  }

  return result;
}
