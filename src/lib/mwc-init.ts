import { MdFilledTonalButton } from '@material/web/button/filled-tonal-button.js'
import { MdIconButton } from '@material/web/iconbutton/icon-button.js'
import { MdSlider } from '@material/web/slider/slider.js'
import { MdRipple } from '@material/web/ripple/ripple.js'
import { MdIcon } from '@material/web/icon/icon.js'
import { MdElevation } from '@material/web/elevation/elevation.js'

// Register components
// We check for window existence because this code might run during SSR where window is undefined,
// though usually custom elements are only registered on client.
if (typeof window !== 'undefined') {
    if (!customElements.get('md-filled-tonal-button')) {
        customElements.define('md-filled-tonal-button', MdFilledTonalButton)
    }
    if (!customElements.get('md-icon-button')) {
        customElements.define('md-icon-button', MdIconButton)
    }
    if (!customElements.get('md-slider')) {
        customElements.define('md-slider', MdSlider)
    }
    if (!customElements.get('md-ripple')) {
        customElements.define('md-ripple', MdRipple)
    }
    if (!customElements.get('md-icon')) {
        customElements.define('md-icon', MdIcon)
    }
    if (!customElements.get('md-elevation')) {
        customElements.define('md-elevation', MdElevation)
    }
}
