# typedoc-plugin-module-wide-comments
### Plugin
A plugin for [TypeDoc](https://typedoc.org/)

This plugin allows you to add module comments without the need to use @packageDocumentation tag.

### Installation

```
npm install typedoc-plugin-module-wide-comments
```

### Usage
Specify the comment at the top of your module

```
/**
 * Here's alert module description.
 *
 */

import { FunctionComponent } from 'react'
import { store } from '../store'

/**
 * Dispatches an alert action.
 */
const alert = (value, { showCloseLink, alertType }) => {
	...
}

export default alert
```

And this comment 
> Here's alert module description.

will be displayed at the top of generated TypeDoc module page.