import { ChevronDown } from "lucide-react"

export default function Category() {
    return(
        <div className="inline-block">
            <button className="inline-flex justify-center w-full hover:cursor-pointer bg-gray-200 inset-ring-2 inset-ring-gray-300 rounded-2xl p-1.5">
                All Categories
                <ChevronDown />
            </button>
            <menu>
                <div className="flex flex-col bg-gray-200 inset-ring-2 inset-ring-gray-300 rounded-2xl w-3xs">
                    <div className="py-3 px-4 bg-amber-200"><a href="#">Food</a></div>
                    <div className="py-3 px-4 bg-red-200"><a href="#">Guitar</a></div>
                    <div className="py-3 px-4 bg-blue-200"><a href="#">Vegetable</a></div>
                </div>
            </menu>
        </div>
        
    )
}