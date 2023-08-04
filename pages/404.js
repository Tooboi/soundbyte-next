import Image from 'next/image';
import four from '../public/images/23.svg';

export default function Custom404() {
  return (
    <>
      <div class="bg-stone-900 flex items-center">
        <div class=" flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">

          <div class="">
          <h1 >404</h1>
            <Image src={four} alt="404cat" className="w-full h-12"></Image>
          </div>
        </div>
      </div>
    </>
  );
}
