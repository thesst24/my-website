import ItemP from '@/components/ItemP';
import Silk from '@/public/silk.png';
import banana from '@/public/banana.png';
import Nesquik from '@/public/nesquik.png';
import melon from '@/public/melon.png';
import carrot from '@/public/carrot.png';
import Cheetos from '@/public/Cheetos.png';
import Lay from '@/public/Lay.png';
import M_M from '@/public/m&m.png';
import Pringles from '@/public/pringles.png';
import snickers from '@/public/snickers.png';
import Twix from '@/public/Twix.png';

export default function Product() {
    return(
      <div className="bg-blue-900 flex justify-center items-center flex-wrap mr-16 ml-16 rounded-3xl" >
                <ItemP 
                    image={Silk}
                    title="Silk ALMOND"
                    size="1set"
                    price="15,000 Kip" />
                    <ItemP 
                    image={banana}
                    title="Banana"
                    size="1kg"
                    price="10,000 Kip" />
                    <ItemP 
                    image={Nesquik}
                    title="Nestle Nesquik"
                    size="1set"
                    price="15,000 Kip" />
                    <ItemP 
                    image={melon}
                    title="Melon"
                    size="1kg"
                    price="25,000 Kip" />
                    <ItemP 
                    image={carrot}
                    title="Carrot"
                    size="1kg"
                    price="15,000 Kip" />
                    <ItemP 
                    image={Lay}
                    title="Lay Wavy"
                    size="1set"
                    price="55,000 Kip" />
                    <ItemP 
                    image={Cheetos}
                    title="Cheetos bag of bones"
                    size="1set"
                    price="60,000 Kip" />
                    <ItemP 
                    image={Twix}
                    title="Twix"
                    size="1set"
                    price="35,000 Kip" />
                    <ItemP 
                    image={M_M}
                    title="m&m's"
                    size="1set"
                    price="40,000 Kip" />
                    <ItemP 
                    image={Pringles}
                    title="Pringles POTATO"
                    size="1set"
                    price="100,000 Kip" />
                    <ItemP 
                    image={snickers}
                    title="Snickers"
                    size="1set"
                    price="115,000 Kip" />
        </div>
               
    )
}