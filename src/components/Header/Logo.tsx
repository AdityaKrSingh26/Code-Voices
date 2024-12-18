import Image from "next/image"
import Link from "next/link"
import profileImg from "../../../public/profile-img.png"

const Logo = () => {
    return (
        <Link href="/" className=" items-center text-dark dark:text-light hidden sm:flex">
            <div className=" w-12 md:w-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray  mr-2 md:mr-4">
                <Image src={profileImg} alt="CodeBucks logo" className="w-full h-auto rounded-full" sizes="20vw" priority />
            </div>
            <span className="font-bold  text-lg md:text-xl text-dark dark:text-light">
                CodeVoices
            </span>
        </Link>
    )
}

export default Logo