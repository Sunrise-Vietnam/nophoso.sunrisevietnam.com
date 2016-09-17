export default (key)=>{
    return (window.i18n) ? window.i18n.t(key) : ''
}