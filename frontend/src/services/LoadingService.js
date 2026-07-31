let show = () => {};

let hide = () => {};

export function registerLoadingFunctions(showFn, hideFn) {

    show = showFn;

    hide = hideFn;

}

export function showLoading() {

    show();

}

export function hideLoading() {

    hide();

}