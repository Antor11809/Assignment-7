import Allproducts from "@/components/Allproducts";
import Hero from "@/components/Hero";
import Marque from "@/components/Marque";
import ProductSection from "@/components/ProductSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>

<Suspense fallback={<p>লোড হচ্ছে...</p>}>
  <Hero />
</Suspense>

  <Suspense fallback={<p>পণ্য লোড হচ্ছে...</p>}>
  <ProductSection />
</Suspense>

<Suspense fallback={<p>লোড হচ্ছে...</p>}>
<Allproducts/>
</Suspense>

    </div>
  );
}
