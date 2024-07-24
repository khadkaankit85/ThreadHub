import favicon from './images/favicon.png';
import icon from './images/icon.png';
import adaptiveIcon from './images/adaptive-icon.png';
import angryFaceWithDarkBG from "./images/icons8-angry-face-meme-dark.js"
import angryFaceWithLightBG from "./images/icons8-angry-face-meme.svg"
import backButtonWithDarkBG from "./images/icons8-back-dark.svg"
import backButtonWithLightBG from "./images/icons8-back-dark.svg"
import FavouriteIcon from "./images/icons8-favorite-folder.svg"
import notBadMeme from "./images/icons8-not-bad-meme-dark.svg"
import scaredFaceMeme from "./images/icons8-scared-face-meme-dark.svg"
import shrugIcon from "./images/icons8-shrug-emoticon-dark.svg"
import wink from "./images/icons8-wink.svg"


const likedIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="100px" height="100px"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,47.30078l-0.64062,-0.53125c-1.21484,-1.01562 -2.85937,-2.11719 -4.76562,-3.39062c-7.42578,-4.97266 -17.59375,-11.77734 -17.59375,-23.37891c0,-7.16797 5.83203,-13 13,-13c3.89453,0 7.54297,1.73438 10,4.69922c2.45703,-2.96484 6.10547,-4.69922 10,-4.69922c7.16797,0 13,5.83203 13,13c0,11.60156 -10.16797,18.40625 -17.59375,23.37891c-1.90625,1.27344 -3.55078,2.375 -4.76562,3.39063z"></path></g></g></svg>`
const unlikedIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="100px" height="100px"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M15,7c-7.14545,0 -13,5.85455 -13,13c0,14.7619 16.67842,22.03345 22.35938,26.76758l0.64063,0.5332l0.64063,-0.5332c5.68096,-4.73413 22.35938,-12.00567 22.35938,-26.76758c0,-7.14545 -5.85455,-13 -13,-13c-4.05969,0 -7.64151,1.89031 -10,4.84766c-2.35849,-2.95735 -5.94031,-4.84766 -10,-4.84766zM15,9c3.86667,0 7.23872,1.92423 9.15625,4.9375l0.84375,1.32422l0.84375,-1.32422c1.91753,-3.01327 5.28958,-4.9375 9.15625,-4.9375c6.05454,0 11,4.94546 11,11c0,12.88767 -14.40085,19.57207 -21,24.77734c-6.59915,-5.20527 -21,-11.88967 -21,-24.77734c0,-6.05454 4.94545,-11 11,-11z"></path></g></g></svg>`
const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32"
style="fill:#FFFFFF;">
<path d="M28,14a6.0048,6.0048,0,0,1-6,6H19V17a1,1,0,0,0-2,0v7.5859l1.293-1.2929a1,1,0,0,1,1.414,1.414l-3,3a.9995.9995,0,0,1-1.4146,0l-3-3a1,1,0,0,1,1.414-1.414L15,24.5859V20H9a5,5,0,0,1-.94-9.91,4.9416,4.9416,0,0,1,3.98.95,1.0012,1.0012,0,1,0,1.23-1.58,6.7737,6.7737,0,0,0-4.6-1.44,7.0021,7.0021,0,0,1,12.68.02A6.9145,6.9145,0,0,1,22,11a1,1,0,0,0,2,0,9.0182,9.0182,0,0,0-.43-2.75c0-.01-.01-.03-.01-.04A6.0114,6.0114,0,0,1,28,14Z"></path>
</svg>`
const nextIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64"
style="fill:#FFFFFF;">
<path d="M58,32c0,14.359-11.641,26-26,26S6,46.359,6,32C6,17.641,17.641,6,32,6S58,17.641,58,32z M41.713,30.001L28.016,16.168	l-2.983,2.665L35.63,32L25.032,45.168l2.983,2.665l13.698-13.834L43.692,32L41.713,30.001z"></path>
</svg>`
const previousIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64"
style="fill:#FFFFFF;">
<path d="M6,32C6,17.641,17.641,6,32,6s26,11.641,26,26c0,14.359-11.641,26-26,26S6,46.359,6,32z M38.968,18.832l-2.983-2.665	L22.287,30.001L20.308,32l1.979,1.999l13.698,13.834l2.983-2.665L28.37,32L38.968,18.832z"></path>
</svg>`

const toggleSetupIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"
style="fill:#FFFFFF;">
<path d="M 24.625 2.03125 C 19.472656 2.113281 14.289063 3.894531 10.0625 7.5 C 4.941406 11.867188 2.003906 18.269531 2 25 C 2 25.671875 1.992188 26.355469 2.09375 27.09375 L 2.1875 28 L 8.21875 28 L 8.125 26.875 C 7.113281 17.539063 13.851563 9.164063 23.1875 8.15625 C 28.925781 7.535156 34.582031 9.890625 38.21875 14.375 L 33.59375 19 L 47 19 L 47 5.59375 L 42.5 10.09375 C 37.863281 4.65625 31.25 1.925781 24.625 2.03125 Z M 41.78125 22 L 41.875 23.125 C 42.886719 32.460938 36.148438 40.835938 26.8125 41.84375 C 21.074219 42.464844 15.417969 40.109375 11.78125 35.625 L 16.40625 31 L 3 31 L 3 44.40625 L 7.5 39.90625 C 15.742188 49.570313 30.273438 50.742188 39.9375 42.5 C 45.058594 38.132813 47.996094 31.730469 48 25 C 48 24.328125 48.007813 23.644531 47.90625 22.90625 L 47.8125 22 Z"></path>
</svg>`
export default { FavouriteIcon }
export {
    favicon,
    icon,
    adaptiveIcon,
    angryFaceWithDarkBG,
    angryFaceWithLightBG,
    backButtonWithDarkBG,
    backButtonWithLightBG,
    FavouriteIcon,
    notBadMeme,
    scaredFaceMeme,
    shrugIcon,
    wink,
    likedIcon,
    unlikedIcon,
    downloadIcon,
    nextIcon,
    previousIcon,
    toggleSetupIcon
}
