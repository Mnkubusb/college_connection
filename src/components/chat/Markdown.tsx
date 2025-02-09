import toast from "react-hot-toast"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import copy from "copy-to-clipboard"
import  SyntaxHighlighter  from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";


interface MarkdownProps {
    content: string
}

const Markdown = ( { content }: MarkdownProps ) => {
   
    const handleCopy = (text : string) => {
        copy(text)
        toast.success("Copied to clipboard")
    }

    return ( 
        <ReactMarkdown remarkPlugins={[remarkGfm]}
        components={{code({node, className, children, ...props}){
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                <div>
                    <div className="flex w-full justify-end bg-white/5 p-2 rounded-t-md">
                    <button className="text-sm text-white/50"  onClick={()=> handleCopy(String(children).replace(/\n$/, ''))} >
                    Copy</button>
                    </div>
                    <SyntaxHighlighter
                      language={match[1]}
                      style={
                        atomOneDark
                      }
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )    
            }
        }}
        >
            {content}
        </ReactMarkdown>
     );
}
 
export default Markdown;