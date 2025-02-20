import React, { useCallback, useRef } from 'react'
import { DocSearchButton } from '@docsearch/react'
import Head from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import translations from '@theme/SearchTranslations'
let DocSearchModal = null
function DocSearch() {
  // We let user override default searchParameters if she wants to
  const searchButtonRef = useRef(null)
  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }
    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
      import('./styles.css'),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal
    })
  }, [])

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          defer
          src="https://widget.orbit.love/widget.js"
        />
        <script type="text/javascript">
          {`window.Widget = window.Widget || {};
        window.Widget = Object.assign({}, window.Widget, {
        baseUrl: "https://search.orbit.love/widget/1772063c-fd5c-46f3-8496-b790ebffaf7e",
        options: {
          docResultsLinkTarget: "_top",
        }
        });`}
        </script>
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={() => {
          window.Widget.toggleWidget()
        }}
        ref={searchButtonRef}
        translations={translations.button}
      />
    </>
  )
}
export default function SearchBar() {
  useDocusaurusContext()
  return <DocSearch />
}
