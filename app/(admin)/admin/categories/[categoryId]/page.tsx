import { CategoryForm } from './components/category-form'
import prismadb from '@/lib/prismadb';
import { Category } from '@prisma/client';

export default async function Page({ params }: { params: { categoryId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let category: Category | null = null;
    // Validate if categoryId matches ObjectId pattern
    if (objectIdPattern.test(params.categoryId)) {
        // Redirect to the home page if it's not a valid ObjectId
        // redirect('/'); // Replace this with your home page URL
        // return null; // Return null since we don't want to render anything on this page
        category = await prismadb.category.findFirst({
            where: {
                id: params.categoryId
            }
        })
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <CategoryForm intialData={category} />
                </div>
            </div>
        </div>
    )
}
