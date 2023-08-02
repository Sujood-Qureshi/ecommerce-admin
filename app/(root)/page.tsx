import HeroSection from "@/Root Components/hero-section";
import ProductCard from "@/Root Components/product-card";
import SubBanner from "@/Root Components/sub-banner";
import getProducts from "@/actions/get-products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
    const Products = await getProducts({ isFeatured: true });
    return (
        <main className="relative">
            <HeroSection />
            <section className='my-20 px-10 xl:px-0 mx-auto overflow-x-hidden max-w-7xl'>
                <h2 className='mx-auto w-fit font-semibold text-3xl'>Featured Products</h2>
                <div className='flex gap-8 overflow-x-scroll scrollHidden py-20 mx-auto'>
                    <p className='text-lg my-auto font-medium hidden sm:block'>Our Products</p>
                    {Products.map((product) => (<div key={product.id} className='w-64'><ProductCard productData={product} /></div>))}
                </div>
            </section>
            <section className='grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto my-20 grid-cols-6 xl:px-0 px-10'>
                <SubBanner heading={'Style Collection for her'} para={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repudiandae laborum similique consequuntur?'} link={'/#'} imagePath={'assets/GirlPose.png'} male={false} />
                <SubBanner heading={'Style Collection for him'} para={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repudiandae laborum similique consequuntur?'} link={'/#'} imagePath={'assets/BoyPose.png'} male={true} />
            </section>
            <section className='my-20 px-10 xl:px-0 mx-auto overflow-x-hidden max-w-7xl'>
                <h2 className='mx-auto w-fit font-semibold text-3xl'>Popular Products</h2>
                <div className='flex gap-8 py-20 mx-auto lg:flex-wrap overflow-x-scroll scrollHidden'>
                    {Products.map((product) => (<div key={product.id} className='w-64'><ProductCard productData={product} /></div>))}
                </div>
            </section>
            <section className='grid grid-cols-6 gap-8 max-w-7xl mx-auto my-10 xl:px-0 px-10'>
                <div className={`col-span-6 flex flex-col md:flex-row rounded-md md:pt-4 md:pl-4 md:px-0 px-4 pt-4 bg-[#F9E7E6]`}>
                    <div className='flex flex-col justify-evenly gap-2 md:gap-0 md:w-3/5 md:pl-6'>
                        <h4 className='font-semibold md:text-4xl text-black uppercase'>Subscribe to the news</h4>
                        <p className='font-normal md:text-base text-gray-600'>{"Stay ahead of the curve and never miss out on the latest product releases! Subscribe to our news for exclusive updates, ensuring you're always in the know about our exciting new arrivals. Join now and be the first to discover what's next! 😊😊"}</p>
                        <Button className={cn('w-fit')}>
                            Subscribe
                        </Button>
                    </div>
                    <div className='md:w-2/5 h-80 relative'>
                        <Image
                        src={'/assets/Announcement.png'}
                        alt=""
                        fill
                        className='object-cover h-full mx-auto'
                        />
                    </div>
                </div>
            </section>
            <p>admin dashbaord</p>
            <Button className={cn("md:hidden")}>click me</Button>
            <UserButton afterSignOutUrl="/" />
        </main>
    )
}
