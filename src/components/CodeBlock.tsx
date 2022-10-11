import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock = {
  code({ children, className }: any) {
    let language = 'jsx';
    if (className) {
      // eslint-disable-next-line prefer-destructuring
      language = className.split('-')[1];
    }

    return (
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        style={coy}
        PreTag="span"
        language={language}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};
