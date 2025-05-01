export const getAssetUrl = (path= "thumbnails") => {
    const appurls = process.env.APP_URL ?? ""
    return `${appurls}/${path}`
}   