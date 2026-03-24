export function imageLoaderUtility(image: string, sourceId: number ): string {
    if (sourceId === 1) {
        return `https://kusel1heidi.obs.eu-de.otc.t-systems.com/${image}`;
    } else {
        const url = stripBase64ImageHeader(image);
        return url;
    }
}

function stripBase64ImageHeader(base64: string): string {
    return base64.replace(/^data:image\/\w+;base64,/, '');
}