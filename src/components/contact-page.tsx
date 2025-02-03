import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ContactPage = () => {
    return ( 
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full min-h-64 flex flex-col items-center justify-center mb-10">
                <h1 className="text-center md:text-6xl text-5xl font-semibold font-josefin">Contact Us</h1>
                <p className="text-center md:text-large text-base font-geist text-muted-foreground" >
                We&apos;re here to help you with any questions or concerns you may have.
                </p>
                <Badge className="mt-4 !py-1 rounded-full" variant={"secondary"} >
                    <p className="text-center uppercase">
                        Talk to US
                    </p>
                </Badge>
            </div>
            <div className="flex md:flex-row flex-col w-full justify-center gap-4 md:gap-20">
                <div className="flex flex-col justify-start gap-4 w-1/3">
                    <h2 className="text-left md:text-4xl text-3xl font-semibold font-josefin">
                        Send Us a Message
                    </h2>
                    <p className="text-left md:text-base text-medium font-geist text-muted-foreground">
                    Have a question, suggestion, or need support? Send us a message, and our team will get back to you as soon as possible. Whether it’s a general inquiry, technical issue, or feature request, we’re here to help! Reach us at support@collegeconnections.com or use the in-app chat for quick assistance. Your feedback helps us improve and build a better student community! 🚀
                    </p>
                </div>
                <div className="flex flex-col justify-center gap-4 w-1/3 bg-gray-600 rounded-lg ">

                </div>
            </div>
        </div>
     );
}
 
export default ContactPage;