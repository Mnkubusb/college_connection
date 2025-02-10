import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import copy from "copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy } from "lucide-react";
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  const handleCopy = (text: string) => {
    copy(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="w-full max-w-350px overflow-x-hidden break-words">
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
        components={{
          strong: ({ children }) => <strong className="text-white font-semibold text-medium">{children}</strong>,
          code({ node, className, children, ...rest }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="my-4 bg-[#1E1E1E] rounded-md scroll">
                <div className="flex justify-between items-center bg-[#1E1E1E] p-2 rounded-t-md border-b-2">
                  <span className="text-white/60 text-sm">{match[1]}</span>
                  <button
                    className="text-sm text-white/60 hover:text-white flex justify-center items-center gap-1"
                    onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
                <SyntaxHighlighter
                  style={dracula}
                  PreTag='div'
                  language={match[1]}
                  customStyle={{
                    padding: "0.75rem",
                    background: "#1E1E1E",
                    fontSize: "0.75rem", // 🔹 Smaller text size for better fit
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    maxWidth: "100%"
                  }}
                >
                  {String(children).trim()}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className=" bg-zinc-700 px-2 py-0.5 rounded text-white text-xs break-words">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
