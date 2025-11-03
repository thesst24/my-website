import Category from '@/components/dropdown/category';
import Price from '@/components/dropdown/price';

export default function Gdropdown() {
    return(
        <div className="ml-16 mr-16 z-1">
            <h2>Gromues/Allcategory</h2>
            <div className='flex flex-row m-4'>
                <div className="px-3"><Category/> </div>
                <div className="px-3"> <Price /></div>
            </div>
        </div>
    )
}