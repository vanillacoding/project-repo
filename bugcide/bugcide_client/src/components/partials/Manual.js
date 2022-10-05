import React from 'react';
import LinkList from './LinkList';
import '../css/manual.scss';

const Manual = (props) => {
  const { projectToken } = props;

  return (
    <div className="manual-box">
      <section>
        <h3 className="manual-title">Getting Started</h3>
        <p className="manual-desc">
          Let's get started using Bugcide to collect errors in your code!
        </p>
      </section>
      <LinkList />
      <section className="code-area">
        <h4 className="code-title">For Vanilla Javascript</h4>
        <p className="code-desc ko">
          바닐라 자바스크립트 프로젝트를 위해 bugcide.vanilla.js가 제공됩니다.<br />
          GitHub에서 가장 최신 버전의 bugcide.vanilla.js를 다운받을 수 있습니다.<br />
          또한 jsDelivr CDN으로 간단히 참조할 수 있습니다.
        </p>
        <p className="code-desc">
          You need to include bugcide.vanilla.js first.<br />
          You can download the latest version of bugcide.vanilla.js on GitHub.<br />
          bugcide.vanilla.js built files are also available through jsDelivr.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.4/dist/bugcide.vanilla.js&#34;&gt;&lt;&#47;script&gt;
          </code>
        </pre>
        <p className="code-desc ko">
          Minified 버전도 제공됩니다.
        </p>
        <p className="code-desc">
          We have minified version as well.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.4/dist/bugcide.vanilla.min.js&#34;&gt;&lt;&#47;script&gt;
          </code>
        </pre>
        <p className="code-desc ko">
          아래의 코드를 복사하여 자바스크립트 프로젝트에 붙여넣으면 Bugcide 트래킹이 시작됩니다.
        </p>
        <p className="code-desc">
          The examples below show how to load bugcide.vanilla.js with script tag.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.4/dist/bugcide.vanilla.js&#34;&gt;&lt;&#47;script&gt;<br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;new Bugcide().init(&#123; projectToken: &#39;{projectToken}&#39; &#125;);<br />
            &lt;&#47;script&gt;
          </code>
        </pre>
      </section>
      <section className="code-area">
        <h4 className="code-title">For React.js</h4>
        <p className="code-desc ko">
          npm을 통해 가장 최신 버전의 Bugcide 패키지를 설치합니다.
        </p>
        <p className="code-desc">
          You can easily install the latest version of Bugcide package via npm.
        </p>
        <pre className="code-box">
          <code>
            npm install bugcide --save-dev
          </code>
        </pre>
        <p className="code-desc">
          <strong>- index.js</strong>
        </p>
        <pre className="code-box">
          <code>
            import React from 'react'&#59;<br />
            import &#123; render &#125; from 'react-dom'&#59;<br />
            import App from './src/App'&#59;<br />
            import Bugcide from 'bugcide';<br />
            <br />
            new Bugcide().init(&#123; projectToken: '{projectToken}' &#125;)&#59;<br />
            <br />
            render(&lt;App /&gt;, document.getElementById('root'))&#59;
          </code>
        </pre>
        <p className="code-desc ko">
          컴파일 과정에서 발생하는 에러를 감지하기 위해서는 bugcide-webpack-plugin도 별도로 설치해야 합니다.
        </p>
        <p className="code-desc">
          If you want to catch all compile error, you need to install bugcide-webpack-plugin as well.
        </p>
        <pre className="code-box">
          <code>
            npm install bugcide-webpack-plugin --save-dev
          </code>
        </pre>
        <p className="code-desc">
          <strong>- webpack.config.js</strong>
        </p>
        <pre className="code-box">
          <code>
            const bugcidePlugin = require('bugcide-webpack-plugin');<br/><br/>

            module.exports = &#123;<br/>
            &nbsp;&nbsp;...<br/>
            &nbsp;&nbsp;plugins: &#91;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;new bugcidePlugin(&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;projectToken: '{projectToken}'<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;)<br/>
            &nbsp;&nbsp;&#93;<br/>
            &#125;;<br/>
          </code>
        </pre>
      </section>
    </div>
  );
};

export default Manual;

