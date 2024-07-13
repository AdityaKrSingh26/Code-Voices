import FeaturedPosts from "@/components/Home/FeaturedPosts";
import HomeCoverSection from "@/components/Home/HomeCoverSection";
import RecentPosts from "@/components/Home/RecentPosts";

import AllBlogs from "@/utils/AllBlogs"

export default function Home() {
  return (
    <main className="">
      <HomeCoverSection blogs={AllBlogs} />
      <FeaturedPosts blogs={AllBlogs} />
      <RecentPosts blogs={AllBlogs} />
    </main>
  );
}
