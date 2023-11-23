'use client';

import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { useProjectInfoContext } from '~/app/info/[name]/context';
import { Card, CardContent } from '~/components/ui/card';

import '~/styles/readme.css';

const OverView = () => {
  const { project } = useProjectInfoContext();

  if (!project?.readme?.content) {
    return <div>Error</div>;
  }
  return (
    <Card className='bg-accent'>
      <CardContent className='p-0'>
        <Markdown
          className='markdown-body'
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className ?? '');
              return match ? (
                // @ts-ignore
                <SyntaxHighlighter
                  {...rest}
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, '')}
                  wrapLongLines={true}
                  style={darcula}
                  language={match[1]}
                  PreTag='div'
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {project?.readme.content}
        </Markdown>
      </CardContent>
    </Card>
  );
};

export default OverView;
