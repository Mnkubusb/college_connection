"use client"
import { TextAnimate } from "../magicui/text-animate";

type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

const ChatMessage = ({ children , animation }: { children:string , animation: AnimationVariant }) => {
    return (
        <TextAnimate animation={animation} by="word" once>
            {children}
        </TextAnimate>
    );
}

export default ChatMessage;