export function isWX() {
    return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
}

export function isIOS() {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent.toLowerCase());
}

export function isAndroid() {
    return /(android|nexus)/i.test(navigator.userAgent.toLowerCase());
}

export function isWindows() {
    return /(Windows Phone|windows[\s+]phone)/i.test(navigator.userAgent.toLowerCase());
}
