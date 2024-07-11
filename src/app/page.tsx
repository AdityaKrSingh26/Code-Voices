import FeaturedPosts from "@/components/Home/FeaturedPosts";
import HomeCoverSection from "@/components/Home/HomeCoverSection";
import RecentPosts from "@/components/Home/RecentPosts";

export default function Home() {
  return (
    <main className="">
      <HomeCoverSection />
      <FeaturedPosts />
      <RecentPosts />
    </main>
  );
}
