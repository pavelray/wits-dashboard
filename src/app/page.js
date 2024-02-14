import Dashboad from "@/components/Business/Dashboard";

async function getData() {
  const res = await fetch("http://localhost:3000/api/siteMapData");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <section className="md:container md:mx-auto">
      <Dashboad data={data.data} />
    </section>
  );
}
