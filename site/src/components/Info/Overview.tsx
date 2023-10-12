import type { FC } from "react";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export type OverViewProps = {
  readme?: string;
};

const OverView: FC<OverViewProps> = ({ readme }) => {
  if (!readme) {
    return <div>Error</div>;
  }
  return (
    <Markdown
      className="markdown-body"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className ?? "");
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n$/, "")}
              wrapLongLines={true}
              style={darcula}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {readme}
    </Markdown>
  );
};

export default OverView;
