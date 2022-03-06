import { memo } from "react";

function HomeScreen() {
  return (
    <main>
      <h1>@ethicdevs/react-global-state-hooks</h1>
      <h2>
        Supercharge your react app with simple Flux Global State and eliminate
        the need for redux!{" "}
        <span role="img" aria-label={"zap"}>
          ⚡️
        </span>
      </h2>
      <h3>Why?</h3>
      <div>
        <ul>
          <li>
            <a
              href={"https://cost-of-modules.herokuapp.com/result?p=redux"}
              target={"_blank"}
              rel={"noopener noreferer noreferrer"}
            >
              Redux, Unpacked Size: 169 kB, Minified: 4.3 kB, Minified +
              Gzipped: 1.6 kB
            </a>
          </li>
          <li>
            <a
              href={
                "https://cost-of-modules.herokuapp.com/result?p=redux-thunk"
              }
              target={"_blank"}
              rel={"noopener noreferer noreferrer"}
            >
              redux-thunk, Unpacked Size: 32.1 kB, Minified: 352 B, Minified +
              Gzipped: 236 B
            </a>
          </li>
          <li>
            <a
              href={
                "https://cost-of-modules.herokuapp.com/result?p=react-redux"
              }
              target={"_blank"}
              rel={"noopener noreferer noreferrer"}
            >
              react-redux, Unpacked Size: 297 kB, Minified: 16.2 kB, Minified +
              Gzipped: 5.4 kB
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <p>
          <strong>Total for Redux in React:</strong> Unpacked Size: 498.1 kB!,
          Minified: 20.85 kB, Minified + Gzipped: 7.23 kB
        </p>
      </div>
      <hr />
      <div>
        <a
          href={
            "https://cost-of-modules.herokuapp.com/result?p=@ethicdevs/react-global-state-hooks"
          }
          target={"_blank"}
          rel={"noopener noreferer noreferrer"}
        >
          <strong>
            This lib, Unpacked Size: 35.5 kB, Minified: 5.9 kB, Minified +
            Gzipped: 1.6 kB
          </strong>
        </a>
      </div>
      <hr />
      <h4>Features</h4>
      <div>
        <ul>
          <li>
            Builds on your existing knowledge, redux hooks API, without redux
          </li>
          <li>Multi Modules Global State without pain!</li>
          <li>Written in TypeScript so fully typed and free typings</li>
          <li>Written from scratch to do one thing, well</li>
          <li>No dependencies included</li>
          <li>Based on React's own Reducer' type (useReducer)</li>
          <li>React Native compatible!</li>
          <li>Simple hook/helper based API</li>
          <li>Selectors (avoid useless re-renders, query in component)</li>
          <li>Built-in support for thunk aka. dispatching a Promise</li>
          <li>Lightweight, no middleware support</li>
          <li>Small built-in/configurable console devtool/logger</li>
          <li>
            Easy to understand the source code, written for humans{" "}
            <span role="img" aria-label={"waving_hand"}>
              👋
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p>
          <em>&lt;joke mostly="true"&gt;</em>
          Why would anyone continue to use redux, react-redux and redux-thunk
          while you can enjoy this, which is 4.51x less weight and complexity ?
          <span role="img" aria-label={"zap"}>
            ⚡️
          </span>
          <em>&lt;/joke&gt;</em>
        </p>
      </div>
    </main>
  );
}

HomeScreen.getLayout = ({ children }: any) => <>{children}</>;

export default memo(HomeScreen);
