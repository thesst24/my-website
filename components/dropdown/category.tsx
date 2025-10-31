import { ChevronDown } from "lucide-react"

export default function Category() {
    return(
        <div className="inline-block">
            <button className="inline-flex justify-center w-full hover:cursor-pointer bg-gray-200 border-solid-2 border-amber-300">
                All Categories
                <ChevronDown />
            </button>
        </div>
    )
}