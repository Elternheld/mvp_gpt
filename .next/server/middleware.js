// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[826],{

/***/ 474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./node_modules/@clerk/nextjs/dist/esm/server/index.js
var server_namespaceObject = {};
__webpack_require__.r(server_namespaceObject);

// NAMESPACE OBJECT: ./middleware.ts
var middleware_namespaceObject = {};
__webpack_require__.r(middleware_namespaceObject);
__webpack_require__.d(middleware_namespaceObject, {
  config: () => (config),
  "default": () => (middleware)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/globals.js
async function registerInstrumentation() {
    if ("_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && _ENTRIES.middleware_instrumentation.register) {
        try {
            await _ENTRIES.middleware_instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/utils.js
/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":")[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, "/api")) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? addPathSuffix(pathname, "/") : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":")[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/@edge-runtime/cookies/index.js
var _edge_runtime_cookies = __webpack_require__(492);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
 //# sourceMappingURL=cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        validateURL(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new NextURL(url, {
            headers: toNodeOutgoingHttpHeaders(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _edge_runtime_cookies.RequestCookies(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/response.js



const response_INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[response_INTERNALS] = {
            cookies: new _edge_runtime_cookies.ResponseCookies(this.headers),
            url: init.url ? new NextURL(init.url, {
                headers: toNodeOutgoingHttpHeaders(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[response_INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", validateURL(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", validateURL(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function relativizeURL(url, base) {
    const baseURL = typeof base === "string" ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, "") : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc"; //# sourceMappingURL=app-router-headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/internal-utils.js

const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound",
    NEXT_RSC_UNION_QUERY
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === "string";
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
/**
 * Headers that are set by the Next.js server and should be stripped from the
 * request headers going to the user's application.
 */ const INTERNAL_HEADERS = (/* unused pure expression or super */ null && ([
    "x-invoke-path",
    "x-invoke-status",
    "x-invoke-error",
    "x-invoke-query",
    "x-invoke-output",
    "x-middleware-invoke"
]));
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */ function stripInternalHeaders(headers) {
    for (const key of INTERNAL_HEADERS){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, "$1") : pathname;
} //# sourceMappingURL=app-paths.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
// in seconds
const CACHE_ONE_YEAR = 31536000;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-action-proxy";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ("The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead."));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    "app",
    "pages",
    "components",
    "lib",
    "src"
]));
const ESLINT_PROMPT_VALUES = [
    {
        title: "Strict",
        recommended: true,
        config: {
            extends: "next/core-web-vitals"
        }
    },
    {
        title: "Base",
        config: {
            extends: "next"
        }
    },
    {
        title: "Cancel",
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        server: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler
        ],
        nonClientServerTarget: [
            // plus middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js


/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookes = new _edge_runtime_cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookes.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore.call(fetch)) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookes.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _edge_runtime_cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookes, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/api-utils/index.js


/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(842);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js





function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return MutableRequestCookiesAdapter.wrap(cookies, onUpdateCookies);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        function defaultOnUpdateCookies(cookies) {
            if (res) {
                res.setHeader("Set-Cookie", cookies);
            }
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/async-local-storage.js
const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/request-async-storage.external.js

const requestAsyncStorage = createAsyncLocalStorage(); //# sourceMappingURL=request-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/adapter.js















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
}
const adapter_FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
async function adapter(params) {
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== "undefined";
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === "string" ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = normalizeRscPath(params.request.url, true);
    const requestUrl = new NextURL(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        if (key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX)) {
            const normalizedKey = key.substring(NEXT_QUERY_PARAM_PREFIX.length);
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    const requestHeaders = fromNodeOutgoingHttpHeaders(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of adapter_FLIGHT_PARAMETERS){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl =  false ? 0 : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== "development",
            fetchCacheKeyPrefix: undefined,
            dev: "production" === "development",
            requestHeaders: params.request.headers,
            requestProtocol: "https",
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: "development-id"
                    }
                };
            }
        });
    }
    const event = new NextFetchEvent({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    // we only care to make async storage available for middleware
    const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
    if (isMiddleware) {
        response = await RequestAsyncStorageWrapper.wrap(requestAsyncStorage, {
            req: request,
            renderOpts: {
                onUpdateCookies: (cookies)=>{
                    cookiesFromResponse = cookies;
                },
                // @ts-expect-error: TODO: investigate why previewProps isn't on RenderOpts
                previewProps: (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                    previewModeId: "development-id",
                    previewModeEncryptionKey: "",
                    previewModeSigningKey: ""
                }
            }
        }, ()=>params.handler(request, event));
    } else {
        response = await params.handler(request, event);
    }
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError("Expected an instance of Response to be returned");
    }
    if (response && cookiesFromResponse) {
        response.headers.set("set-cookie", cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new NextURL(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (true) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set("x-middleware-rewrite", String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = relativizeURL(String(rewriteUrl), String(requestUrl));
        if (isDataReq && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(undefined && 0)) {
            response.headers.set("x-nextjs-rewrite", relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new NextURL(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set("Location", String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : NextResponse.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[waitUntilSymbol]),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-7ELT755Q.mjs
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg)=>{
    throw TypeError(msg);
};
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __accessCheck = (obj, member, msg)=>member.has(obj) || __typeError("Cannot " + msg);
var chunk_7ELT755Q_privateGet = (obj, member, getter)=>(__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var chunk_7ELT755Q_privateAdd = (obj, member, value)=>member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var chunk_7ELT755Q_privateSet = (obj, member, value, setter)=>(__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var chunk_7ELT755Q_privateMethod = (obj, member, method)=>(__accessCheck(obj, member, "access private method"), method);
 //# sourceMappingURL=chunk-7ELT755Q.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/url.mjs




 //# sourceMappingURL=url.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-N2V3PKFE.mjs
// src/retry.ts
var defaultOptions = {
    initialDelay: 125,
    maxDelayBetweenRetries: 0,
    factor: 2,
    shouldRetry: (_, iteration)=>iteration < 5,
    retryImmediately: false,
    jitter: true
};
var RETRY_IMMEDIATELY_DELAY = 100;
var sleep = async (ms)=>new Promise((s)=>setTimeout(s, ms));
var applyJitter = (delay, jitter)=>{
    return jitter ? delay * (1 + Math.random()) : delay;
};
var createExponentialDelayAsyncFn = (opts)=>{
    let timesCalled = 0;
    const calculateDelayInMs = ()=>{
        const constant = opts.initialDelay;
        const base = opts.factor;
        let delay = constant * Math.pow(base, timesCalled);
        delay = applyJitter(delay, opts.jitter);
        return Math.min(opts.maxDelayBetweenRetries || delay, delay);
    };
    return async ()=>{
        await sleep(calculateDelayInMs());
        timesCalled++;
    };
};
var retry = async (callback, options = {})=>{
    let iterations = 0;
    const { shouldRetry, initialDelay, maxDelayBetweenRetries, factor, retryImmediately, jitter } = {
        ...defaultOptions,
        ...options
    };
    const delay = createExponentialDelayAsyncFn({
        initialDelay,
        maxDelayBetweenRetries,
        factor,
        jitter
    });
    while(true){
        try {
            return await callback();
        } catch (e) {
            iterations++;
            if (!shouldRetry(e, iterations)) {
                throw e;
            }
            if (retryImmediately && iterations === 1) {
                await sleep(applyJitter(RETRY_IMMEDIATELY_DELAY, jitter));
            } else {
                await delay();
            }
        }
    }
};
 //# sourceMappingURL=chunk-N2V3PKFE.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/retry.mjs


 //# sourceMappingURL=retry.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-I6MTSTOF.mjs
// src/constants.ts
var chunk_I6MTSTOF_LEGACY_DEV_INSTANCE_SUFFIXES = (/* unused pure expression or super */ null && ([
    ".lcl.dev",
    ".lclstage.dev",
    ".lclclerk.com"
]));
var CURRENT_DEV_INSTANCE_SUFFIXES = (/* unused pure expression or super */ null && ([
    ".accounts.dev",
    ".accountsstage.dev",
    ".accounts.lclclerk.com"
]));
var DEV_OR_STAGING_SUFFIXES = [
    ".lcl.dev",
    ".stg.dev",
    ".lclstage.dev",
    ".stgstage.dev",
    ".dev.lclclerk.com",
    ".stg.lclclerk.com",
    ".accounts.lclclerk.com",
    "accountsstage.dev",
    "accounts.dev"
];
var LOCAL_ENV_SUFFIXES = (/* unused pure expression or super */ null && ([
    ".lcl.dev",
    "lclstage.dev",
    ".lclclerk.com",
    ".accounts.lclclerk.com"
]));
var STAGING_ENV_SUFFIXES = (/* unused pure expression or super */ null && ([
    ".accountsstage.dev"
]));
var LOCAL_API_URL = "https://api.lclclerk.com";
var STAGING_API_URL = "https://api.clerkstage.dev";
var PROD_API_URL = "https://api.clerk.com";
function iconImageUrl(id, format = "svg") {
    return `https://img.clerk.com/static/${id}.${format}`;
}
 //# sourceMappingURL=chunk-I6MTSTOF.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-G3VP5PJE.mjs



// src/keys.ts
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
var PUBLISHABLE_FRONTEND_API_DEV_REGEX = /^(([a-z]+)-){2}([0-9]{1,2})\.clerk\.accounts([a-z.]*)(dev|com)$/i;
function buildPublishableKey(frontendApi) {
    const isDevKey = PUBLISHABLE_FRONTEND_API_DEV_REGEX.test(frontendApi) || frontendApi.startsWith("clerk.") && LEGACY_DEV_INSTANCE_SUFFIXES.some((s)=>frontendApi.endsWith(s));
    const keyPrefix = isDevKey ? PUBLISHABLE_KEY_TEST_PREFIX : PUBLISHABLE_KEY_LIVE_PREFIX;
    return `${keyPrefix}${isomorphicBtoa(`${frontendApi}$`)}`;
}
function chunk_G3VP5PJE_parsePublishableKey(key, options = {}) {
    key = key || "";
    if (!key || !isPublishableKey(key)) {
        if (options.fatal && !key) {
            throw new Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
        }
        if (options.fatal && !isPublishableKey(key)) {
            throw new Error("Publishable key not valid.");
        }
        return null;
    }
    const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
    let frontendApi = isomorphicAtob(key.split("_")[2]);
    frontendApi = frontendApi.slice(0, -1);
    if (options.proxyUrl) {
        frontendApi = options.proxyUrl;
    } else if (instanceType !== "development" && options.domain) {
        frontendApi = `clerk.${options.domain}`;
    }
    return {
        instanceType,
        frontendApi
    };
}
function isPublishableKey(key = "") {
    try {
        const hasValidPrefix = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
        const hasValidFrontendApiPostfix = isomorphicAtob(key.split("_")[2] || "").endsWith("$");
        return hasValidPrefix && hasValidFrontendApiPostfix;
    } catch  {
        return false;
    }
}
function createDevOrStagingUrlCache() {
    const devOrStagingUrlCache = /* @__PURE__ */ new Map();
    return {
        isDevOrStagingUrl: (url)=>{
            if (!url) {
                return false;
            }
            const hostname = typeof url === "string" ? url : url.hostname;
            let res = devOrStagingUrlCache.get(hostname);
            if (res === void 0) {
                res = DEV_OR_STAGING_SUFFIXES.some((s)=>hostname.endsWith(s));
                devOrStagingUrlCache.set(hostname, res);
            }
            return res;
        }
    };
}
function isDevelopmentFromPublishableKey(apiKey) {
    return apiKey.startsWith("test_") || apiKey.startsWith("pk_test_");
}
function isProductionFromPublishableKey(apiKey) {
    return apiKey.startsWith("live_") || apiKey.startsWith("pk_live_");
}
function chunk_G3VP5PJE_isDevelopmentFromSecretKey(apiKey) {
    return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function isProductionFromSecretKey(apiKey) {
    return apiKey.startsWith("live_") || apiKey.startsWith("sk_live_");
}
async function chunk_G3VP5PJE_getCookieSuffix(publishableKey, subtle = globalThis.crypto.subtle) {
    const data = new TextEncoder().encode(publishableKey);
    const digest = await subtle.digest("sha-1", data);
    const stringDigest = String.fromCharCode(...new Uint8Array(digest));
    return isomorphicBtoa(stringDigest).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
}
var chunk_G3VP5PJE_getSuffixedCookieName = (cookieName, cookieSuffix)=>{
    return `${cookieName}_${cookieSuffix}`;
};
 //# sourceMappingURL=chunk-G3VP5PJE.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/keys.mjs





 //# sourceMappingURL=keys.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-UEY4AZIP.mjs

// src/deprecated.ts
var displayedWarnings = /* @__PURE__ */ new Set();
var chunk_UEY4AZIP_deprecated = (fnName, warning, key)=>{
    const hideWarning = isTestEnvironment() || isProductionEnvironment();
    const messageId = key ?? fnName;
    if (displayedWarnings.has(messageId) || hideWarning) {
        return;
    }
    displayedWarnings.add(messageId);
    console.warn(`Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`);
};
var deprecatedProperty = (cls, propName, warning, isStatic = false)=>{
    const target = isStatic ? cls : cls.prototype;
    let value = target[propName];
    Object.defineProperty(target, propName, {
        get () {
            chunk_UEY4AZIP_deprecated(propName, warning, `${cls.name}:${propName}`);
            return value;
        },
        set (v) {
            value = v;
        }
    });
};
var deprecatedObjectProperty = (obj, propName, warning, key)=>{
    let value = obj[propName];
    Object.defineProperty(obj, propName, {
        get () {
            chunk_UEY4AZIP_deprecated(propName, warning, key);
            return value;
        },
        set (v) {
            value = v;
        }
    });
};
 //# sourceMappingURL=chunk-UEY4AZIP.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/deprecated.mjs



 //# sourceMappingURL=deprecated.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-NT4JRXL3.mjs
// src/error.ts
function isUnauthorizedError(e) {
    const status = e?.status;
    const code = e?.errors?.[0]?.code;
    return code === "authentication_invalid" && status === 401;
}
function isCaptchaError(e) {
    return [
        "captcha_invalid",
        "captcha_not_enabled",
        "captcha_missing_token"
    ].includes(e.errors[0].code);
}
function is4xxError(e) {
    const status = e?.status;
    return !!status && status >= 400 && status < 500;
}
function isNetworkError(e) {
    const message = (`${e.message}${e.name}` || "").toLowerCase().replace(/\s+/g, "");
    return message.includes("networkerror");
}
function isKnownError(error) {
    return isClerkAPIResponseError(error) || isMetamaskError(error) || isClerkRuntimeError(error);
}
function isClerkAPIResponseError(err) {
    return "clerkError" in err;
}
function isClerkRuntimeError(err) {
    return "clerkRuntimeError" in err;
}
function isReverificationCancelledError(err) {
    return isClerkRuntimeError(err) && err.code === "reverification_cancelled";
}
function isMetamaskError(err) {
    return "code" in err && [
        4001,
        32602,
        32603
    ].includes(err.code) && "message" in err;
}
function isUserLockedError(err) {
    return isClerkAPIResponseError(err) && err.errors?.[0]?.code === "user_locked";
}
function isPasswordPwnedError(err) {
    return isClerkAPIResponseError(err) && err.errors?.[0]?.code === "form_password_pwned";
}
function parseErrors(data = []) {
    return data.length > 0 ? data.map(chunk_NT4JRXL3_parseError) : [];
}
function chunk_NT4JRXL3_parseError(error) {
    return {
        code: error.code,
        message: error.message,
        longMessage: error.long_message,
        meta: {
            paramName: error?.meta?.param_name,
            sessionId: error?.meta?.session_id,
            emailAddresses: error?.meta?.email_addresses,
            identifiers: error?.meta?.identifiers,
            zxcvbn: error?.meta?.zxcvbn
        }
    };
}
function errorToJSON(error) {
    return {
        code: error?.code || "",
        message: error?.message || "",
        long_message: error?.longMessage,
        meta: {
            param_name: error?.meta?.paramName,
            session_id: error?.meta?.sessionId,
            email_addresses: error?.meta?.emailAddresses,
            identifiers: error?.meta?.identifiers,
            zxcvbn: error?.meta?.zxcvbn
        }
    };
}
var chunk_NT4JRXL3_ClerkAPIResponseError = class _ClerkAPIResponseError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(message, { data, status, clerkTraceId, retryAfter }){
        super(message);
        this.toString = ()=>{
            let message = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e)=>JSON.stringify(e))}`;
            if (this.clerkTraceId) {
                message += `
Clerk Trace ID: ${this.clerkTraceId}`;
            }
            return message;
        };
        Object.setPrototypeOf(this, _ClerkAPIResponseError.prototype);
        this.status = status;
        this.message = message;
        this.clerkTraceId = clerkTraceId;
        this.retryAfter = retryAfter;
        this.clerkError = true;
        this.errors = parseErrors(data);
    }
};
var ClerkRuntimeError = class _ClerkRuntimeError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(message, { code }){
        const prefix = "\uD83D\uDD12 Clerk:";
        const regex = new RegExp(prefix.replace(" ", "\\s*"), "i");
        const sanitized = message.replace(regex, "");
        const _message = `${prefix} ${sanitized.trim()}

(code="${code}")
`;
        super(_message);
        /**
     * Returns a string representation of the error.
     *
     * @returns {string} A formatted string with the error name and message.
     */ this.toString = ()=>{
            return `[${this.name}]
Message:${this.message}`;
        };
        Object.setPrototypeOf(this, _ClerkRuntimeError.prototype);
        this.code = code;
        this.message = _message;
        this.clerkRuntimeError = true;
        this.name = "ClerkRuntimeError";
    }
};
var EmailLinkError = class _EmailLinkError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(code){
        super(code);
        this.code = code;
        this.name = "EmailLinkError";
        Object.setPrototypeOf(this, _EmailLinkError.prototype);
    }
};
function isEmailLinkError(err) {
    return err.name === "EmailLinkError";
}
var EmailLinkErrorCode = {
    Expired: "expired",
    Failed: "failed",
    ClientMismatch: "client_mismatch"
};
var EmailLinkErrorCodeStatus = {
    Expired: "expired",
    Failed: "failed",
    ClientMismatch: "client_mismatch"
};
var DefaultMessages = Object.freeze({
    InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
    InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
    MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
    MissingSecretKeyErrorMessage: `Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
    MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
});
function buildErrorThrower({ packageName, customMessages }) {
    let pkg = packageName;
    const messages = {
        ...DefaultMessages,
        ...customMessages
    };
    function buildMessage(rawMessage, replacements) {
        if (!replacements) {
            return `${pkg}: ${rawMessage}`;
        }
        let msg = rawMessage;
        const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
        for (const match of matches){
            const replacement = (replacements[match[1]] || "").toString();
            msg = msg.replace(`{{${match[1]}}}`, replacement);
        }
        return `${pkg}: ${msg}`;
    }
    return {
        setPackageName ({ packageName: packageName2 }) {
            if (typeof packageName2 === "string") {
                pkg = packageName2;
            }
            return this;
        },
        setMessages ({ customMessages: customMessages2 }) {
            Object.assign(messages, customMessages2 || {});
            return this;
        },
        throwInvalidPublishableKeyError (params) {
            throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
        },
        throwInvalidProxyUrl (params) {
            throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
        },
        throwMissingPublishableKeyError () {
            throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
        },
        throwMissingSecretKeyError () {
            throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
        },
        throwMissingClerkProviderError (params) {
            throw new Error(buildMessage(messages.MissingClerkProvider, params));
        },
        throw (message) {
            throw new Error(buildMessage(message));
        }
    };
}
var ClerkWebAuthnError = class extends (/* unused pure expression or super */ null && (ClerkRuntimeError)) {
    constructor(message, { code }){
        super(message, {
            code
        });
        this.code = code;
    }
};
 //# sourceMappingURL=chunk-NT4JRXL3.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/error.mjs


 //# sourceMappingURL=error.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/chunk-LWOXHF4E.mjs
// src/util/shared.ts






var chunk_LWOXHF4E_errorThrower = buildErrorThrower({
    packageName: "@clerk/backend"
});
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();
 //# sourceMappingURL=chunk-LWOXHF4E.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/chunk-5JS2VYLU.mjs
// src/errors.ts
var TokenVerificationErrorCode = {
    InvalidSecretKey: "clerk_key_invalid"
};
var chunk_5JS2VYLU_TokenVerificationErrorReason = {
    TokenExpired: "token-expired",
    TokenInvalid: "token-invalid",
    TokenInvalidAlgorithm: "token-invalid-algorithm",
    TokenInvalidAuthorizedParties: "token-invalid-authorized-parties",
    TokenInvalidSignature: "token-invalid-signature",
    TokenNotActiveYet: "token-not-active-yet",
    TokenIatInTheFuture: "token-iat-in-the-future",
    TokenVerificationFailed: "token-verification-failed",
    InvalidSecretKey: "secret-key-invalid",
    LocalJWKMissing: "jwk-local-missing",
    RemoteJWKFailedToLoad: "jwk-remote-failed-to-load",
    RemoteJWKInvalid: "jwk-remote-invalid",
    RemoteJWKMissing: "jwk-remote-missing",
    JWKFailedToResolve: "jwk-failed-to-resolve",
    JWKKidMismatch: "jwk-kid-mismatch"
};
var chunk_5JS2VYLU_TokenVerificationErrorAction = {
    ContactSupport: "Contact support@clerk.com",
    EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.",
    SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.",
    SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable.",
    EnsureClockSync: "Make sure your system clock is in sync (e.g. turn off and on automatic time synchronization)."
};
var chunk_5JS2VYLU_TokenVerificationError = class _TokenVerificationError extends Error {
    constructor({ action, message, reason }){
        super(message);
        Object.setPrototypeOf(this, _TokenVerificationError.prototype);
        this.reason = reason;
        this.message = message;
        this.action = action;
    }
    getFullMessage() {
        return `${[
            this.message,
            this.action
        ].filter((m)=>m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
    }
};
var SignJWTError = class extends (/* unused pure expression or super */ null && (Error)) {
};
 //# sourceMappingURL=chunk-5JS2VYLU.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs
const webcrypto = crypto;

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs
// src/isomorphicAtob.ts
var chunk_TETGTEI2_isomorphicAtob = (data)=>{
    if (typeof atob !== "undefined" && typeof atob === "function") {
        return atob(data);
    } else if (typeof global !== "undefined" && global.Buffer) {
        return new global.Buffer(data, "base64").toString();
    }
    return data;
};
 //# sourceMappingURL=chunk-TETGTEI2.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/isomorphicAtob.mjs


 //# sourceMappingURL=isomorphicAtob.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/chunk-TQCJZF7D.mjs

// src/runtime.ts

var globalFetch = fetch.bind(globalThis);
var chunk_TQCJZF7D_runtime = {
    crypto: webcrypto,
    get fetch () {
        return  false ? 0 : globalFetch;
    },
    AbortController: globalThis.AbortController,
    Blob: globalThis.Blob,
    FormData: globalThis.FormData,
    Headers: globalThis.Headers,
    Request: globalThis.Request,
    Response: globalThis.Response
};
// src/util/rfc4648.ts
var base64url = {
    parse (string, opts) {
        return chunk_TQCJZF7D_parse(string, base64UrlEncoding, opts);
    },
    stringify (data, opts) {
        return stringify(data, base64UrlEncoding, opts);
    }
};
var base64UrlEncoding = {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bits: 6
};
function chunk_TQCJZF7D_parse(string, encoding, opts = {}) {
    if (!encoding.codes) {
        encoding.codes = {};
        for(let i = 0; i < encoding.chars.length; ++i){
            encoding.codes[encoding.chars[i]] = i;
        }
    }
    if (!opts.loose && string.length * encoding.bits & 7) {
        throw new SyntaxError("Invalid padding");
    }
    let end = string.length;
    while(string[end - 1] === "="){
        --end;
        if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
            throw new SyntaxError("Invalid padding");
        }
    }
    const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for(let i = 0; i < end; ++i){
        const value = encoding.codes[string[i]];
        if (value === void 0) {
            throw new SyntaxError("Invalid character " + string[i]);
        }
        buffer = buffer << encoding.bits | value;
        bits += encoding.bits;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
        }
    }
    if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
    }
    return out;
}
function stringify(data, encoding, opts = {}) {
    const { pad = true } = opts;
    const mask = (1 << encoding.bits) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for(let i = 0; i < data.length; ++i){
        buffer = buffer << 8 | 255 & data[i];
        bits += 8;
        while(bits > encoding.bits){
            bits -= encoding.bits;
            out += encoding.chars[mask & buffer >> bits];
        }
    }
    if (bits) {
        out += encoding.chars[mask & buffer << encoding.bits - bits];
    }
    if (pad) {
        while(out.length * encoding.bits & 7){
            out += "=";
        }
    }
    return out;
}
// src/jwt/algorithms.ts
var algToHash = {
    RS256: "SHA-256",
    RS384: "SHA-384",
    RS512: "SHA-512"
};
var RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
var jwksAlgToCryptoAlg = {
    RS256: RSA_ALGORITHM_NAME,
    RS384: RSA_ALGORITHM_NAME,
    RS512: RSA_ALGORITHM_NAME
};
var algs = Object.keys(algToHash);
function getCryptoAlgorithm(algorithmName) {
    const hash = algToHash[algorithmName];
    const name = jwksAlgToCryptoAlg[algorithmName];
    if (!hash || !name) {
        throw new Error(`Unsupported algorithm ${algorithmName}, expected one of ${algs.join(",")}.`);
    }
    return {
        hash: {
            name: algToHash[algorithmName]
        },
        name: jwksAlgToCryptoAlg[algorithmName]
    };
}
// src/jwt/assertions.ts
var isArrayString = (s)=>{
    return Array.isArray(s) && s.length > 0 && s.every((a)=>typeof a === "string");
};
var assertAudienceClaim = (aud, audience)=>{
    const audienceList = [
        audience
    ].flat().filter((a)=>!!a);
    const audList = [
        aud
    ].flat().filter((a)=>!!a);
    const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
    if (!shouldVerifyAudience) {
        return;
    }
    if (typeof aud === "string") {
        if (!audienceList.includes(aud)) {
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
                reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
                message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(audienceList)}".`
            });
        }
    } else if (isArrayString(aud)) {
        if (!aud.some((a)=>audienceList.includes(a))) {
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
                reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
                message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(audienceList)}".`
            });
        }
    }
};
var chunk_TQCJZF7D_assertHeaderType = (typ)=>{
    if (typeof typ === "undefined") {
        return;
    }
    if (typ !== "JWT") {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalid,
            message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "JWT".`
        });
    }
};
var chunk_TQCJZF7D_assertHeaderAlgorithm = (alg)=>{
    if (!algs.includes(alg)) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalidAlgorithm,
            message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
        });
    }
};
var assertSubClaim = (sub)=>{
    if (typeof sub !== "string") {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
        });
    }
};
var assertAuthorizedPartiesClaim = (azp, authorizedParties)=>{
    if (!azp || !authorizedParties || authorizedParties.length === 0) {
        return;
    }
    if (!authorizedParties.includes(azp)) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalidAuthorizedParties,
            message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
        });
    }
};
var assertExpirationClaim = (exp, clockSkewInMs)=>{
    if (typeof exp !== "number") {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
        });
    }
    const currentDate = new Date(Date.now());
    const expiryDate = /* @__PURE__ */ new Date(0);
    expiryDate.setUTCSeconds(exp);
    const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkewInMs;
    if (expired) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenExpired,
            message: `JWT is expired. Expiry date: ${expiryDate.toUTCString()}, Current date: ${currentDate.toUTCString()}.`
        });
    }
};
var assertActivationClaim = (nbf, clockSkewInMs)=>{
    if (typeof nbf === "undefined") {
        return;
    }
    if (typeof nbf !== "number") {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
        });
    }
    const currentDate = new Date(Date.now());
    const notBeforeDate = /* @__PURE__ */ new Date(0);
    notBeforeDate.setUTCSeconds(nbf);
    const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkewInMs;
    if (early) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenNotActiveYet,
            message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
    }
};
var assertIssuedAtClaim = (iat, clockSkewInMs)=>{
    if (typeof iat === "undefined") {
        return;
    }
    if (typeof iat !== "number") {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
        });
    }
    const currentDate = new Date(Date.now());
    const issuedAtDate = /* @__PURE__ */ new Date(0);
    issuedAtDate.setUTCSeconds(iat);
    const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkewInMs;
    if (postIssued) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenIatInTheFuture,
            message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
    }
};
// src/jwt/cryptoKeys.ts

function pemToBuffer(secret) {
    const trimmed = secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "");
    const decoded = chunk_TETGTEI2_isomorphicAtob(trimmed);
    const buffer = new ArrayBuffer(decoded.length);
    const bufView = new Uint8Array(buffer);
    for(let i = 0, strLen = decoded.length; i < strLen; i++){
        bufView[i] = decoded.charCodeAt(i);
    }
    return bufView;
}
function importKey(key, algorithm, keyUsage) {
    if (typeof key === "object") {
        return chunk_TQCJZF7D_runtime.crypto.subtle.importKey("jwk", key, algorithm, false, [
            keyUsage
        ]);
    }
    const keyData = pemToBuffer(key);
    const format = keyUsage === "sign" ? "pkcs8" : "spki";
    return chunk_TQCJZF7D_runtime.crypto.subtle.importKey(format, keyData, algorithm, false, [
        keyUsage
    ]);
}
// src/jwt/verifyJwt.ts
var DEFAULT_CLOCK_SKEW_IN_SECONDS = 5 * 1e3;
async function chunk_TQCJZF7D_hasValidSignature(jwt, key) {
    const { header, signature, raw } = jwt;
    const encoder = new TextEncoder();
    const data = encoder.encode([
        raw.header,
        raw.payload
    ].join("."));
    const algorithm = getCryptoAlgorithm(header.alg);
    try {
        const cryptoKey = await importKey(key, algorithm, "verify");
        const verified = await chunk_TQCJZF7D_runtime.crypto.subtle.verify(algorithm.name, cryptoKey, signature, data);
        return {
            data: verified
        };
    } catch (error) {
        return {
            errors: [
                new chunk_5JS2VYLU_TokenVerificationError({
                    reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalidSignature,
                    message: error?.message
                })
            ]
        };
    }
}
function chunk_TQCJZF7D_decodeJwt(token) {
    const tokenParts = (token || "").toString().split(".");
    if (tokenParts.length !== 3) {
        return {
            errors: [
                new chunk_5JS2VYLU_TokenVerificationError({
                    reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalid,
                    message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
                })
            ]
        };
    }
    const [rawHeader, rawPayload, rawSignature] = tokenParts;
    const decoder = new TextDecoder();
    const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, {
        loose: true
    })));
    const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, {
        loose: true
    })));
    const signature = base64url.parse(rawSignature, {
        loose: true
    });
    const data = {
        header,
        payload,
        signature,
        raw: {
            header: rawHeader,
            payload: rawPayload,
            signature: rawSignature,
            text: token
        }
    };
    return {
        data
    };
}
async function verifyJwt(token, options) {
    const { audience, authorizedParties, clockSkewInMs, key } = options;
    const clockSkew = clockSkewInMs || DEFAULT_CLOCK_SKEW_IN_SECONDS;
    const { data: decoded, errors } = chunk_TQCJZF7D_decodeJwt(token);
    if (errors) {
        return {
            errors
        };
    }
    const { header, payload } = decoded;
    try {
        const { typ, alg } = header;
        chunk_TQCJZF7D_assertHeaderType(typ);
        chunk_TQCJZF7D_assertHeaderAlgorithm(alg);
        const { azp, sub, aud, iat, exp, nbf } = payload;
        assertSubClaim(sub);
        assertAudienceClaim([
            aud
        ], [
            audience
        ]);
        assertAuthorizedPartiesClaim(azp, authorizedParties);
        assertExpirationClaim(exp, clockSkew);
        assertActivationClaim(nbf, clockSkew);
        assertIssuedAtClaim(iat, clockSkew);
    } catch (err) {
        return {
            errors: [
                err
            ]
        };
    }
    const { data: signatureValid, errors: signatureErrors } = await chunk_TQCJZF7D_hasValidSignature(decoded, key);
    if (signatureErrors) {
        return {
            errors: [
                new chunk_5JS2VYLU_TokenVerificationError({
                    action: chunk_5JS2VYLU_TokenVerificationErrorAction.EnsureClerkJWT,
                    reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenVerificationFailed,
                    message: `Error verifying JWT signature. ${signatureErrors[0]}`
                })
            ]
        };
    }
    if (!signatureValid) {
        return {
            errors: [
                new chunk_5JS2VYLU_TokenVerificationError({
                    reason: chunk_5JS2VYLU_TokenVerificationErrorReason.TokenInvalidSignature,
                    message: "JWT signature is invalid."
                })
            ]
        };
    }
    return {
        data: payload
    };
}
 //# sourceMappingURL=chunk-TQCJZF7D.mjs.map

// EXTERNAL MODULE: ./node_modules/snakecase-keys/index.js
var snakecase_keys = __webpack_require__(543);
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-LGJNYDTY.mjs
// src/authorization.ts
var TYPES_TO_OBJECTS = {
    strict_mfa: {
        afterMinutes: 10,
        level: "multi_factor"
    },
    strict: {
        afterMinutes: 10,
        level: "second_factor"
    },
    moderate: {
        afterMinutes: 60,
        level: "second_factor"
    },
    lax: {
        afterMinutes: 1440,
        level: "second_factor"
    }
};
var ALLOWED_LEVELS = /* @__PURE__ */ new Set([
    "first_factor",
    "second_factor",
    "multi_factor"
]);
var ALLOWED_TYPES = /* @__PURE__ */ new Set([
    "strict_mfa",
    "strict",
    "moderate",
    "lax"
]);
var isValidMaxAge = (maxAge)=>typeof maxAge === "number" && maxAge > 0;
var isValidLevel = (level)=>ALLOWED_LEVELS.has(level);
var isValidVerificationType = (type)=>ALLOWED_TYPES.has(type);
var checkOrgAuthorization = (params, options)=>{
    const { orgId, orgRole, orgPermissions } = options;
    if (!params.role && !params.permission) {
        return null;
    }
    if (!orgId || !orgRole || !orgPermissions) {
        return null;
    }
    if (params.permission) {
        return orgPermissions.includes(params.permission);
    }
    if (params.role) {
        return orgRole === params.role;
    }
    return null;
};
var checkForFeatureOrPlan = (claim, featureOrPlan)=>{
    const { org: orgFeatures, user: userFeatures } = chunk_LGJNYDTY_splitByScope(claim);
    const [scope, _id] = featureOrPlan.split(":");
    const id = _id || scope;
    if (scope === "org") {
        return orgFeatures.includes(id);
    } else if (scope === "user") {
        return userFeatures.includes(id);
    } else {
        return [
            ...orgFeatures,
            ...userFeatures
        ].includes(id);
    }
};
var checkBillingAuthorization = (params, options)=>{
    const { features, plans } = options;
    if (params.feature && features) {
        return checkForFeatureOrPlan(features, params.feature);
    }
    if (params.plan && plans) {
        return checkForFeatureOrPlan(plans, params.plan);
    }
    return null;
};
var chunk_LGJNYDTY_splitByScope = (fea)=>{
    const features = fea ? fea.split(",").map((f)=>f.trim()) : [];
    return {
        org: features.filter((f)=>f.split(":")[0].includes("o")).map((f)=>f.split(":")[1]),
        user: features.filter((f)=>f.split(":")[0].includes("u")).map((f)=>f.split(":")[1])
    };
};
var validateReverificationConfig = (config)=>{
    if (!config) {
        return false;
    }
    const convertConfigToObject = (config2)=>{
        if (typeof config2 === "string") {
            return TYPES_TO_OBJECTS[config2];
        }
        return config2;
    };
    const isValidStringValue = typeof config === "string" && isValidVerificationType(config);
    const isValidObjectValue = typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes);
    if (isValidStringValue || isValidObjectValue) {
        return convertConfigToObject.bind(null, config);
    }
    return false;
};
var checkReverificationAuthorization = (params, { factorVerificationAge })=>{
    if (!params.reverification || !factorVerificationAge) {
        return null;
    }
    const isValidReverification = validateReverificationConfig(params.reverification);
    if (!isValidReverification) {
        return null;
    }
    const { level, afterMinutes } = isValidReverification();
    const [factor1Age, factor2Age] = factorVerificationAge;
    const isValidFactor1 = factor1Age !== -1 ? afterMinutes > factor1Age : null;
    const isValidFactor2 = factor2Age !== -1 ? afterMinutes > factor2Age : null;
    switch(level){
        case "first_factor":
            return isValidFactor1;
        case "second_factor":
            return factor2Age !== -1 ? isValidFactor2 : isValidFactor1;
        case "multi_factor":
            return factor2Age === -1 ? isValidFactor1 : isValidFactor1 && isValidFactor2;
    }
};
var chunk_LGJNYDTY_createCheckAuthorization = (options)=>{
    return (params)=>{
        if (!options.userId) {
            return false;
        }
        const billingAuthorization = checkBillingAuthorization(params, options);
        const orgAuthorization = checkOrgAuthorization(params, options);
        const reverificationAuthorization = checkReverificationAuthorization(params, options);
        if ([
            billingAuthorization || orgAuthorization,
            reverificationAuthorization
        ].some((a)=>a === null)) {
            return [
                billingAuthorization || orgAuthorization,
                reverificationAuthorization
            ].some((a)=>a === true);
        }
        return [
            billingAuthorization || orgAuthorization,
            reverificationAuthorization
        ].every((a)=>a === true);
    };
};
var resolveAuthState = ({ authObject: { sessionId, sessionStatus, userId, actor, orgId, orgRole, orgSlug, signOut, getToken, has, sessionClaims }, options: { treatPendingAsSignedOut = true } })=>{
    if (sessionId === void 0 && userId === void 0) {
        return {
            isLoaded: false,
            isSignedIn: void 0,
            sessionId,
            sessionClaims: void 0,
            userId,
            actor: void 0,
            orgId: void 0,
            orgRole: void 0,
            orgSlug: void 0,
            has: void 0,
            signOut,
            getToken
        };
    }
    if (sessionId === null && userId === null) {
        return {
            isLoaded: true,
            isSignedIn: false,
            sessionId,
            userId,
            sessionClaims: null,
            actor: null,
            orgId: null,
            orgRole: null,
            orgSlug: null,
            has: ()=>false,
            signOut,
            getToken
        };
    }
    if (treatPendingAsSignedOut && sessionStatus === "pending") {
        return {
            isLoaded: true,
            isSignedIn: false,
            sessionId: null,
            userId: null,
            sessionClaims: null,
            actor: null,
            orgId: null,
            orgRole: null,
            orgSlug: null,
            has: ()=>false,
            signOut,
            getToken
        };
    }
    if (!!sessionId && !!sessionClaims && !!userId && !!orgId && !!orgRole) {
        return {
            isLoaded: true,
            isSignedIn: true,
            sessionId,
            sessionClaims,
            userId,
            actor: actor || null,
            orgId,
            orgRole,
            orgSlug: orgSlug || null,
            has,
            signOut,
            getToken
        };
    }
    if (!!sessionId && !!sessionClaims && !!userId && !orgId) {
        return {
            isLoaded: true,
            isSignedIn: true,
            sessionId,
            sessionClaims,
            userId,
            actor: actor || null,
            orgId: null,
            orgRole: null,
            orgSlug: null,
            has,
            signOut,
            getToken
        };
    }
};
 //# sourceMappingURL=chunk-LGJNYDTY.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/authorization.mjs


 //# sourceMappingURL=authorization.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/jwtPayloadParser.mjs


// src/jwtPayloadParser.ts
var parsePermissions = ({ per, fpm })=>{
    if (!per || !fpm) {
        return {
            permissions: [],
            featurePermissionMap: []
        };
    }
    const permissions = per.split(",").map((p)=>p.trim());
    const featurePermissionMap = fpm.split(",").map((permission)=>Number.parseInt(permission.trim(), 10)).map((permission)=>permission.toString(2).padStart(permissions.length, "0").split("").map((bit)=>Number.parseInt(bit, 10)).reverse()).filter(Boolean);
    return {
        permissions,
        featurePermissionMap
    };
};
function buildOrgPermissions({ features, permissions, featurePermissionMap }) {
    if (!features || !permissions || !featurePermissionMap) {
        return [];
    }
    const orgPermissions = [];
    for(let featureIndex = 0; featureIndex < features.length; featureIndex++){
        const feature = features[featureIndex];
        if (featureIndex >= featurePermissionMap.length) {
            continue;
        }
        const permissionBits = featurePermissionMap[featureIndex];
        if (!permissionBits) continue;
        for(let permIndex = 0; permIndex < permissionBits.length; permIndex++){
            if (permissionBits[permIndex] === 1) {
                orgPermissions.push(`org:${feature}:${permissions[permIndex]}`);
            }
        }
    }
    return orgPermissions;
}
var jwtPayloadParser_experimental_JWTPayloadToAuthObjectProperties = (claims)=>{
    let orgId;
    let orgRole;
    let orgSlug;
    let orgPermissions;
    const factorVerificationAge = claims.fva ?? null;
    const sessionStatus = claims.sts ?? null;
    switch(claims.v){
        case 2:
            {
                if (claims.o) {
                    orgId = claims.o?.id;
                    orgSlug = claims.o?.slg;
                    if (claims.o?.rol) {
                        orgRole = `org:${claims.o?.rol}`;
                    }
                    const { org } = splitByScope(claims.fea);
                    const { permissions, featurePermissionMap } = parsePermissions({
                        per: claims.o?.per,
                        fpm: claims.o?.fpm
                    });
                    orgPermissions = buildOrgPermissions({
                        features: org,
                        featurePermissionMap,
                        permissions
                    });
                }
                break;
            }
        default:
            orgId = claims.org_id;
            orgRole = claims.org_role;
            orgSlug = claims.org_slug;
            orgPermissions = claims.org_permissions;
            break;
    }
    return {
        sessionClaims: claims,
        sessionId: claims.sid,
        sessionStatus,
        actor: claims.act,
        userId: claims.sub,
        orgId,
        orgRole,
        orgSlug,
        orgPermissions,
        factorVerificationAge
    };
};
 //# sourceMappingURL=jwtPayloadParser.mjs.map

// EXTERNAL MODULE: ./node_modules/cookie/dist/index.js
var dist = __webpack_require__(408);
;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/pathToRegexp.mjs


 //# sourceMappingURL=pathToRegexp.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/chunk-LFAHZTE6.mjs



// src/constants.ts
var API_URL = "https://api.clerk.com";
var API_VERSION = "v1";
var USER_AGENT = `${"@clerk/backend"}@${"1.30.0"}`;
var MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
var SUPPORTED_BAPI_VERSION = "2025-04-10";
var Attributes = {
    AuthToken: "__clerkAuthToken",
    AuthSignature: "__clerkAuthSignature",
    AuthStatus: "__clerkAuthStatus",
    AuthReason: "__clerkAuthReason",
    AuthMessage: "__clerkAuthMessage",
    ClerkUrl: "__clerkUrl"
};
var Cookies = {
    Session: "__session",
    Refresh: "__refresh",
    ClientUat: "__client_uat",
    Handshake: "__clerk_handshake",
    DevBrowser: "__clerk_db_jwt",
    RedirectCount: "__clerk_redirect_count"
};
var QueryParameters = {
    ClerkSynced: "__clerk_synced",
    SuffixedCookies: "suffixed_cookies",
    ClerkRedirectUrl: "__clerk_redirect_url",
    // use the reference to Cookies to indicate that it's the same value
    DevBrowser: Cookies.DevBrowser,
    Handshake: Cookies.Handshake,
    HandshakeHelp: "__clerk_help",
    LegacyDevBrowser: "__dev_session",
    HandshakeReason: "__clerk_hs_reason"
};
var Headers2 = {
    Accept: "accept",
    AuthMessage: "x-clerk-auth-message",
    Authorization: "authorization",
    AuthReason: "x-clerk-auth-reason",
    AuthSignature: "x-clerk-auth-signature",
    AuthStatus: "x-clerk-auth-status",
    AuthToken: "x-clerk-auth-token",
    CacheControl: "cache-control",
    ClerkRedirectTo: "x-clerk-redirect-to",
    ClerkRequestData: "x-clerk-request-data",
    ClerkUrl: "x-clerk-clerk-url",
    CloudFrontForwardedProto: "cloudfront-forwarded-proto",
    ContentType: "content-type",
    ContentSecurityPolicy: "content-security-policy",
    ContentSecurityPolicyReportOnly: "content-security-policy-report-only",
    EnableDebug: "x-clerk-debug",
    ForwardedHost: "x-forwarded-host",
    ForwardedPort: "x-forwarded-port",
    ForwardedProto: "x-forwarded-proto",
    Host: "host",
    Location: "location",
    Nonce: "x-nonce",
    Origin: "origin",
    Referrer: "referer",
    SecFetchDest: "sec-fetch-dest",
    UserAgent: "user-agent",
    ReportingEndpoints: "reporting-endpoints"
};
var ContentTypes = {
    Json: "application/json"
};
var chunk_LFAHZTE6_constants = {
    Attributes,
    Cookies,
    Headers: Headers2,
    ContentTypes,
    QueryParameters
};
// src/util/path.ts
var SEPARATOR = "/";
var MULTIPLE_SEPARATOR_REGEX = new RegExp("(?<!:)" + SEPARATOR + "{1,}", "g");
function joinPaths(...args) {
    return args.filter((p)=>p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}
// src/api/endpoints/AbstractApi.ts
var AbstractAPI = class {
    constructor(request){
        this.request = request;
    }
    requireId(id) {
        if (!id) {
            throw new Error("A valid resource ID is required.");
        }
    }
};
// src/api/endpoints/ActorTokenApi.ts
var basePath = "/actor_tokens";
var ActorTokenAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async create(params) {
        return this.request({
            method: "POST",
            path: basePath,
            bodyParams: params
        });
    }
    async revoke(actorTokenId) {
        this.requireId(actorTokenId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath, actorTokenId, "revoke")
        });
    }
};
// src/api/endpoints/AccountlessApplicationsAPI.ts
var basePath2 = "/accountless_applications";
var AccountlessApplicationAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async createAccountlessApplication() {
        return this.request({
            method: "POST",
            path: basePath2
        });
    }
    async completeAccountlessApplicationOnboarding() {
        return this.request({
            method: "POST",
            path: joinPaths(basePath2, "complete")
        });
    }
};
// src/api/endpoints/AllowlistIdentifierApi.ts
var basePath3 = "/allowlist_identifiers";
var AllowlistIdentifierAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getAllowlistIdentifierList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath3,
            queryParams: {
                ...params,
                paginated: true
            }
        });
    }
    async createAllowlistIdentifier(params) {
        return this.request({
            method: "POST",
            path: basePath3,
            bodyParams: params
        });
    }
    async deleteAllowlistIdentifier(allowlistIdentifierId) {
        this.requireId(allowlistIdentifierId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath3, allowlistIdentifierId)
        });
    }
};
// src/api/endpoints/BetaFeaturesApi.ts
var basePath4 = "/beta_features";
var BetaFeaturesAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    /**
   * Change the domain of a production instance.
   *
   * Changing the domain requires updating the DNS records accordingly, deploying new SSL certificates,
   * updating your Social Connection's redirect URLs and setting the new keys in your code.
   *
   * @remarks
   * WARNING: Changing your domain will invalidate all current user sessions (i.e. users will be logged out).
   *          Also, while your application is being deployed, a small downtime is expected to occur.
   */ async changeDomain(params) {
        return this.request({
            method: "POST",
            path: joinPaths(basePath4, "change_domain"),
            bodyParams: params
        });
    }
};
// src/api/endpoints/BlocklistIdentifierApi.ts
var basePath5 = "/blocklist_identifiers";
var BlocklistIdentifierAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getBlocklistIdentifierList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath5,
            queryParams: params
        });
    }
    async createBlocklistIdentifier(params) {
        return this.request({
            method: "POST",
            path: basePath5,
            bodyParams: params
        });
    }
    async deleteBlocklistIdentifier(blocklistIdentifierId) {
        this.requireId(blocklistIdentifierId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath5, blocklistIdentifierId)
        });
    }
};
// src/api/endpoints/ClientApi.ts
var basePath6 = "/clients";
var ClientAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getClientList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath6,
            queryParams: {
                ...params,
                paginated: true
            }
        });
    }
    async getClient(clientId) {
        this.requireId(clientId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath6, clientId)
        });
    }
    verifyClient(token) {
        return this.request({
            method: "POST",
            path: joinPaths(basePath6, "verify"),
            bodyParams: {
                token
            }
        });
    }
};
// src/api/endpoints/DomainApi.ts
var basePath7 = "/domains";
var DomainAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async list() {
        return this.request({
            method: "GET",
            path: basePath7
        });
    }
    async add(params) {
        return this.request({
            method: "POST",
            path: basePath7,
            bodyParams: params
        });
    }
    async update(params) {
        const { domainId, ...bodyParams } = params;
        this.requireId(domainId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath7, domainId),
            bodyParams
        });
    }
    /**
   * Deletes a satellite domain for the instance.
   * It is currently not possible to delete the instance's primary domain.
   */ async delete(satelliteDomainId) {
        return this.deleteDomain(satelliteDomainId);
    }
    /**
   * @deprecated Use `delete` instead
   */ async deleteDomain(satelliteDomainId) {
        this.requireId(satelliteDomainId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath7, satelliteDomainId)
        });
    }
};
// src/api/endpoints/EmailAddressApi.ts
var basePath8 = "/email_addresses";
var EmailAddressAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath8, emailAddressId)
        });
    }
    async createEmailAddress(params) {
        return this.request({
            method: "POST",
            path: basePath8,
            bodyParams: params
        });
    }
    async updateEmailAddress(emailAddressId, params = {}) {
        this.requireId(emailAddressId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath8, emailAddressId),
            bodyParams: params
        });
    }
    async deleteEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath8, emailAddressId)
        });
    }
};
// src/api/endpoints/InstanceApi.ts
var basePath9 = "/instance";
var InstanceAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async get() {
        return this.request({
            method: "GET",
            path: basePath9
        });
    }
    async update(params) {
        return this.request({
            method: "PATCH",
            path: basePath9,
            bodyParams: params
        });
    }
    async updateRestrictions(params) {
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath9, "restrictions"),
            bodyParams: params
        });
    }
    async updateOrganizationSettings(params) {
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath9, "organization_settings"),
            bodyParams: params
        });
    }
};
// src/api/endpoints/InvitationApi.ts
var basePath10 = "/invitations";
var InvitationAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getInvitationList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath10,
            queryParams: {
                ...params,
                paginated: true
            }
        });
    }
    async createInvitation(params) {
        return this.request({
            method: "POST",
            path: basePath10,
            bodyParams: params
        });
    }
    async revokeInvitation(invitationId) {
        this.requireId(invitationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath10, invitationId, "revoke")
        });
    }
};
// src/api/endpoints/JwksApi.ts
var basePath11 = "/jwks";
var JwksAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getJwks() {
        return this.request({
            method: "GET",
            path: basePath11
        });
    }
};
// src/api/endpoints/JwtTemplatesApi.ts
var basePath12 = "/jwt_templates";
var JwtTemplatesApi = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async list(params = {}) {
        return this.request({
            method: "GET",
            path: basePath12,
            queryParams: {
                ...params,
                paginated: true
            }
        });
    }
    async get(templateId) {
        this.requireId(templateId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath12, templateId)
        });
    }
    async create(params) {
        return this.request({
            method: "POST",
            path: basePath12,
            bodyParams: params
        });
    }
    async update(params) {
        const { templateId, ...bodyParams } = params;
        this.requireId(templateId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath12, templateId),
            bodyParams
        });
    }
    async delete(templateId) {
        this.requireId(templateId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath12, templateId)
        });
    }
};
// src/api/endpoints/OrganizationApi.ts
var basePath13 = "/organizations";
var OrganizationAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getOrganizationList(params) {
        return this.request({
            method: "GET",
            path: basePath13,
            queryParams: params
        });
    }
    async createOrganization(params) {
        return this.request({
            method: "POST",
            path: basePath13,
            bodyParams: params
        });
    }
    async getOrganization(params) {
        const { includeMembersCount } = params;
        const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
        this.requireId(organizationIdOrSlug);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, organizationIdOrSlug),
            queryParams: {
                includeMembersCount
            }
        });
    }
    async updateOrganization(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, organizationId),
            bodyParams: params
        });
    }
    async updateOrganizationLogo(organizationId, params) {
        this.requireId(organizationId);
        const formData = new runtime.FormData();
        formData.append("file", params?.file);
        if (params?.uploaderUserId) {
            formData.append("uploader_user_id", params?.uploaderUserId);
        }
        return this.request({
            method: "PUT",
            path: joinPaths(basePath13, organizationId, "logo"),
            formData
        });
    }
    async deleteOrganizationLogo(organizationId) {
        this.requireId(organizationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, organizationId, "logo")
        });
    }
    async updateOrganizationMetadata(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, organizationId, "metadata"),
            bodyParams: params
        });
    }
    async deleteOrganization(organizationId) {
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, organizationId)
        });
    }
    async getOrganizationMembershipList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, organizationId, "memberships"),
            queryParams
        });
    }
    async createOrganizationMembership(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, organizationId, "memberships"),
            bodyParams
        });
    }
    async updateOrganizationMembership(params) {
        const { organizationId, userId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, organizationId, "memberships", userId),
            bodyParams
        });
    }
    async updateOrganizationMembershipMetadata(params) {
        const { organizationId, userId, ...bodyParams } = params;
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, organizationId, "memberships", userId, "metadata"),
            bodyParams
        });
    }
    async deleteOrganizationMembership(params) {
        const { organizationId, userId } = params;
        this.requireId(organizationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, organizationId, "memberships", userId)
        });
    }
    async getOrganizationInvitationList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, organizationId, "invitations"),
            queryParams
        });
    }
    async createOrganizationInvitation(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, organizationId, "invitations"),
            bodyParams
        });
    }
    async getOrganizationInvitation(params) {
        const { organizationId, invitationId } = params;
        this.requireId(organizationId);
        this.requireId(invitationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, organizationId, "invitations", invitationId)
        });
    }
    async revokeOrganizationInvitation(params) {
        const { organizationId, invitationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, organizationId, "invitations", invitationId, "revoke"),
            bodyParams
        });
    }
    async getOrganizationDomainList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, organizationId, "domains"),
            queryParams
        });
    }
    async createOrganizationDomain(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, organizationId, "domains"),
            bodyParams: {
                ...bodyParams,
                verified: bodyParams.verified ?? true
            }
        });
    }
    async updateOrganizationDomain(params) {
        const { organizationId, domainId, ...bodyParams } = params;
        this.requireId(organizationId);
        this.requireId(domainId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, organizationId, "domains", domainId),
            bodyParams
        });
    }
    async deleteOrganizationDomain(params) {
        const { organizationId, domainId } = params;
        this.requireId(organizationId);
        this.requireId(domainId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, organizationId, "domains", domainId)
        });
    }
};
// src/api/endpoints/OAuthApplicationsApi.ts
var basePath14 = "/oauth_applications";
var OAuthApplicationsApi = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async list(params = {}) {
        return this.request({
            method: "GET",
            path: basePath14,
            queryParams: params
        });
    }
    async get(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath14, oauthApplicationId)
        });
    }
    async create(params) {
        return this.request({
            method: "POST",
            path: basePath14,
            bodyParams: params
        });
    }
    async update(params) {
        const { oauthApplicationId, ...bodyParams } = params;
        this.requireId(oauthApplicationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath14, oauthApplicationId),
            bodyParams
        });
    }
    async delete(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath14, oauthApplicationId)
        });
    }
    async rotateSecret(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath14, oauthApplicationId, "rotate_secret")
        });
    }
};
// src/api/endpoints/PhoneNumberApi.ts
var basePath15 = "/phone_numbers";
var PhoneNumberAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getPhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath15, phoneNumberId)
        });
    }
    async createPhoneNumber(params) {
        return this.request({
            method: "POST",
            path: basePath15,
            bodyParams: params
        });
    }
    async updatePhoneNumber(phoneNumberId, params = {}) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath15, phoneNumberId),
            bodyParams: params
        });
    }
    async deletePhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath15, phoneNumberId)
        });
    }
};
// src/api/endpoints/ProxyCheckApi.ts
var basePath16 = "/proxy_checks";
var ProxyCheckAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async verify(params) {
        return this.request({
            method: "POST",
            path: basePath16,
            bodyParams: params
        });
    }
};
// src/api/endpoints/RedirectUrlApi.ts
var basePath17 = "/redirect_urls";
var RedirectUrlAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getRedirectUrlList() {
        return this.request({
            method: "GET",
            path: basePath17,
            queryParams: {
                paginated: true
            }
        });
    }
    async getRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath17, redirectUrlId)
        });
    }
    async createRedirectUrl(params) {
        return this.request({
            method: "POST",
            path: basePath17,
            bodyParams: params
        });
    }
    async deleteRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath17, redirectUrlId)
        });
    }
};
// src/api/endpoints/SamlConnectionApi.ts
var basePath18 = "/saml_connections";
var SamlConnectionAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getSamlConnectionList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath18,
            queryParams: params
        });
    }
    async createSamlConnection(params) {
        return this.request({
            method: "POST",
            path: basePath18,
            bodyParams: params
        });
    }
    async getSamlConnection(samlConnectionId) {
        this.requireId(samlConnectionId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath18, samlConnectionId)
        });
    }
    async updateSamlConnection(samlConnectionId, params = {}) {
        this.requireId(samlConnectionId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath18, samlConnectionId),
            bodyParams: params
        });
    }
    async deleteSamlConnection(samlConnectionId) {
        this.requireId(samlConnectionId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath18, samlConnectionId)
        });
    }
};
// src/api/endpoints/SessionApi.ts
var basePath19 = "/sessions";
var SessionAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getSessionList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath19,
            queryParams: {
                ...params,
                paginated: true
            }
        });
    }
    async getSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath19, sessionId)
        });
    }
    async createSession(params) {
        return this.request({
            method: "POST",
            path: basePath19,
            bodyParams: params
        });
    }
    async revokeSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath19, sessionId, "revoke")
        });
    }
    async verifySession(sessionId, token) {
        this.requireId(sessionId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath19, sessionId, "verify"),
            bodyParams: {
                token
            }
        });
    }
    async getToken(sessionId, template) {
        this.requireId(sessionId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath19, sessionId, "tokens", template || "")
        });
    }
    async refreshSession(sessionId, params) {
        this.requireId(sessionId);
        const { suffixed_cookies, ...restParams } = params;
        return this.request({
            method: "POST",
            path: joinPaths(basePath19, sessionId, "refresh"),
            bodyParams: restParams,
            queryParams: {
                suffixed_cookies
            }
        });
    }
};
// src/api/endpoints/SignInTokenApi.ts
var basePath20 = "/sign_in_tokens";
var SignInTokenAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async createSignInToken(params) {
        return this.request({
            method: "POST",
            path: basePath20,
            bodyParams: params
        });
    }
    async revokeSignInToken(signInTokenId) {
        this.requireId(signInTokenId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath20, signInTokenId, "revoke")
        });
    }
};
// src/api/endpoints/SignUpApi.ts
var basePath21 = "/sign_ups";
var SignUpAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async get(signUpAttemptId) {
        this.requireId(signUpAttemptId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath21, signUpAttemptId)
        });
    }
    async update(params) {
        const { signUpAttemptId, ...bodyParams } = params;
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath21, signUpAttemptId),
            bodyParams
        });
    }
};
// src/api/endpoints/TestingTokenApi.ts
var basePath22 = "/testing_tokens";
var TestingTokenAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async createTestingToken() {
        return this.request({
            method: "POST",
            path: basePath22
        });
    }
};
// src/api/endpoints/UserApi.ts
var basePath23 = "/users";
var UserAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async getUserList(params = {}) {
        const { limit, offset, orderBy, ...userCountParams } = params;
        const [data, totalCount] = await Promise.all([
            this.request({
                method: "GET",
                path: basePath23,
                queryParams: params
            }),
            this.getCount(userCountParams)
        ]);
        return {
            data,
            totalCount
        };
    }
    async getUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath23, userId)
        });
    }
    async createUser(params) {
        return this.request({
            method: "POST",
            path: basePath23,
            bodyParams: params
        });
    }
    async updateUser(userId, params = {}) {
        this.requireId(userId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath23, userId),
            bodyParams: params
        });
    }
    async updateUserProfileImage(userId, params) {
        this.requireId(userId);
        const formData = new runtime.FormData();
        formData.append("file", params?.file);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "profile_image"),
            formData
        });
    }
    async updateUserMetadata(userId, params) {
        this.requireId(userId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath23, userId, "metadata"),
            bodyParams: params
        });
    }
    async deleteUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, userId)
        });
    }
    async getCount(params = {}) {
        return this.request({
            method: "GET",
            path: joinPaths(basePath23, "count"),
            queryParams: params
        });
    }
    async getUserOauthAccessToken(userId, provider) {
        this.requireId(userId);
        const hasPrefix = provider.startsWith("oauth_");
        const _provider = hasPrefix ? provider : `oauth_${provider}`;
        if (hasPrefix) {
            deprecated("getUserOauthAccessToken(userId, provider)", "Remove the `oauth_` prefix from the `provider` argument.");
        }
        return this.request({
            method: "GET",
            path: joinPaths(basePath23, userId, "oauth_access_tokens", _provider),
            queryParams: {
                paginated: true
            }
        });
    }
    async disableUserMFA(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, userId, "mfa")
        });
    }
    async getOrganizationMembershipList(params) {
        const { userId, limit, offset } = params;
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath23, userId, "organization_memberships"),
            queryParams: {
                limit,
                offset
            }
        });
    }
    async getOrganizationInvitationList(params) {
        const { userId, ...queryParams } = params;
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath23, userId, "organization_invitations"),
            queryParams
        });
    }
    async verifyPassword(params) {
        const { userId, password } = params;
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "verify_password"),
            bodyParams: {
                password
            }
        });
    }
    async verifyTOTP(params) {
        const { userId, code } = params;
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "verify_totp"),
            bodyParams: {
                code
            }
        });
    }
    async banUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "ban")
        });
    }
    async unbanUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "unban")
        });
    }
    async lockUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "lock")
        });
    }
    async unlockUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath23, userId, "unlock")
        });
    }
    async deleteUserProfileImage(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, userId, "profile_image")
        });
    }
    async deleteUserPasskey(params) {
        this.requireId(params.userId);
        this.requireId(params.passkeyIdentificationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, params.userId, "passkeys", params.passkeyIdentificationId)
        });
    }
    async deleteUserWeb3Wallet(params) {
        this.requireId(params.userId);
        this.requireId(params.web3WalletIdentificationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, params.userId, "web3_wallets", params.web3WalletIdentificationId)
        });
    }
    async deleteUserExternalAccount(params) {
        this.requireId(params.userId);
        this.requireId(params.externalAccountId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, params.userId, "external_accounts", params.externalAccountId)
        });
    }
    async deleteUserBackupCodes(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, userId, "backup_code")
        });
    }
    async deleteUserTOTP(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath23, userId, "totp")
        });
    }
};
// src/api/endpoints/WaitlistEntryApi.ts
var basePath24 = "/waitlist_entries";
var WaitlistEntryAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async list(params = {}) {
        return this.request({
            method: "GET",
            path: basePath24,
            queryParams: params
        });
    }
    async create(params) {
        return this.request({
            method: "POST",
            path: basePath24,
            bodyParams: params
        });
    }
};
// src/api/endpoints/WebhookApi.ts
var basePath25 = "/webhooks";
var WebhookAPI = class extends (/* unused pure expression or super */ null && (AbstractAPI)) {
    async createSvixApp() {
        return this.request({
            method: "POST",
            path: joinPaths(basePath25, "svix")
        });
    }
    async generateSvixAuthURL() {
        return this.request({
            method: "POST",
            path: joinPaths(basePath25, "svix_url")
        });
    }
    async deleteSvixApp() {
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath25, "svix")
        });
    }
};
// src/api/request.ts


// src/util/optionsAssertions.ts
function assertValidSecretKey(val) {
    if (!val || typeof val !== "string") {
        throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
    }
}
function assertValidPublishableKey(val) {
    parsePublishableKey(val, {
        fatal: true
    });
}
// src/api/resources/ActorToken.ts
var ActorToken = class _ActorToken {
    constructor(id, status, userId, actor, token, url, createdAt, updatedAt){
        this.id = id;
        this.status = status;
        this.userId = userId;
        this.actor = actor;
        this.token = token;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _ActorToken(data.id, data.status, data.user_id, data.actor, data.token, data.url, data.created_at, data.updated_at);
    }
};
// src/api/resources/AccountlessApplication.ts
var AccountlessApplication = class _AccountlessApplication {
    constructor(publishableKey, secretKey, claimUrl, apiKeysUrl){
        this.publishableKey = publishableKey;
        this.secretKey = secretKey;
        this.claimUrl = claimUrl;
        this.apiKeysUrl = apiKeysUrl;
    }
    static fromJSON(data) {
        return new _AccountlessApplication(data.publishable_key, data.secret_key, data.claim_url, data.api_keys_url);
    }
};
// src/api/resources/AllowlistIdentifier.ts
var AllowlistIdentifier = class _AllowlistIdentifier {
    constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId, invitationId){
        this.id = id;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.instanceId = instanceId;
        this.invitationId = invitationId;
    }
    static fromJSON(data) {
        return new _AllowlistIdentifier(data.id, data.identifier, data.identifier_type, data.created_at, data.updated_at, data.instance_id, data.invitation_id);
    }
};
// src/api/resources/BlocklistIdentifier.ts
var BlocklistIdentifier = class _BlocklistIdentifier {
    constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId){
        this.id = id;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.instanceId = instanceId;
    }
    static fromJSON(data) {
        return new _BlocklistIdentifier(data.id, data.identifier, data.identifier_type, data.created_at, data.updated_at, data.instance_id);
    }
};
// src/api/resources/Session.ts
var SessionActivity = class _SessionActivity {
    constructor(id, isMobile, ipAddress, city, country, browserVersion, browserName, deviceType){
        this.id = id;
        this.isMobile = isMobile;
        this.ipAddress = ipAddress;
        this.city = city;
        this.country = country;
        this.browserVersion = browserVersion;
        this.browserName = browserName;
        this.deviceType = deviceType;
    }
    static fromJSON(data) {
        return new _SessionActivity(data.id, data.is_mobile, data.ip_address, data.city, data.country, data.browser_version, data.browser_name, data.device_type);
    }
};
var Session = class _Session {
    constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt, lastActiveOrganizationId, latestActivity, actor = null){
        this.id = id;
        this.clientId = clientId;
        this.userId = userId;
        this.status = status;
        this.lastActiveAt = lastActiveAt;
        this.expireAt = expireAt;
        this.abandonAt = abandonAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastActiveOrganizationId = lastActiveOrganizationId;
        this.latestActivity = latestActivity;
        this.actor = actor;
    }
    static fromJSON(data) {
        return new _Session(data.id, data.client_id, data.user_id, data.status, data.last_active_at, data.expire_at, data.abandon_at, data.created_at, data.updated_at, data.last_active_organization_id, data.latest_activity && SessionActivity.fromJSON(data.latest_activity), data.actor);
    }
};
// src/api/resources/Client.ts
var Client = class _Client {
    constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, createdAt, updatedAt){
        this.id = id;
        this.sessionIds = sessionIds;
        this.sessions = sessions;
        this.signInId = signInId;
        this.signUpId = signUpId;
        this.lastActiveSessionId = lastActiveSessionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _Client(data.id, data.session_ids, data.sessions.map((x)=>Session.fromJSON(x)), data.sign_in_id, data.sign_up_id, data.last_active_session_id, data.created_at, data.updated_at);
    }
};
// src/api/resources/CnameTarget.ts
var CnameTarget = class _CnameTarget {
    constructor(host, value, required){
        this.host = host;
        this.value = value;
        this.required = required;
    }
    static fromJSON(data) {
        return new _CnameTarget(data.host, data.value, data.required);
    }
};
// src/api/resources/Cookies.ts
var Cookies2 = class _Cookies {
    constructor(cookies){
        this.cookies = cookies;
    }
    static fromJSON(data) {
        return new _Cookies(data.cookies);
    }
};
// src/api/resources/DeletedObject.ts
var DeletedObject = class _DeletedObject {
    constructor(object, id, slug, deleted){
        this.object = object;
        this.id = id;
        this.slug = slug;
        this.deleted = deleted;
    }
    static fromJSON(data) {
        return new _DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
    }
};
// src/api/resources/Domain.ts
var Domain = class _Domain {
    constructor(id, name, isSatellite, frontendApiUrl, developmentOrigin, cnameTargets, accountsPortalUrl, proxyUrl){
        this.id = id;
        this.name = name;
        this.isSatellite = isSatellite;
        this.frontendApiUrl = frontendApiUrl;
        this.developmentOrigin = developmentOrigin;
        this.cnameTargets = cnameTargets;
        this.accountsPortalUrl = accountsPortalUrl;
        this.proxyUrl = proxyUrl;
    }
    static fromJSON(data) {
        return new _Domain(data.id, data.name, data.is_satellite, data.frontend_api_url, data.development_origin, data.cname_targets && data.cname_targets.map((x)=>CnameTarget.fromJSON(x)), data.accounts_portal_url, data.proxy_url);
    }
};
// src/api/resources/Email.ts
var Email = class _Email {
    constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk){
        this.id = id;
        this.fromEmailName = fromEmailName;
        this.emailAddressId = emailAddressId;
        this.toEmailAddress = toEmailAddress;
        this.subject = subject;
        this.body = body;
        this.bodyPlain = bodyPlain;
        this.status = status;
        this.slug = slug;
        this.data = data;
        this.deliveredByClerk = deliveredByClerk;
    }
    static fromJSON(data) {
        return new _Email(data.id, data.from_email_name, data.email_address_id, data.to_email_address, data.subject, data.body, data.body_plain, data.status, data.slug, data.data, data.delivered_by_clerk);
    }
};
// src/api/resources/IdentificationLink.ts
var IdentificationLink = class _IdentificationLink {
    constructor(id, type){
        this.id = id;
        this.type = type;
    }
    static fromJSON(data) {
        return new _IdentificationLink(data.id, data.type);
    }
};
// src/api/resources/Verification.ts
var Verification = class _Verification {
    constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null, message = null){
        this.status = status;
        this.strategy = strategy;
        this.externalVerificationRedirectURL = externalVerificationRedirectURL;
        this.attempts = attempts;
        this.expireAt = expireAt;
        this.nonce = nonce;
        this.message = message;
    }
    static fromJSON(data) {
        return new _Verification(data.status, data.strategy, data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null, data.attempts, data.expire_at, data.nonce);
    }
};
// src/api/resources/EmailAddress.ts
var EmailAddress = class _EmailAddress {
    constructor(id, emailAddress, verification, linkedTo){
        this.id = id;
        this.emailAddress = emailAddress;
        this.verification = verification;
        this.linkedTo = linkedTo;
    }
    static fromJSON(data) {
        return new _EmailAddress(data.id, data.email_address, data.verification && Verification.fromJSON(data.verification), data.linked_to.map((link)=>IdentificationLink.fromJSON(link)));
    }
};
// src/api/resources/ExternalAccount.ts
var ExternalAccount = class _ExternalAccount {
    constructor(id, provider, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, imageUrl, username, phoneNumber, publicMetadata = {}, label, verification){
        this.id = id;
        this.provider = provider;
        this.identificationId = identificationId;
        this.externalId = externalId;
        this.approvedScopes = approvedScopes;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.verification = verification;
    }
    static fromJSON(data) {
        return new _ExternalAccount(data.id, data.provider, data.identification_id, data.provider_user_id, data.approved_scopes, data.email_address, data.first_name, data.last_name, data.image_url || "", data.username, data.phone_number, data.public_metadata, data.label, data.verification && Verification.fromJSON(data.verification));
    }
};
// src/api/resources/Instance.ts
var Instance = class _Instance {
    constructor(id, environmentType, allowedOrigins){
        this.id = id;
        this.environmentType = environmentType;
        this.allowedOrigins = allowedOrigins;
    }
    static fromJSON(data) {
        return new _Instance(data.id, data.environment_type, data.allowed_origins);
    }
};
// src/api/resources/InstanceRestrictions.ts
var InstanceRestrictions = class _InstanceRestrictions {
    constructor(allowlist, blocklist, blockEmailSubaddresses, blockDisposableEmailDomains, ignoreDotsForGmailAddresses){
        this.allowlist = allowlist;
        this.blocklist = blocklist;
        this.blockEmailSubaddresses = blockEmailSubaddresses;
        this.blockDisposableEmailDomains = blockDisposableEmailDomains;
        this.ignoreDotsForGmailAddresses = ignoreDotsForGmailAddresses;
    }
    static fromJSON(data) {
        return new _InstanceRestrictions(data.allowlist, data.blocklist, data.block_email_subaddresses, data.block_disposable_email_domains, data.ignore_dots_for_gmail_addresses);
    }
};
// src/api/resources/InstanceSettings.ts
var InstanceSettings = class _InstanceSettings {
    constructor(id, restrictedToAllowlist, fromEmailAddress, progressiveSignUp, enhancedEmailDeliverability){
        this.id = id;
        this.restrictedToAllowlist = restrictedToAllowlist;
        this.fromEmailAddress = fromEmailAddress;
        this.progressiveSignUp = progressiveSignUp;
        this.enhancedEmailDeliverability = enhancedEmailDeliverability;
    }
    static fromJSON(data) {
        return new _InstanceSettings(data.id, data.restricted_to_allowlist, data.from_email_address, data.progressive_sign_up, data.enhanced_email_deliverability);
    }
};
// src/api/resources/Invitation.ts
var Invitation = class _Invitation {
    constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, url, revoked){
        this.id = id;
        this.emailAddress = emailAddress;
        this.publicMetadata = publicMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.url = url;
        this.revoked = revoked;
        this._raw = null;
    }
    get raw() {
        return this._raw;
    }
    static fromJSON(data) {
        const res = new _Invitation(data.id, data.email_address, data.public_metadata, data.created_at, data.updated_at, data.status, data.url, data.revoked);
        res._raw = data;
        return res;
    }
};
// src/api/resources/JSON.ts
var ObjectType = {
    AccountlessApplication: "accountless_application",
    ActorToken: "actor_token",
    AllowlistIdentifier: "allowlist_identifier",
    BlocklistIdentifier: "blocklist_identifier",
    Client: "client",
    Cookies: "cookies",
    Domain: "domain",
    Email: "email",
    EmailAddress: "email_address",
    ExternalAccount: "external_account",
    FacebookAccount: "facebook_account",
    GoogleAccount: "google_account",
    Instance: "instance",
    InstanceRestrictions: "instance_restrictions",
    InstanceSettings: "instance_settings",
    Invitation: "invitation",
    JwtTemplate: "jwt_template",
    OauthAccessToken: "oauth_access_token",
    OAuthApplication: "oauth_application",
    Organization: "organization",
    OrganizationDomain: "organization_domain",
    OrganizationInvitation: "organization_invitation",
    OrganizationMembership: "organization_membership",
    OrganizationSettings: "organization_settings",
    PhoneNumber: "phone_number",
    ProxyCheck: "proxy_check",
    RedirectUrl: "redirect_url",
    SamlAccount: "saml_account",
    Session: "session",
    SignInAttempt: "sign_in_attempt",
    SignInToken: "sign_in_token",
    SignUpAttempt: "sign_up_attempt",
    SmsMessage: "sms_message",
    User: "user",
    WaitlistEntry: "waitlist_entry",
    Web3Wallet: "web3_wallet",
    Token: "token",
    TotalCount: "total_count",
    TestingToken: "testing_token",
    Role: "role",
    Permission: "permission"
};
// src/api/resources/JwtTemplate.ts
var JwtTemplate = class _JwtTemplate {
    constructor(id, name, claims, lifetime, allowedClockSkew, customSigningKey, signingAlgorithm, createdAt, updatedAt){
        this.id = id;
        this.name = name;
        this.claims = claims;
        this.lifetime = lifetime;
        this.allowedClockSkew = allowedClockSkew;
        this.customSigningKey = customSigningKey;
        this.signingAlgorithm = signingAlgorithm;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _JwtTemplate(data.id, data.name, data.claims, data.lifetime, data.allowed_clock_skew, data.custom_signing_key, data.signing_algorithm, data.created_at, data.updated_at);
    }
};
// src/api/resources/OauthAccessToken.ts
var OauthAccessToken = class _OauthAccessToken {
    constructor(externalAccountId, provider, token, publicMetadata = {}, label, scopes, tokenSecret, expiresAt){
        this.externalAccountId = externalAccountId;
        this.provider = provider;
        this.token = token;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.scopes = scopes;
        this.tokenSecret = tokenSecret;
        this.expiresAt = expiresAt;
    }
    static fromJSON(data) {
        return new _OauthAccessToken(data.external_account_id, data.provider, data.token, data.public_metadata, data.label || "", data.scopes, data.token_secret, data.expires_at);
    }
};
// src/api/resources/OAuthApplication.ts
var OAuthApplication = class _OAuthApplication {
    constructor(id, instanceId, name, clientId, isPublic, scopes, redirectUris, authorizeUrl, tokenFetchUrl, userInfoUrl, discoveryUrl, tokenIntrospectionUrl, createdAt, updatedAt, clientSecret){
        this.id = id;
        this.instanceId = instanceId;
        this.name = name;
        this.clientId = clientId;
        this.isPublic = isPublic;
        this.scopes = scopes;
        this.redirectUris = redirectUris;
        this.authorizeUrl = authorizeUrl;
        this.tokenFetchUrl = tokenFetchUrl;
        this.userInfoUrl = userInfoUrl;
        this.discoveryUrl = discoveryUrl;
        this.tokenIntrospectionUrl = tokenIntrospectionUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientSecret = clientSecret;
    }
    static fromJSON(data) {
        return new _OAuthApplication(data.id, data.instance_id, data.name, data.client_id, data.public, data.scopes, data.redirect_uris, data.authorize_url, data.token_fetch_url, data.user_info_url, data.discovery_url, data.token_introspection_url, data.created_at, data.updated_at, data.client_secret);
    }
};
// src/api/resources/Organization.ts
var Organization = class _Organization {
    constructor(id, name, slug, imageUrl, hasImage, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled, membersCount, createdBy){
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.adminDeleteEnabled = adminDeleteEnabled;
        this.membersCount = membersCount;
        this.createdBy = createdBy;
        this._raw = null;
    }
    get raw() {
        return this._raw;
    }
    static fromJSON(data) {
        const res = new _Organization(data.id, data.name, data.slug, data.image_url || "", data.has_image, data.created_at, data.updated_at, data.public_metadata, data.private_metadata, data.max_allowed_memberships, data.admin_delete_enabled, data.members_count, data.created_by);
        res._raw = data;
        return res;
    }
};
// src/api/resources/OrganizationInvitation.ts
var OrganizationInvitation = class _OrganizationInvitation {
    constructor(id, emailAddress, role, roleName, organizationId, createdAt, updatedAt, expiresAt, url, status, publicMetadata = {}, privateMetadata = {}, publicOrganizationData){
        this.id = id;
        this.emailAddress = emailAddress;
        this.role = role;
        this.roleName = roleName;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expiresAt = expiresAt;
        this.url = url;
        this.status = status;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.publicOrganizationData = publicOrganizationData;
        this._raw = null;
    }
    get raw() {
        return this._raw;
    }
    static fromJSON(data) {
        const res = new _OrganizationInvitation(data.id, data.email_address, data.role, data.role_name, data.organization_id, data.created_at, data.updated_at, data.expires_at, data.url, data.status, data.public_metadata, data.private_metadata, data.public_organization_data);
        res._raw = data;
        return res;
    }
};
// src/api/resources/OrganizationMembership.ts
var OrganizationMembership = class _OrganizationMembership {
    constructor(id, role, permissions, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData){
        this.id = id;
        this.role = role;
        this.permissions = permissions;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.organization = organization;
        this.publicUserData = publicUserData;
        this._raw = null;
    }
    get raw() {
        return this._raw;
    }
    static fromJSON(data) {
        const res = new _OrganizationMembership(data.id, data.role, data.permissions, data.public_metadata, data.private_metadata, data.created_at, data.updated_at, Organization.fromJSON(data.organization), OrganizationMembershipPublicUserData.fromJSON(data.public_user_data));
        res._raw = data;
        return res;
    }
};
var OrganizationMembershipPublicUserData = class _OrganizationMembershipPublicUserData {
    constructor(identifier, firstName, lastName, imageUrl, hasImage, userId){
        this.identifier = identifier;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.userId = userId;
    }
    static fromJSON(data) {
        return new _OrganizationMembershipPublicUserData(data.identifier, data.first_name, data.last_name, data.image_url, data.has_image, data.user_id);
    }
};
// src/api/resources/OrganizationSettings.ts
var OrganizationSettings = class _OrganizationSettings {
    constructor(enabled, maxAllowedMemberships, maxAllowedRoles, maxAllowedPermissions, creatorRole, adminDeleteEnabled, domainsEnabled, domainsEnrollmentModes, domainsDefaultRole){
        this.enabled = enabled;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.maxAllowedRoles = maxAllowedRoles;
        this.maxAllowedPermissions = maxAllowedPermissions;
        this.creatorRole = creatorRole;
        this.adminDeleteEnabled = adminDeleteEnabled;
        this.domainsEnabled = domainsEnabled;
        this.domainsEnrollmentModes = domainsEnrollmentModes;
        this.domainsDefaultRole = domainsDefaultRole;
    }
    static fromJSON(data) {
        return new _OrganizationSettings(data.enabled, data.max_allowed_memberships, data.max_allowed_roles, data.max_allowed_permissions, data.creator_role, data.admin_delete_enabled, data.domains_enabled, data.domains_enrollment_modes, data.domains_default_role);
    }
};
// src/api/resources/PhoneNumber.ts
var PhoneNumber = class _PhoneNumber {
    constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo){
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.reservedForSecondFactor = reservedForSecondFactor;
        this.defaultSecondFactor = defaultSecondFactor;
        this.verification = verification;
        this.linkedTo = linkedTo;
    }
    static fromJSON(data) {
        return new _PhoneNumber(data.id, data.phone_number, data.reserved_for_second_factor, data.default_second_factor, data.verification && Verification.fromJSON(data.verification), data.linked_to.map((link)=>IdentificationLink.fromJSON(link)));
    }
};
// src/api/resources/ProxyCheck.ts
var ProxyCheck = class _ProxyCheck {
    constructor(id, domainId, lastRunAt, proxyUrl, successful, createdAt, updatedAt){
        this.id = id;
        this.domainId = domainId;
        this.lastRunAt = lastRunAt;
        this.proxyUrl = proxyUrl;
        this.successful = successful;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _ProxyCheck(data.id, data.domain_id, data.last_run_at, data.proxy_url, data.successful, data.created_at, data.updated_at);
    }
};
// src/api/resources/RedirectUrl.ts
var RedirectUrl = class _RedirectUrl {
    constructor(id, url, createdAt, updatedAt){
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
    }
};
// src/api/resources/SignInTokens.ts
var SignInToken = class _SignInToken {
    constructor(id, userId, token, status, url, createdAt, updatedAt){
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.status = status;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
    }
};
// src/api/resources/SignUpAttempt.ts
var SignUpAttemptVerification = class _SignUpAttemptVerification {
    constructor(nextAction, supportedStrategies){
        this.nextAction = nextAction;
        this.supportedStrategies = supportedStrategies;
    }
    static fromJSON(data) {
        return new _SignUpAttemptVerification(data.next_action, data.supported_strategies);
    }
};
var SignUpAttemptVerifications = class _SignUpAttemptVerifications {
    constructor(emailAddress, phoneNumber, web3Wallet, externalAccount){
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.web3Wallet = web3Wallet;
        this.externalAccount = externalAccount;
    }
    static fromJSON(data) {
        return new _SignUpAttemptVerifications(data.email_address && SignUpAttemptVerification.fromJSON(data.email_address), data.phone_number && SignUpAttemptVerification.fromJSON(data.phone_number), data.web3_wallet && SignUpAttemptVerification.fromJSON(data.web3_wallet), data.external_account);
    }
};
var SignUpAttempt = class _SignUpAttempt {
    constructor(id, status, requiredFields, optionalFields, missingFields, unverifiedFields, verifications, username, emailAddress, phoneNumber, web3Wallet, passwordEnabled, firstName, lastName, customAction, externalId, createdSessionId, createdUserId, abandonAt, legalAcceptedAt, publicMetadata, unsafeMetadata){
        this.id = id;
        this.status = status;
        this.requiredFields = requiredFields;
        this.optionalFields = optionalFields;
        this.missingFields = missingFields;
        this.unverifiedFields = unverifiedFields;
        this.verifications = verifications;
        this.username = username;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.web3Wallet = web3Wallet;
        this.passwordEnabled = passwordEnabled;
        this.firstName = firstName;
        this.lastName = lastName;
        this.customAction = customAction;
        this.externalId = externalId;
        this.createdSessionId = createdSessionId;
        this.createdUserId = createdUserId;
        this.abandonAt = abandonAt;
        this.legalAcceptedAt = legalAcceptedAt;
        this.publicMetadata = publicMetadata;
        this.unsafeMetadata = unsafeMetadata;
    }
    static fromJSON(data) {
        return new _SignUpAttempt(data.id, data.status, data.required_fields, data.optional_fields, data.missing_fields, data.unverified_fields, data.verifications ? SignUpAttemptVerifications.fromJSON(data.verifications) : null, data.username, data.email_address, data.phone_number, data.web3_wallet, data.password_enabled, data.first_name, data.last_name, data.custom_action, data.external_id, data.created_session_id, data.created_user_id, data.abandon_at, data.legal_accepted_at, data.public_metadata, data.unsafe_metadata);
    }
};
// src/api/resources/SMSMessage.ts
var SMSMessage = class _SMSMessage {
    constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data){
        this.id = id;
        this.fromPhoneNumber = fromPhoneNumber;
        this.toPhoneNumber = toPhoneNumber;
        this.message = message;
        this.status = status;
        this.phoneNumberId = phoneNumberId;
        this.data = data;
    }
    static fromJSON(data) {
        return new _SMSMessage(data.id, data.from_phone_number, data.to_phone_number, data.message, data.status, data.phone_number_id, data.data);
    }
};
// src/api/resources/Token.ts
var Token = class _Token {
    constructor(jwt){
        this.jwt = jwt;
    }
    static fromJSON(data) {
        return new _Token(data.jwt);
    }
};
// src/api/resources/SamlConnection.ts
var SamlAccountConnection = class _SamlAccountConnection {
    constructor(id, name, domain, active, provider, syncUserAttributes, allowSubdomains, allowIdpInitiated, createdAt, updatedAt){
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.active = active;
        this.provider = provider;
        this.syncUserAttributes = syncUserAttributes;
        this.allowSubdomains = allowSubdomains;
        this.allowIdpInitiated = allowIdpInitiated;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new _SamlAccountConnection(data.id, data.name, data.domain, data.active, data.provider, data.sync_user_attributes, data.allow_subdomains, data.allow_idp_initiated, data.created_at, data.updated_at);
    }
};
// src/api/resources/SamlAccount.ts
var SamlAccount = class _SamlAccount {
    constructor(id, provider, providerUserId, active, emailAddress, firstName, lastName, verification, samlConnection){
        this.id = id;
        this.provider = provider;
        this.providerUserId = providerUserId;
        this.active = active;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.verification = verification;
        this.samlConnection = samlConnection;
    }
    static fromJSON(data) {
        return new _SamlAccount(data.id, data.provider, data.provider_user_id, data.active, data.email_address, data.first_name, data.last_name, data.verification && Verification.fromJSON(data.verification), data.saml_connection && SamlAccountConnection.fromJSON(data.saml_connection));
    }
};
// src/api/resources/Web3Wallet.ts
var Web3Wallet = class _Web3Wallet {
    constructor(id, web3Wallet, verification){
        this.id = id;
        this.web3Wallet = web3Wallet;
        this.verification = verification;
    }
    static fromJSON(data) {
        return new _Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
    }
};
// src/api/resources/User.ts
var User = class _User {
    constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, locked, createdAt, updatedAt, imageUrl, hasImage, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = [], samlAccounts = [], lastActiveAt, createOrganizationEnabled, createOrganizationsLimit = null, deleteSelfEnabled, legalAcceptedAt){
        this.id = id;
        this.passwordEnabled = passwordEnabled;
        this.totpEnabled = totpEnabled;
        this.backupCodeEnabled = backupCodeEnabled;
        this.twoFactorEnabled = twoFactorEnabled;
        this.banned = banned;
        this.locked = locked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.primaryEmailAddressId = primaryEmailAddressId;
        this.primaryPhoneNumberId = primaryPhoneNumberId;
        this.primaryWeb3WalletId = primaryWeb3WalletId;
        this.lastSignInAt = lastSignInAt;
        this.externalId = externalId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.unsafeMetadata = unsafeMetadata;
        this.emailAddresses = emailAddresses;
        this.phoneNumbers = phoneNumbers;
        this.web3Wallets = web3Wallets;
        this.externalAccounts = externalAccounts;
        this.samlAccounts = samlAccounts;
        this.lastActiveAt = lastActiveAt;
        this.createOrganizationEnabled = createOrganizationEnabled;
        this.createOrganizationsLimit = createOrganizationsLimit;
        this.deleteSelfEnabled = deleteSelfEnabled;
        this.legalAcceptedAt = legalAcceptedAt;
        this._raw = null;
    }
    get raw() {
        return this._raw;
    }
    static fromJSON(data) {
        const res = new _User(data.id, data.password_enabled, data.totp_enabled, data.backup_code_enabled, data.two_factor_enabled, data.banned, data.locked, data.created_at, data.updated_at, data.image_url, data.has_image, data.primary_email_address_id, data.primary_phone_number_id, data.primary_web3_wallet_id, data.last_sign_in_at, data.external_id, data.username, data.first_name, data.last_name, data.public_metadata, data.private_metadata, data.unsafe_metadata, (data.email_addresses || []).map((x)=>EmailAddress.fromJSON(x)), (data.phone_numbers || []).map((x)=>PhoneNumber.fromJSON(x)), (data.web3_wallets || []).map((x)=>Web3Wallet.fromJSON(x)), (data.external_accounts || []).map((x)=>ExternalAccount.fromJSON(x)), (data.saml_accounts || []).map((x)=>SamlAccount.fromJSON(x)), data.last_active_at, data.create_organization_enabled, data.create_organizations_limit, data.delete_self_enabled, data.legal_accepted_at);
        res._raw = data;
        return res;
    }
    get primaryEmailAddress() {
        return this.emailAddresses.find(({ id })=>id === this.primaryEmailAddressId) ?? null;
    }
    get primaryPhoneNumber() {
        return this.phoneNumbers.find(({ id })=>id === this.primaryPhoneNumberId) ?? null;
    }
    get primaryWeb3Wallet() {
        return this.web3Wallets.find(({ id })=>id === this.primaryWeb3WalletId) ?? null;
    }
    get fullName() {
        return [
            this.firstName,
            this.lastName
        ].join(" ").trim() || null;
    }
};
// src/api/resources/WaitlistEntry.ts
var WaitlistEntry = class _WaitlistEntry {
    constructor(id, emailAddress, status, invitation, createdAt, updatedAt, isLocked){
        this.id = id;
        this.emailAddress = emailAddress;
        this.status = status;
        this.invitation = invitation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isLocked = isLocked;
    }
    static fromJSON(data) {
        return new _WaitlistEntry(data.id, data.email_address, data.status, data.invitation && Invitation.fromJSON(data.invitation), data.created_at, data.updated_at, data.is_locked);
    }
};
// src/api/resources/Deserializer.ts
function deserialize(payload) {
    let data, totalCount;
    if (Array.isArray(payload)) {
        const data2 = payload.map((item)=>jsonToObject(item));
        return {
            data: data2
        };
    } else if (isPaginated(payload)) {
        data = payload.data.map((item)=>jsonToObject(item));
        totalCount = payload.total_count;
        return {
            data,
            totalCount
        };
    } else {
        return {
            data: jsonToObject(payload)
        };
    }
}
function isPaginated(payload) {
    if (!payload || typeof payload !== "object" || !("data" in payload)) {
        return false;
    }
    return Array.isArray(payload.data) && payload.data !== void 0;
}
function getCount(item) {
    return item.total_count;
}
function jsonToObject(item) {
    if (typeof item !== "string" && "object" in item && "deleted" in item) {
        return DeletedObject.fromJSON(item);
    }
    switch(item.object){
        case ObjectType.AccountlessApplication:
            return AccountlessApplication.fromJSON(item);
        case ObjectType.ActorToken:
            return ActorToken.fromJSON(item);
        case ObjectType.AllowlistIdentifier:
            return AllowlistIdentifier.fromJSON(item);
        case ObjectType.BlocklistIdentifier:
            return BlocklistIdentifier.fromJSON(item);
        case ObjectType.Client:
            return Client.fromJSON(item);
        case ObjectType.Cookies:
            return Cookies2.fromJSON(item);
        case ObjectType.Domain:
            return Domain.fromJSON(item);
        case ObjectType.EmailAddress:
            return EmailAddress.fromJSON(item);
        case ObjectType.Email:
            return Email.fromJSON(item);
        case ObjectType.Instance:
            return Instance.fromJSON(item);
        case ObjectType.InstanceRestrictions:
            return InstanceRestrictions.fromJSON(item);
        case ObjectType.InstanceSettings:
            return InstanceSettings.fromJSON(item);
        case ObjectType.Invitation:
            return Invitation.fromJSON(item);
        case ObjectType.JwtTemplate:
            return JwtTemplate.fromJSON(item);
        case ObjectType.OauthAccessToken:
            return OauthAccessToken.fromJSON(item);
        case ObjectType.OAuthApplication:
            return OAuthApplication.fromJSON(item);
        case ObjectType.Organization:
            return Organization.fromJSON(item);
        case ObjectType.OrganizationInvitation:
            return OrganizationInvitation.fromJSON(item);
        case ObjectType.OrganizationMembership:
            return OrganizationMembership.fromJSON(item);
        case ObjectType.OrganizationSettings:
            return OrganizationSettings.fromJSON(item);
        case ObjectType.PhoneNumber:
            return PhoneNumber.fromJSON(item);
        case ObjectType.ProxyCheck:
            return ProxyCheck.fromJSON(item);
        case ObjectType.RedirectUrl:
            return RedirectUrl.fromJSON(item);
        case ObjectType.SignInToken:
            return SignInToken.fromJSON(item);
        case ObjectType.SignUpAttempt:
            return SignUpAttempt.fromJSON(item);
        case ObjectType.Session:
            return Session.fromJSON(item);
        case ObjectType.SmsMessage:
            return SMSMessage.fromJSON(item);
        case ObjectType.Token:
            return Token.fromJSON(item);
        case ObjectType.TotalCount:
            return getCount(item);
        case ObjectType.User:
            return User.fromJSON(item);
        case ObjectType.WaitlistEntry:
            return WaitlistEntry.fromJSON(item);
        default:
            return item;
    }
}
// src/api/request.ts
function buildRequest(options) {
    const requestFn = async (requestOptions)=>{
        const { secretKey, requireSecretKey = true, apiUrl = API_URL, apiVersion = API_VERSION, userAgent = USER_AGENT } = options;
        const { path, method, queryParams, headerParams, bodyParams, formData } = requestOptions;
        if (requireSecretKey) {
            assertValidSecretKey(secretKey);
        }
        const url = joinPaths(apiUrl, apiVersion, path);
        const finalUrl = new URL(url);
        if (queryParams) {
            const snakecasedQueryParams = snakecaseKeys({
                ...queryParams
            });
            for (const [key, val] of Object.entries(snakecasedQueryParams)){
                if (val) {
                    [
                        val
                    ].flat().forEach((v)=>finalUrl.searchParams.append(key, v));
                }
            }
        }
        const headers = {
            "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
            "User-Agent": userAgent,
            ...headerParams
        };
        if (secretKey) {
            headers.Authorization = `Bearer ${secretKey}`;
        }
        let res;
        try {
            if (formData) {
                res = await runtime.fetch(finalUrl.href, {
                    method,
                    headers,
                    body: formData
                });
            } else {
                headers["Content-Type"] = "application/json";
                const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
                const body = hasBody ? {
                    body: JSON.stringify(snakecaseKeys(bodyParams, {
                        deep: false
                    }))
                } : null;
                res = await runtime.fetch(finalUrl.href, {
                    method,
                    headers,
                    ...body
                });
            }
            const isJSONResponse = res?.headers && res.headers?.get(chunk_LFAHZTE6_constants.Headers.ContentType) === chunk_LFAHZTE6_constants.ContentTypes.Json;
            const responseBody = await (isJSONResponse ? res.json() : res.text());
            if (!res.ok) {
                return {
                    data: null,
                    errors: chunk_LFAHZTE6_parseErrors(responseBody),
                    status: res?.status,
                    statusText: res?.statusText,
                    clerkTraceId: getTraceId(responseBody, res?.headers),
                    retryAfter: getRetryAfter(res?.headers)
                };
            }
            return {
                ...deserialize(responseBody),
                errors: null
            };
        } catch (err) {
            if (err instanceof Error) {
                return {
                    data: null,
                    errors: [
                        {
                            code: "unexpected_error",
                            message: err.message || "Unexpected error"
                        }
                    ],
                    clerkTraceId: getTraceId(err, res?.headers)
                };
            }
            return {
                data: null,
                errors: chunk_LFAHZTE6_parseErrors(err),
                status: res?.status,
                statusText: res?.statusText,
                clerkTraceId: getTraceId(err, res?.headers),
                retryAfter: getRetryAfter(res?.headers)
            };
        }
    };
    return withLegacyRequestReturn(requestFn);
}
function getTraceId(data, headers) {
    if (data && typeof data === "object" && "clerk_trace_id" in data && typeof data.clerk_trace_id === "string") {
        return data.clerk_trace_id;
    }
    const cfRay = headers?.get("cf-ray");
    return cfRay || "";
}
function getRetryAfter(headers) {
    const retryAfter = headers?.get("Retry-After");
    if (!retryAfter) return;
    const value = parseInt(retryAfter, 10);
    if (isNaN(value)) return;
    return value;
}
function chunk_LFAHZTE6_parseErrors(data) {
    if (!!data && typeof data === "object" && "errors" in data) {
        const errors = data.errors;
        return errors.length > 0 ? errors.map(parseError) : [];
    }
    return [];
}
function withLegacyRequestReturn(cb) {
    return async (...args)=>{
        const { data, errors, totalCount, status, statusText, clerkTraceId, retryAfter } = await cb(...args);
        if (errors) {
            const error = new ClerkAPIResponseError(statusText || "", {
                data: [],
                status,
                clerkTraceId,
                retryAfter
            });
            error.errors = errors;
            throw error;
        }
        if (typeof totalCount !== "undefined") {
            return {
                data,
                totalCount
            };
        }
        return data;
    };
}
// src/api/factory.ts
function chunk_LFAHZTE6_createBackendApiClient(options) {
    const request = buildRequest(options);
    return {
        __experimental_accountlessApplications: new AccountlessApplicationAPI(buildRequest({
            ...options,
            requireSecretKey: false
        })),
        actorTokens: new ActorTokenAPI(request),
        allowlistIdentifiers: new AllowlistIdentifierAPI(request),
        betaFeatures: new BetaFeaturesAPI(request),
        blocklistIdentifiers: new BlocklistIdentifierAPI(request),
        clients: new ClientAPI(request),
        domains: new DomainAPI(request),
        emailAddresses: new EmailAddressAPI(request),
        instance: new InstanceAPI(request),
        invitations: new InvitationAPI(request),
        jwks: new JwksAPI(request),
        jwtTemplates: new JwtTemplatesApi(request),
        oauthApplications: new OAuthApplicationsApi(request),
        organizations: new OrganizationAPI(request),
        phoneNumbers: new PhoneNumberAPI(request),
        proxyChecks: new ProxyCheckAPI(request),
        redirectUrls: new RedirectUrlAPI(request),
        samlConnections: new SamlConnectionAPI(request),
        sessions: new SessionAPI(request),
        signInTokens: new SignInTokenAPI(request),
        signUps: new SignUpAPI(request),
        testingTokens: new TestingTokenAPI(request),
        users: new UserAPI(request),
        waitlistEntries: new WaitlistEntryAPI(request),
        webhooks: new WebhookAPI(request)
    };
}
// src/tokens/authObjects.ts


var createDebug = (data)=>{
    return ()=>{
        const res = {
            ...data
        };
        res.secretKey = (res.secretKey || "").substring(0, 7);
        res.jwtKey = (res.jwtKey || "").substring(0, 7);
        return {
            ...res
        };
    };
};
function signedInAuthObject(authenticateContext, sessionToken, sessionClaims) {
    const { actor, sessionId, sessionStatus, userId, orgId, orgRole, orgSlug, orgPermissions, factorVerificationAge } = __experimental_JWTPayloadToAuthObjectProperties(sessionClaims);
    const apiClient = chunk_LFAHZTE6_createBackendApiClient(authenticateContext);
    const getToken = createGetToken({
        sessionId,
        sessionToken,
        fetcher: async (...args)=>(await apiClient.sessions.getToken(...args)).jwt
    });
    return {
        actor,
        sessionClaims,
        sessionId,
        sessionStatus,
        userId,
        orgId,
        orgRole,
        orgSlug,
        orgPermissions,
        factorVerificationAge,
        getToken,
        has: createCheckAuthorization({
            orgId,
            orgRole,
            orgPermissions,
            userId,
            factorVerificationAge,
            features: sessionClaims.fea || "",
            plans: sessionClaims.pla || ""
        }),
        debug: createDebug({
            ...authenticateContext,
            sessionToken
        })
    };
}
function signedOutAuthObject(debugData) {
    return {
        sessionClaims: null,
        sessionId: null,
        sessionStatus: null,
        userId: null,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        orgPermissions: null,
        factorVerificationAge: null,
        getToken: ()=>Promise.resolve(null),
        has: ()=>false,
        debug: createDebug(debugData)
    };
}
var makeAuthObjectSerializable = (obj)=>{
    const { debug, getToken, has, ...rest } = obj;
    return rest;
};
var createGetToken = (params)=>{
    const { fetcher, sessionToken, sessionId } = params || {};
    return async (options = {})=>{
        if (!sessionId) {
            return null;
        }
        if (options.template) {
            return fetcher(sessionId, options.template);
        }
        return sessionToken;
    };
};
// src/tokens/authStatus.ts
var AuthStatus = {
    SignedIn: "signed-in",
    SignedOut: "signed-out",
    Handshake: "handshake"
};
var AuthErrorReason = {
    ClientUATWithoutSessionToken: "client-uat-but-no-session-token",
    DevBrowserMissing: "dev-browser-missing",
    DevBrowserSync: "dev-browser-sync",
    PrimaryRespondsToSyncing: "primary-responds-to-syncing",
    SatelliteCookieNeedsSyncing: "satellite-needs-syncing",
    SessionTokenAndUATMissing: "session-token-and-uat-missing",
    SessionTokenMissing: "session-token-missing",
    SessionTokenExpired: "session-token-expired",
    SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat",
    SessionTokenNBF: "session-token-nbf",
    SessionTokenIatInTheFuture: "session-token-iat-in-the-future",
    SessionTokenWithoutClientUAT: "session-token-but-no-client-uat",
    ActiveOrganizationMismatch: "active-organization-mismatch",
    UnexpectedError: "unexpected-error"
};
function signedIn(authenticateContext, sessionClaims, headers = new Headers(), token) {
    const authObject = signedInAuthObject(authenticateContext, token, sessionClaims);
    return {
        status: AuthStatus.SignedIn,
        reason: null,
        message: null,
        proxyUrl: authenticateContext.proxyUrl || "",
        publishableKey: authenticateContext.publishableKey || "",
        isSatellite: authenticateContext.isSatellite || false,
        domain: authenticateContext.domain || "",
        signInUrl: authenticateContext.signInUrl || "",
        signUpUrl: authenticateContext.signUpUrl || "",
        afterSignInUrl: authenticateContext.afterSignInUrl || "",
        afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
        isSignedIn: true,
        toAuth: ()=>authObject,
        headers,
        token
    };
}
function signedOut(authenticateContext, reason, message = "", headers = new Headers()) {
    return withDebugHeaders({
        status: AuthStatus.SignedOut,
        reason,
        message,
        proxyUrl: authenticateContext.proxyUrl || "",
        publishableKey: authenticateContext.publishableKey || "",
        isSatellite: authenticateContext.isSatellite || false,
        domain: authenticateContext.domain || "",
        signInUrl: authenticateContext.signInUrl || "",
        signUpUrl: authenticateContext.signUpUrl || "",
        afterSignInUrl: authenticateContext.afterSignInUrl || "",
        afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
        isSignedIn: false,
        headers,
        toAuth: ()=>signedOutAuthObject({
                ...authenticateContext,
                status: AuthStatus.SignedOut,
                reason,
                message
            }),
        token: null
    });
}
function handshake(authenticateContext, reason, message = "", headers) {
    return withDebugHeaders({
        status: AuthStatus.Handshake,
        reason,
        message,
        publishableKey: authenticateContext.publishableKey || "",
        isSatellite: authenticateContext.isSatellite || false,
        domain: authenticateContext.domain || "",
        proxyUrl: authenticateContext.proxyUrl || "",
        signInUrl: authenticateContext.signInUrl || "",
        signUpUrl: authenticateContext.signUpUrl || "",
        afterSignInUrl: authenticateContext.afterSignInUrl || "",
        afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
        isSignedIn: false,
        headers,
        toAuth: ()=>null,
        token: null
    });
}
var withDebugHeaders = (requestState)=>{
    const headers = new Headers(requestState.headers || {});
    if (requestState.message) {
        try {
            headers.set(chunk_LFAHZTE6_constants.Headers.AuthMessage, requestState.message);
        } catch  {}
    }
    if (requestState.reason) {
        try {
            headers.set(chunk_LFAHZTE6_constants.Headers.AuthReason, requestState.reason);
        } catch  {}
    }
    if (requestState.status) {
        try {
            headers.set(chunk_LFAHZTE6_constants.Headers.AuthStatus, requestState.status);
        } catch  {}
    }
    requestState.headers = headers;
    return requestState;
};
// src/tokens/clerkRequest.ts

// src/tokens/clerkUrl.ts
var ClerkUrl = class extends (/* unused pure expression or super */ null && (URL)) {
    isCrossOrigin(other) {
        return this.origin !== new URL(other.toString()).origin;
    }
};
var createClerkUrl = (...args)=>{
    return new ClerkUrl(...args);
};
// src/tokens/clerkRequest.ts
var ClerkRequest = class extends (/* unused pure expression or super */ null && (Request)) {
    constructor(input, init){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        super(url, init || typeof input === "string" ? void 0 : input);
        this.clerkUrl = this.deriveUrlFromHeaders(this);
        this.cookies = this.parseCookies(this);
    }
    toJSON() {
        return {
            url: this.clerkUrl.href,
            method: this.method,
            headers: JSON.stringify(Object.fromEntries(this.headers)),
            clerkUrl: this.clerkUrl.toString(),
            cookies: JSON.stringify(Object.fromEntries(this.cookies))
        };
    }
    /**
   * Used to fix request.url using the x-forwarded-* headers
   * TODO add detailed description of the issues this solves
   */ deriveUrlFromHeaders(req) {
        const initialUrl = new URL(req.url);
        const forwardedProto = req.headers.get(chunk_LFAHZTE6_constants.Headers.ForwardedProto);
        const forwardedHost = req.headers.get(chunk_LFAHZTE6_constants.Headers.ForwardedHost);
        const host = req.headers.get(chunk_LFAHZTE6_constants.Headers.Host);
        const protocol = initialUrl.protocol;
        const resolvedHost = this.getFirstValueFromHeader(forwardedHost) ?? host;
        const resolvedProtocol = this.getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
        const origin = resolvedHost && resolvedProtocol ? `${resolvedProtocol}://${resolvedHost}` : initialUrl.origin;
        if (origin === initialUrl.origin) {
            return createClerkUrl(initialUrl);
        }
        return createClerkUrl(initialUrl.pathname + initialUrl.search, origin);
    }
    getFirstValueFromHeader(value) {
        return value?.split(",")[0];
    }
    parseCookies(req) {
        const cookiesRecord = parse(this.decodeCookieValue(req.headers.get("cookie") || ""));
        return new Map(Object.entries(cookiesRecord));
    }
    decodeCookieValue(str) {
        return str ? str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : str;
    }
};
var createClerkRequest = (...args)=>{
    return args[0] instanceof ClerkRequest ? args[0] : new ClerkRequest(...args);
};
// src/tokens/keys.ts
var cache = {};
var lastUpdatedAt = 0;
function getFromCache(kid) {
    return cache[kid];
}
function getCacheValues() {
    return Object.values(cache);
}
function setInCache(jwk, shouldExpire = true) {
    cache[jwk.kid] = jwk;
    lastUpdatedAt = shouldExpire ? Date.now() : -1;
}
var LocalJwkKid = "local";
var PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
var PEM_TRAILER = "-----END PUBLIC KEY-----";
var RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
var RSA_SUFFIX = "IDAQAB";
function loadClerkJWKFromLocal(localKey) {
    if (!getFromCache(LocalJwkKid)) {
        if (!localKey) {
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.SetClerkJWTKey,
                message: "Missing local JWK.",
                reason: chunk_5JS2VYLU_TokenVerificationErrorReason.LocalJWKMissing
            });
        }
        const modulus = localKey.replace(/\r\n|\n|\r/g, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
        setInCache({
            kid: "local",
            kty: "RSA",
            alg: "RS256",
            n: modulus,
            e: "AQAB"
        }, false);
    }
    return getFromCache(LocalJwkKid);
}
async function loadClerkJWKFromRemote({ secretKey, apiUrl = API_URL, apiVersion = API_VERSION, kid, skipJwksCache }) {
    if (skipJwksCache || cacheHasExpired() || !getFromCache(kid)) {
        if (!secretKey) {
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.ContactSupport,
                message: "Failed to load JWKS from Clerk Backend or Frontend API.",
                reason: chunk_5JS2VYLU_TokenVerificationErrorReason.RemoteJWKFailedToLoad
            });
        }
        const fetcher = ()=>fetchJWKSFromBAPI(apiUrl, secretKey, apiVersion);
        const { keys } = await retry(fetcher);
        if (!keys || !keys.length) {
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.ContactSupport,
                message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
                reason: chunk_5JS2VYLU_TokenVerificationErrorReason.RemoteJWKFailedToLoad
            });
        }
        keys.forEach((key)=>setInCache(key));
    }
    const jwk = getFromCache(kid);
    if (!jwk) {
        const cacheValues = getCacheValues();
        const jwkKeys = cacheValues.map((jwk2)=>jwk2.kid).sort().join(", ");
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: `Go to your Dashboard and validate your secret and public keys are correct. ${chunk_5JS2VYLU_TokenVerificationErrorAction.ContactSupport} if the issue persists.`,
            message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${jwkKeys}`,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.JWKKidMismatch
        });
    }
    return jwk;
}
async function fetchJWKSFromBAPI(apiUrl, key, apiVersion) {
    if (!key) {
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.SetClerkSecretKey,
            message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.RemoteJWKFailedToLoad
        });
    }
    const url = new URL(apiUrl);
    url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
    const response = await chunk_TQCJZF7D_runtime.fetch(url.href, {
        headers: {
            Authorization: `Bearer ${key}`,
            "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT
        }
    });
    if (!response.ok) {
        const json = await response.json();
        const invalidSecretKeyError = getErrorObjectByCode(json?.errors, TokenVerificationErrorCode.InvalidSecretKey);
        if (invalidSecretKeyError) {
            const reason = chunk_5JS2VYLU_TokenVerificationErrorReason.InvalidSecretKey;
            throw new chunk_5JS2VYLU_TokenVerificationError({
                action: chunk_5JS2VYLU_TokenVerificationErrorAction.ContactSupport,
                message: invalidSecretKeyError.message,
                reason
            });
        }
        throw new chunk_5JS2VYLU_TokenVerificationError({
            action: chunk_5JS2VYLU_TokenVerificationErrorAction.ContactSupport,
            message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
            reason: chunk_5JS2VYLU_TokenVerificationErrorReason.RemoteJWKFailedToLoad
        });
    }
    return response.json();
}
function cacheHasExpired() {
    if (lastUpdatedAt === -1) {
        return false;
    }
    const isExpired = Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
    if (isExpired) {
        cache = {};
    }
    return isExpired;
}
var getErrorObjectByCode = (errors, code)=>{
    if (!errors) {
        return null;
    }
    return errors.find((err)=>err.code === code);
};
// src/tokens/verify.ts
async function verifyToken(token, options) {
    const { data: decodedResult, errors } = chunk_TQCJZF7D_decodeJwt(token);
    if (errors) {
        return {
            errors
        };
    }
    const { header } = decodedResult;
    const { kid } = header;
    try {
        let key;
        if (options.jwtKey) {
            key = loadClerkJWKFromLocal(options.jwtKey);
        } else if (options.secretKey) {
            key = await loadClerkJWKFromRemote({
                ...options,
                kid
            });
        } else {
            return {
                errors: [
                    new chunk_5JS2VYLU_TokenVerificationError({
                        action: chunk_5JS2VYLU_TokenVerificationErrorAction.SetClerkJWTKey,
                        message: "Failed to resolve JWK during verification.",
                        reason: chunk_5JS2VYLU_TokenVerificationErrorReason.JWKFailedToResolve
                    })
                ]
            };
        }
        return await verifyJwt(token, {
            ...options,
            key
        });
    } catch (error) {
        return {
            errors: [
                error
            ]
        };
    }
}
// src/tokens/request.ts

// src/tokens/authenticateContext.ts
var AuthenticateContext = class {
    constructor(cookieSuffix, clerkRequest, options){
        this.cookieSuffix = cookieSuffix;
        this.clerkRequest = clerkRequest;
        this.initPublishableKeyValues(options);
        this.initHeaderValues();
        this.initCookieValues();
        this.initHandshakeValues();
        Object.assign(this, options);
        this.clerkUrl = this.clerkRequest.clerkUrl;
    }
    /**
   * Retrieves the session token from either the cookie or the header.
   *
   * @returns {string | undefined} The session token if available, otherwise undefined.
   */ get sessionToken() {
        return this.sessionTokenInCookie || this.sessionTokenInHeader;
    }
    usesSuffixedCookies() {
        const suffixedClientUat = this.getSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.ClientUat);
        const clientUat = this.getCookie(chunk_LFAHZTE6_constants.Cookies.ClientUat);
        const suffixedSession = this.getSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.Session) || "";
        const session = this.getCookie(chunk_LFAHZTE6_constants.Cookies.Session) || "";
        if (session && !this.tokenHasIssuer(session)) {
            return false;
        }
        if (session && !this.tokenBelongsToInstance(session)) {
            return true;
        }
        if (!suffixedClientUat && !suffixedSession) {
            return false;
        }
        const { data: sessionData } = decodeJwt(session);
        const sessionIat = sessionData?.payload.iat || 0;
        const { data: suffixedSessionData } = decodeJwt(suffixedSession);
        const suffixedSessionIat = suffixedSessionData?.payload.iat || 0;
        if (suffixedClientUat !== "0" && clientUat !== "0" && sessionIat > suffixedSessionIat) {
            return false;
        }
        if (suffixedClientUat === "0" && clientUat !== "0") {
            return false;
        }
        if (this.instanceType !== "production") {
            const isSuffixedSessionExpired = this.sessionExpired(suffixedSessionData);
            if (suffixedClientUat !== "0" && clientUat === "0" && isSuffixedSessionExpired) {
                return false;
            }
        }
        if (!suffixedClientUat && suffixedSession) {
            return false;
        }
        return true;
    }
    initPublishableKeyValues(options) {
        assertValidPublishableKey(options.publishableKey);
        this.publishableKey = options.publishableKey;
        const pk = parsePublishableKey(this.publishableKey, {
            fatal: true,
            proxyUrl: options.proxyUrl,
            domain: options.domain
        });
        this.instanceType = pk.instanceType;
        this.frontendApi = pk.frontendApi;
    }
    initHeaderValues() {
        this.sessionTokenInHeader = this.parseAuthorizationHeader(this.getHeader(chunk_LFAHZTE6_constants.Headers.Authorization));
        this.origin = this.getHeader(chunk_LFAHZTE6_constants.Headers.Origin);
        this.host = this.getHeader(chunk_LFAHZTE6_constants.Headers.Host);
        this.forwardedHost = this.getHeader(chunk_LFAHZTE6_constants.Headers.ForwardedHost);
        this.forwardedProto = this.getHeader(chunk_LFAHZTE6_constants.Headers.CloudFrontForwardedProto) || this.getHeader(chunk_LFAHZTE6_constants.Headers.ForwardedProto);
        this.referrer = this.getHeader(chunk_LFAHZTE6_constants.Headers.Referrer);
        this.userAgent = this.getHeader(chunk_LFAHZTE6_constants.Headers.UserAgent);
        this.secFetchDest = this.getHeader(chunk_LFAHZTE6_constants.Headers.SecFetchDest);
        this.accept = this.getHeader(chunk_LFAHZTE6_constants.Headers.Accept);
    }
    initCookieValues() {
        this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.Session);
        this.refreshTokenInCookie = this.getSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.Refresh);
        this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.ClientUat) || "") || 0;
    }
    initHandshakeValues() {
        this.devBrowserToken = this.getQueryParam(chunk_LFAHZTE6_constants.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(chunk_LFAHZTE6_constants.Cookies.DevBrowser);
        this.handshakeToken = this.getQueryParam(chunk_LFAHZTE6_constants.QueryParameters.Handshake) || this.getCookie(chunk_LFAHZTE6_constants.Cookies.Handshake);
        this.handshakeRedirectLoopCounter = Number(this.getCookie(chunk_LFAHZTE6_constants.Cookies.RedirectCount)) || 0;
    }
    getQueryParam(name) {
        return this.clerkRequest.clerkUrl.searchParams.get(name);
    }
    getHeader(name) {
        return this.clerkRequest.headers.get(name) || void 0;
    }
    getCookie(name) {
        return this.clerkRequest.cookies.get(name) || void 0;
    }
    getSuffixedCookie(name) {
        return this.getCookie(getSuffixedCookieName(name, this.cookieSuffix)) || void 0;
    }
    getSuffixedOrUnSuffixedCookie(cookieName) {
        if (this.usesSuffixedCookies()) {
            return this.getSuffixedCookie(cookieName);
        }
        return this.getCookie(cookieName);
    }
    parseAuthorizationHeader(authorizationHeader) {
        if (!authorizationHeader) {
            return void 0;
        }
        const [scheme, token] = authorizationHeader.split(" ", 2);
        if (!token) {
            return scheme;
        }
        if (scheme === "Bearer") {
            return token;
        }
        return void 0;
    }
    tokenHasIssuer(token) {
        const { data, errors } = decodeJwt(token);
        if (errors) {
            return false;
        }
        return !!data.payload.iss;
    }
    tokenBelongsToInstance(token) {
        if (!token) {
            return false;
        }
        const { data, errors } = decodeJwt(token);
        if (errors) {
            return false;
        }
        const tokenIssuer = data.payload.iss.replace(/https?:\/\//gi, "");
        return this.frontendApi === tokenIssuer;
    }
    sessionExpired(jwt) {
        return !!jwt && jwt?.payload.exp <= Date.now() / 1e3 >> 0;
    }
};
var createAuthenticateContext = async (clerkRequest, options)=>{
    const cookieSuffix = options.publishableKey ? await getCookieSuffix(options.publishableKey, runtime.crypto.subtle) : "";
    return new AuthenticateContext(cookieSuffix, clerkRequest, options);
};
// src/tokens/cookie.ts
var getCookieName = (cookieDirective)=>{
    return cookieDirective.split(";")[0]?.split("=")[0];
};
var getCookieValue = (cookieDirective)=>{
    return cookieDirective.split(";")[0]?.split("=")[1];
};
// src/tokens/handshake.ts
async function verifyHandshakeJwt(token, { key }) {
    const { data: decoded, errors } = decodeJwt(token);
    if (errors) {
        throw errors[0];
    }
    const { header, payload } = decoded;
    const { typ, alg } = header;
    assertHeaderType(typ);
    assertHeaderAlgorithm(alg);
    const { data: signatureValid, errors: signatureErrors } = await hasValidSignature(decoded, key);
    if (signatureErrors) {
        throw new TokenVerificationError({
            reason: TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Error verifying handshake token. ${signatureErrors[0]}`
        });
    }
    if (!signatureValid) {
        throw new TokenVerificationError({
            reason: TokenVerificationErrorReason.TokenInvalidSignature,
            message: "Handshake signature is invalid."
        });
    }
    return payload;
}
async function verifyHandshakeToken(token, options) {
    const { secretKey, apiUrl, apiVersion, jwksCacheTtlInMs, jwtKey, skipJwksCache } = options;
    const { data, errors } = decodeJwt(token);
    if (errors) {
        throw errors[0];
    }
    const { kid } = data.header;
    let key;
    if (jwtKey) {
        key = loadClerkJWKFromLocal(jwtKey);
    } else if (secretKey) {
        key = await loadClerkJWKFromRemote({
            secretKey,
            apiUrl,
            apiVersion,
            kid,
            jwksCacheTtlInMs,
            skipJwksCache
        });
    } else {
        throw new TokenVerificationError({
            action: TokenVerificationErrorAction.SetClerkJWTKey,
            message: "Failed to resolve JWK during handshake verification.",
            reason: TokenVerificationErrorReason.JWKFailedToResolve
        });
    }
    return await verifyHandshakeJwt(token, {
        key
    });
}
// src/tokens/request.ts
var RefreshTokenErrorReason = {
    NonEligibleNoCookie: "non-eligible-no-refresh-cookie",
    NonEligibleNonGet: "non-eligible-non-get",
    InvalidSessionToken: "invalid-session-token",
    MissingApiClient: "missing-api-client",
    MissingSessionToken: "missing-session-token",
    MissingRefreshToken: "missing-refresh-token",
    ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed",
    ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim",
    FetchError: "fetch-error",
    UnexpectedSDKError: "unexpected-sdk-error",
    UnexpectedBAPIError: "unexpected-bapi-error"
};
function assertSignInUrlExists(signInUrl, key) {
    if (!signInUrl && isDevelopmentFromSecretKey(key)) {
        throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
    }
}
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
    if (!proxyUrlOrDomain) {
        throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
    }
}
function assertSignInUrlFormatAndOrigin(_signInUrl, origin) {
    let signInUrl;
    try {
        signInUrl = new URL(_signInUrl);
    } catch  {
        throw new Error(`The signInUrl needs to have a absolute url format.`);
    }
    if (signInUrl.origin === origin) {
        throw new Error(`The signInUrl needs to be on a different origin than your satellite application.`);
    }
}
function isRequestEligibleForHandshake(authenticateContext) {
    const { accept, secFetchDest } = authenticateContext;
    if (secFetchDest === "document" || secFetchDest === "iframe") {
        return true;
    }
    if (!secFetchDest && accept?.startsWith("text/html")) {
        return true;
    }
    return false;
}
function isRequestEligibleForRefresh(err, authenticateContext, request) {
    return err.reason === TokenVerificationErrorReason.TokenExpired && !!authenticateContext.refreshTokenInCookie && request.method === "GET";
}
async function authenticateRequest(request, options) {
    const authenticateContext = await createAuthenticateContext(createClerkRequest(request), options);
    assertValidSecretKey(authenticateContext.secretKey);
    if (authenticateContext.isSatellite) {
        assertSignInUrlExists(authenticateContext.signInUrl, authenticateContext.secretKey);
        if (authenticateContext.signInUrl && authenticateContext.origin) {
            assertSignInUrlFormatAndOrigin(authenticateContext.signInUrl, authenticateContext.origin);
        }
        assertProxyUrlOrDomain(authenticateContext.proxyUrl || authenticateContext.domain);
    }
    const organizationSyncTargetMatchers = computeOrganizationSyncTargetMatchers(options.organizationSyncOptions);
    function removeDevBrowserFromURL(url) {
        const updatedURL = new URL(url);
        updatedURL.searchParams.delete(chunk_LFAHZTE6_constants.QueryParameters.DevBrowser);
        updatedURL.searchParams.delete(chunk_LFAHZTE6_constants.QueryParameters.LegacyDevBrowser);
        return updatedURL;
    }
    function buildRedirectToHandshake({ handshakeReason }) {
        const redirectUrl = removeDevBrowserFromURL(authenticateContext.clerkUrl);
        const frontendApiNoProtocol = authenticateContext.frontendApi.replace(/http(s)?:\/\//, "");
        const url = new URL(`https://${frontendApiNoProtocol}/v1/client/handshake`);
        url.searchParams.append("redirect_url", redirectUrl?.href || "");
        url.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.SuffixedCookies, authenticateContext.usesSuffixedCookies().toString());
        url.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.HandshakeReason, handshakeReason);
        if (authenticateContext.instanceType === "development" && authenticateContext.devBrowserToken) {
            url.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.DevBrowser, authenticateContext.devBrowserToken);
        }
        const toActivate = getOrganizationSyncTarget(authenticateContext.clerkUrl, options.organizationSyncOptions, organizationSyncTargetMatchers);
        if (toActivate) {
            const params = getOrganizationSyncQueryParams(toActivate);
            params.forEach((value, key)=>{
                url.searchParams.append(key, value);
            });
        }
        return new Headers({
            [chunk_LFAHZTE6_constants.Headers.Location]: url.href
        });
    }
    async function resolveHandshake() {
        const headers = new Headers({
            "Access-Control-Allow-Origin": "null",
            "Access-Control-Allow-Credentials": "true"
        });
        const handshakePayload = await verifyHandshakeToken(authenticateContext.handshakeToken, authenticateContext);
        const cookiesToSet = handshakePayload.handshake;
        let sessionToken = "";
        cookiesToSet.forEach((x)=>{
            headers.append("Set-Cookie", x);
            if (getCookieName(x).startsWith(chunk_LFAHZTE6_constants.Cookies.Session)) {
                sessionToken = getCookieValue(x);
            }
        });
        if (authenticateContext.instanceType === "development") {
            const newUrl = new URL(authenticateContext.clerkUrl);
            newUrl.searchParams.delete(chunk_LFAHZTE6_constants.QueryParameters.Handshake);
            newUrl.searchParams.delete(chunk_LFAHZTE6_constants.QueryParameters.HandshakeHelp);
            headers.append(chunk_LFAHZTE6_constants.Headers.Location, newUrl.toString());
            headers.set(chunk_LFAHZTE6_constants.Headers.CacheControl, "no-store");
        }
        if (sessionToken === "") {
            return signedOut(authenticateContext, AuthErrorReason.SessionTokenMissing, "", headers);
        }
        const { data, errors: [error] = [] } = await verifyToken(sessionToken, authenticateContext);
        if (data) {
            return signedIn(authenticateContext, data, headers, sessionToken);
        }
        if (authenticateContext.instanceType === "development" && (error?.reason === TokenVerificationErrorReason.TokenExpired || error?.reason === TokenVerificationErrorReason.TokenNotActiveYet || error?.reason === TokenVerificationErrorReason.TokenIatInTheFuture)) {
            error.tokenCarrier = "cookie";
            console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${error.getFullMessage()}`);
            const { data: retryResult, errors: [retryError] = [] } = await verifyToken(sessionToken, {
                ...authenticateContext,
                clockSkewInMs: 864e5
            });
            if (retryResult) {
                return signedIn(authenticateContext, retryResult, headers, sessionToken);
            }
            throw new Error(retryError?.message || "Clerk: Handshake retry failed.");
        }
        throw new Error(error?.message || "Clerk: Handshake failed.");
    }
    async function refreshToken(authenticateContext2) {
        if (!options.apiClient) {
            return {
                data: null,
                error: {
                    message: "An apiClient is needed to perform token refresh.",
                    cause: {
                        reason: RefreshTokenErrorReason.MissingApiClient
                    }
                }
            };
        }
        const { sessionToken: expiredSessionToken, refreshTokenInCookie: refreshToken2 } = authenticateContext2;
        if (!expiredSessionToken) {
            return {
                data: null,
                error: {
                    message: "Session token must be provided.",
                    cause: {
                        reason: RefreshTokenErrorReason.MissingSessionToken
                    }
                }
            };
        }
        if (!refreshToken2) {
            return {
                data: null,
                error: {
                    message: "Refresh token must be provided.",
                    cause: {
                        reason: RefreshTokenErrorReason.MissingRefreshToken
                    }
                }
            };
        }
        const { data: decodeResult, errors: decodedErrors } = decodeJwt(expiredSessionToken);
        if (!decodeResult || decodedErrors) {
            return {
                data: null,
                error: {
                    message: "Unable to decode the expired session token.",
                    cause: {
                        reason: RefreshTokenErrorReason.ExpiredSessionTokenDecodeFailed,
                        errors: decodedErrors
                    }
                }
            };
        }
        if (!decodeResult?.payload?.sid) {
            return {
                data: null,
                error: {
                    message: "Expired session token is missing the `sid` claim.",
                    cause: {
                        reason: RefreshTokenErrorReason.ExpiredSessionTokenMissingSidClaim
                    }
                }
            };
        }
        try {
            const response = await options.apiClient.sessions.refreshSession(decodeResult.payload.sid, {
                format: "cookie",
                suffixed_cookies: authenticateContext2.usesSuffixedCookies(),
                expired_token: expiredSessionToken || "",
                refresh_token: refreshToken2 || "",
                request_origin: authenticateContext2.clerkUrl.origin,
                // The refresh endpoint expects headers as Record<string, string[]>, so we need to transform it.
                request_headers: Object.fromEntries(Array.from(request.headers.entries()).map(([k, v])=>[
                        k,
                        [
                            v
                        ]
                    ]))
            });
            return {
                data: response.cookies,
                error: null
            };
        } catch (err) {
            if (err?.errors?.length) {
                if (err.errors[0].code === "unexpected_error") {
                    return {
                        data: null,
                        error: {
                            message: `Fetch unexpected error`,
                            cause: {
                                reason: RefreshTokenErrorReason.FetchError,
                                errors: err.errors
                            }
                        }
                    };
                }
                return {
                    data: null,
                    error: {
                        message: err.errors[0].code,
                        cause: {
                            reason: err.errors[0].code,
                            errors: err.errors
                        }
                    }
                };
            } else {
                return {
                    data: null,
                    error: {
                        message: `Unexpected Server/BAPI error`,
                        cause: {
                            reason: RefreshTokenErrorReason.UnexpectedBAPIError,
                            errors: [
                                err
                            ]
                        }
                    }
                };
            }
        }
    }
    async function attemptRefresh(authenticateContext2) {
        const { data: cookiesToSet, error } = await refreshToken(authenticateContext2);
        if (!cookiesToSet || cookiesToSet.length === 0) {
            return {
                data: null,
                error
            };
        }
        const headers = new Headers();
        let sessionToken = "";
        cookiesToSet.forEach((x)=>{
            headers.append("Set-Cookie", x);
            if (getCookieName(x).startsWith(chunk_LFAHZTE6_constants.Cookies.Session)) {
                sessionToken = getCookieValue(x);
            }
        });
        const { data: jwtPayload, errors } = await verifyToken(sessionToken, authenticateContext2);
        if (errors) {
            return {
                data: null,
                error: {
                    message: `Clerk: unable to verify refreshed session token.`,
                    cause: {
                        reason: RefreshTokenErrorReason.InvalidSessionToken,
                        errors
                    }
                }
            };
        }
        return {
            data: {
                jwtPayload,
                sessionToken,
                headers
            },
            error: null
        };
    }
    function handleMaybeHandshakeStatus(authenticateContext2, reason, message, headers) {
        if (isRequestEligibleForHandshake(authenticateContext2)) {
            const handshakeHeaders = headers ?? buildRedirectToHandshake({
                handshakeReason: reason
            });
            if (handshakeHeaders.get(chunk_LFAHZTE6_constants.Headers.Location)) {
                handshakeHeaders.set(chunk_LFAHZTE6_constants.Headers.CacheControl, "no-store");
            }
            const isRedirectLoop = setHandshakeInfiniteRedirectionLoopHeaders(handshakeHeaders);
            if (isRedirectLoop) {
                const msg = `Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard.`;
                console.log(msg);
                return signedOut(authenticateContext2, reason, message);
            }
            return handshake(authenticateContext2, reason, message, handshakeHeaders);
        }
        return signedOut(authenticateContext2, reason, message);
    }
    function handleMaybeOrganizationSyncHandshake(authenticateContext2, auth) {
        const organizationSyncTarget = getOrganizationSyncTarget(authenticateContext2.clerkUrl, options.organizationSyncOptions, organizationSyncTargetMatchers);
        if (!organizationSyncTarget) {
            return null;
        }
        let mustActivate = false;
        if (organizationSyncTarget.type === "organization") {
            if (organizationSyncTarget.organizationSlug && organizationSyncTarget.organizationSlug !== auth.orgSlug) {
                mustActivate = true;
            }
            if (organizationSyncTarget.organizationId && organizationSyncTarget.organizationId !== auth.orgId) {
                mustActivate = true;
            }
        }
        if (organizationSyncTarget.type === "personalAccount" && auth.orgId) {
            mustActivate = true;
        }
        if (!mustActivate) {
            return null;
        }
        if (authenticateContext2.handshakeRedirectLoopCounter > 0) {
            console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation.");
            return null;
        }
        const handshakeState = handleMaybeHandshakeStatus(authenticateContext2, AuthErrorReason.ActiveOrganizationMismatch, "");
        if (handshakeState.status !== "handshake") {
            return null;
        }
        return handshakeState;
    }
    async function authenticateRequestWithTokenInHeader() {
        const { sessionTokenInHeader } = authenticateContext;
        try {
            const { data, errors } = await verifyToken(sessionTokenInHeader, authenticateContext);
            if (errors) {
                throw errors[0];
            }
            return signedIn(authenticateContext, data, void 0, sessionTokenInHeader);
        } catch (err) {
            return handleError(err, "header");
        }
    }
    function setHandshakeInfiniteRedirectionLoopHeaders(headers) {
        if (authenticateContext.handshakeRedirectLoopCounter === 3) {
            return true;
        }
        const newCounterValue = authenticateContext.handshakeRedirectLoopCounter + 1;
        const cookieName = chunk_LFAHZTE6_constants.Cookies.RedirectCount;
        headers.append("Set-Cookie", `${cookieName}=${newCounterValue}; SameSite=Lax; HttpOnly; Max-Age=3`);
        return false;
    }
    function handleHandshakeTokenVerificationErrorInDevelopment(error) {
        if (error.reason === TokenVerificationErrorReason.TokenInvalidSignature) {
            const msg = `Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.`;
            throw new Error(msg);
        }
        throw new Error(`Clerk: Handshake token verification failed: ${error.getFullMessage()}.`);
    }
    async function authenticateRequestWithTokenInCookie() {
        const hasActiveClient = authenticateContext.clientUat;
        const hasSessionToken = !!authenticateContext.sessionTokenInCookie;
        const hasDevBrowserToken = !!authenticateContext.devBrowserToken;
        if (authenticateContext.handshakeToken) {
            try {
                return await resolveHandshake();
            } catch (error) {
                if (error instanceof TokenVerificationError && authenticateContext.instanceType === "development") {
                    handleHandshakeTokenVerificationErrorInDevelopment(error);
                } else {
                    console.error("Clerk: unable to resolve handshake:", error);
                }
            }
        }
        if (authenticateContext.instanceType === "development" && authenticateContext.clerkUrl.searchParams.has(chunk_LFAHZTE6_constants.QueryParameters.DevBrowser)) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserSync, "");
        }
        const isRequestEligibleForMultiDomainSync = authenticateContext.isSatellite && authenticateContext.secFetchDest === "document";
        if (authenticateContext.instanceType === "production" && isRequestEligibleForMultiDomainSync) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SatelliteCookieNeedsSyncing, "");
        }
        if (authenticateContext.instanceType === "development" && isRequestEligibleForMultiDomainSync && !authenticateContext.clerkUrl.searchParams.has(chunk_LFAHZTE6_constants.QueryParameters.ClerkSynced)) {
            const redirectURL = new URL(authenticateContext.signInUrl);
            redirectURL.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.ClerkRedirectUrl, authenticateContext.clerkUrl.toString());
            const headers = new Headers({
                [chunk_LFAHZTE6_constants.Headers.Location]: redirectURL.toString()
            });
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SatelliteCookieNeedsSyncing, "", headers);
        }
        const redirectUrl = new URL(authenticateContext.clerkUrl).searchParams.get(chunk_LFAHZTE6_constants.QueryParameters.ClerkRedirectUrl);
        if (authenticateContext.instanceType === "development" && !authenticateContext.isSatellite && redirectUrl) {
            const redirectBackToSatelliteUrl = new URL(redirectUrl);
            if (authenticateContext.devBrowserToken) {
                redirectBackToSatelliteUrl.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.DevBrowser, authenticateContext.devBrowserToken);
            }
            redirectBackToSatelliteUrl.searchParams.append(chunk_LFAHZTE6_constants.QueryParameters.ClerkSynced, "true");
            const headers = new Headers({
                [chunk_LFAHZTE6_constants.Headers.Location]: redirectBackToSatelliteUrl.toString()
            });
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.PrimaryRespondsToSyncing, "", headers);
        }
        if (authenticateContext.instanceType === "development" && !hasDevBrowserToken) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserMissing, "");
        }
        if (!hasActiveClient && !hasSessionToken) {
            return signedOut(authenticateContext, AuthErrorReason.SessionTokenAndUATMissing, "");
        }
        if (!hasActiveClient && hasSessionToken) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenWithoutClientUAT, "");
        }
        if (hasActiveClient && !hasSessionToken) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.ClientUATWithoutSessionToken, "");
        }
        const { data: decodeResult, errors: decodedErrors } = decodeJwt(authenticateContext.sessionTokenInCookie);
        if (decodedErrors) {
            return handleError(decodedErrors[0], "cookie");
        }
        if (decodeResult.payload.iat < authenticateContext.clientUat) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenIATBeforeClientUAT, "");
        }
        try {
            const { data, errors } = await verifyToken(authenticateContext.sessionTokenInCookie, authenticateContext);
            if (errors) {
                throw errors[0];
            }
            const signedInRequestState = signedIn(authenticateContext, data, void 0, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            authenticateContext.sessionTokenInCookie);
            const handshakeRequestState = handleMaybeOrganizationSyncHandshake(authenticateContext, signedInRequestState.toAuth());
            if (handshakeRequestState) {
                return handshakeRequestState;
            }
            return signedInRequestState;
        } catch (err) {
            return handleError(err, "cookie");
        }
        return signedOut(authenticateContext, AuthErrorReason.UnexpectedError);
    }
    async function handleError(err, tokenCarrier) {
        if (!(err instanceof TokenVerificationError)) {
            return signedOut(authenticateContext, AuthErrorReason.UnexpectedError);
        }
        let refreshError;
        if (isRequestEligibleForRefresh(err, authenticateContext, request)) {
            const { data, error } = await attemptRefresh(authenticateContext);
            if (data) {
                return signedIn(authenticateContext, data.jwtPayload, data.headers, data.sessionToken);
            }
            if (error?.cause?.reason) {
                refreshError = error.cause.reason;
            } else {
                refreshError = RefreshTokenErrorReason.UnexpectedSDKError;
            }
        } else {
            if (request.method !== "GET") {
                refreshError = RefreshTokenErrorReason.NonEligibleNonGet;
            } else if (!authenticateContext.refreshTokenInCookie) {
                refreshError = RefreshTokenErrorReason.NonEligibleNoCookie;
            } else {
                refreshError = null;
            }
        }
        err.tokenCarrier = tokenCarrier;
        const reasonToHandshake = [
            TokenVerificationErrorReason.TokenExpired,
            TokenVerificationErrorReason.TokenNotActiveYet,
            TokenVerificationErrorReason.TokenIatInTheFuture
        ].includes(err.reason);
        if (reasonToHandshake) {
            return handleMaybeHandshakeStatus(authenticateContext, convertTokenVerificationErrorReasonToAuthErrorReason({
                tokenError: err.reason,
                refreshError
            }), err.getFullMessage());
        }
        return signedOut(authenticateContext, err.reason, err.getFullMessage());
    }
    if (authenticateContext.sessionTokenInHeader) {
        return authenticateRequestWithTokenInHeader();
    }
    return authenticateRequestWithTokenInCookie();
}
var debugRequestState = (params)=>{
    const { isSignedIn, proxyUrl, reason, message, publishableKey, isSatellite, domain } = params;
    return {
        isSignedIn,
        proxyUrl,
        reason,
        message,
        publishableKey,
        isSatellite,
        domain
    };
};
function computeOrganizationSyncTargetMatchers(options) {
    let personalAccountMatcher = null;
    if (options?.personalAccountPatterns) {
        try {
            personalAccountMatcher = match(options.personalAccountPatterns);
        } catch (e) {
            throw new Error(`Invalid personal account pattern "${options.personalAccountPatterns}": "${e}"`);
        }
    }
    let organizationMatcher = null;
    if (options?.organizationPatterns) {
        try {
            organizationMatcher = match(options.organizationPatterns);
        } catch (e) {
            throw new Error(`Clerk: Invalid organization pattern "${options.organizationPatterns}": "${e}"`);
        }
    }
    return {
        OrganizationMatcher: organizationMatcher,
        PersonalAccountMatcher: personalAccountMatcher
    };
}
function getOrganizationSyncTarget(url, options, matchers) {
    if (!options) {
        return null;
    }
    if (matchers.OrganizationMatcher) {
        let orgResult;
        try {
            orgResult = matchers.OrganizationMatcher(url.pathname);
        } catch (e) {
            console.error(`Clerk: Failed to apply organization pattern "${options.organizationPatterns}" to a path`, e);
            return null;
        }
        if (orgResult && "params" in orgResult) {
            const params = orgResult.params;
            if ("id" in params && typeof params.id === "string") {
                return {
                    type: "organization",
                    organizationId: params.id
                };
            }
            if ("slug" in params && typeof params.slug === "string") {
                return {
                    type: "organization",
                    organizationSlug: params.slug
                };
            }
            console.warn("Clerk: Detected an organization pattern match, but no organization ID or slug was found in the URL. Does the pattern include `:id` or `:slug`?");
        }
    }
    if (matchers.PersonalAccountMatcher) {
        let personalResult;
        try {
            personalResult = matchers.PersonalAccountMatcher(url.pathname);
        } catch (e) {
            console.error(`Failed to apply personal account pattern "${options.personalAccountPatterns}" to a path`, e);
            return null;
        }
        if (personalResult) {
            return {
                type: "personalAccount"
            };
        }
    }
    return null;
}
function getOrganizationSyncQueryParams(toActivate) {
    const ret = /* @__PURE__ */ new Map();
    if (toActivate.type === "personalAccount") {
        ret.set("organization_id", "");
    }
    if (toActivate.type === "organization") {
        if (toActivate.organizationId) {
            ret.set("organization_id", toActivate.organizationId);
        }
        if (toActivate.organizationSlug) {
            ret.set("organization_id", toActivate.organizationSlug);
        }
    }
    return ret;
}
var convertTokenVerificationErrorReasonToAuthErrorReason = ({ tokenError, refreshError })=>{
    switch(tokenError){
        case TokenVerificationErrorReason.TokenExpired:
            return `${AuthErrorReason.SessionTokenExpired}-refresh-${refreshError}`;
        case TokenVerificationErrorReason.TokenNotActiveYet:
            return AuthErrorReason.SessionTokenNBF;
        case TokenVerificationErrorReason.TokenIatInTheFuture:
            return AuthErrorReason.SessionTokenIatInTheFuture;
        default:
            return AuthErrorReason.UnexpectedError;
    }
};
// src/util/mergePreDefinedOptions.ts
function mergePreDefinedOptions(preDefinedOptions, options) {
    return Object.keys(preDefinedOptions).reduce((obj, key)=>{
        return {
            ...obj,
            [key]: options[key] || obj[key]
        };
    }, {
        ...preDefinedOptions
    });
}
// src/tokens/factory.ts
var chunk_LFAHZTE6_defaultOptions = {
    secretKey: "",
    jwtKey: "",
    apiUrl: void 0,
    apiVersion: void 0,
    proxyUrl: "",
    publishableKey: "",
    isSatellite: false,
    domain: "",
    audience: ""
};
function chunk_LFAHZTE6_createAuthenticateRequest(params) {
    const buildTimeOptions = mergePreDefinedOptions(chunk_LFAHZTE6_defaultOptions, params.options);
    const apiClient = params.apiClient;
    const authenticateRequest2 = (request, options = {})=>{
        const { apiUrl, apiVersion } = buildTimeOptions;
        const runTimeOptions = mergePreDefinedOptions(buildTimeOptions, options);
        return authenticateRequest(request, {
            ...options,
            ...runTimeOptions,
            // We should add all the omitted props from options here (eg apiUrl / apiVersion)
            // to avoid runtime options override them.
            apiUrl,
            apiVersion,
            apiClient
        });
    };
    return {
        authenticateRequest: authenticateRequest2,
        debugRequestState
    };
}
 //# sourceMappingURL=chunk-LFAHZTE6.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/chunk-P263NW7Z.mjs
// src/jwt/legacyReturn.ts
function withLegacyReturn(cb) {
    return async (...args)=>{
        const { data, errors } = await cb(...args);
        if (errors) {
            throw errors[0];
        }
        return data;
    };
}
function withLegacySyncReturn(cb) {
    return (...args)=>{
        const { data, errors } = cb(...args);
        if (errors) {
            throw errors[0];
        }
        return data;
    };
}
 //# sourceMappingURL=chunk-P263NW7Z.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-RWYTRAIK.mjs
// src/underscore.ts
var toSentence = (items)=>{
    if (items.length == 0) {
        return "";
    }
    if (items.length == 1) {
        return items[0];
    }
    let sentence = items.slice(0, -1).join(", ");
    sentence += `, or ${items.slice(-1)}`;
    return sentence;
};
var IP_V4_ADDRESS_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
function isIPV4Address(str) {
    return IP_V4_ADDRESS_REGEX.test(str || "");
}
function titleize(str) {
    const s = str || "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function snakeToCamel(str) {
    return str ? str.replace(/([-_][a-z])/g, (match)=>match.toUpperCase().replace(/-|_/, "")) : "";
}
function camelToSnake(str) {
    return str ? str.replace(/[A-Z]/g, (letter)=>`_${letter.toLowerCase()}`) : "";
}
var createDeepObjectTransformer = (transform)=>{
    const deepTransform = (obj)=>{
        if (!obj) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map((el)=>{
                if (typeof el === "object" || Array.isArray(el)) {
                    return deepTransform(el);
                }
                return el;
            });
        }
        const copy = {
            ...obj
        };
        const keys = Object.keys(copy);
        for (const oldName of keys){
            const newName = transform(oldName.toString());
            if (newName !== oldName) {
                copy[newName] = copy[oldName];
                delete copy[oldName];
            }
            if (typeof copy[newName] === "object") {
                copy[newName] = deepTransform(copy[newName]);
            }
        }
        return copy;
    };
    return deepTransform;
};
var deepCamelToSnake = createDeepObjectTransformer(camelToSnake);
var deepSnakeToCamel = createDeepObjectTransformer(snakeToCamel);
function chunk_RWYTRAIK_isTruthy(value) {
    if (typeof value === `boolean`) {
        return value;
    }
    if (value === void 0 || value === null) {
        return false;
    }
    if (typeof value === `string`) {
        if (value.toLowerCase() === `true`) {
            return true;
        }
        if (value.toLowerCase() === `false`) {
            return false;
        }
    }
    const number = parseInt(value, 10);
    if (isNaN(number)) {
        return false;
    }
    if (number > 0) {
        return true;
    }
    return false;
}
function getNonUndefinedValues(obj) {
    return Object.entries(obj).reduce((acc, [key, value])=>{
        if (value !== void 0) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
 //# sourceMappingURL=chunk-RWYTRAIK.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/chunk-L6WULBPV.mjs



// src/telemetry/throttler.ts
var DEFAULT_CACHE_TTL_MS = 864e5;
var _storageKey, _cacheTtl, _TelemetryEventThrottler_instances, generateKey_fn, cache_get, isValidBrowser_get;
var TelemetryEventThrottler = class {
    constructor(){
        __privateAdd(this, _TelemetryEventThrottler_instances);
        __privateAdd(this, _storageKey, "clerk_telemetry_throttler");
        __privateAdd(this, _cacheTtl, DEFAULT_CACHE_TTL_MS);
    }
    isEventThrottled(payload) {
        if (!__privateGet(this, _TelemetryEventThrottler_instances, isValidBrowser_get)) {
            return false;
        }
        const now = Date.now();
        const key = __privateMethod(this, _TelemetryEventThrottler_instances, generateKey_fn).call(this, payload);
        const entry = __privateGet(this, _TelemetryEventThrottler_instances, cache_get)?.[key];
        if (!entry) {
            const updatedCache = {
                ...__privateGet(this, _TelemetryEventThrottler_instances, cache_get),
                [key]: now
            };
            localStorage.setItem(__privateGet(this, _storageKey), JSON.stringify(updatedCache));
        }
        const shouldInvalidate = entry && now - entry > __privateGet(this, _cacheTtl);
        if (shouldInvalidate) {
            const updatedCache = __privateGet(this, _TelemetryEventThrottler_instances, cache_get);
            delete updatedCache[key];
            localStorage.setItem(__privateGet(this, _storageKey), JSON.stringify(updatedCache));
        }
        return !!entry;
    }
};
_storageKey = new WeakMap();
_cacheTtl = new WeakMap();
_TelemetryEventThrottler_instances = new WeakSet();
/**
 * Generates a consistent unique key for telemetry events by sorting payload properties.
 * This ensures that payloads with identical content in different orders produce the same key.
 */ generateKey_fn = function(event) {
    const { sk: _sk, pk: _pk, payload, ...rest } = event;
    const sanitizedEvent = {
        ...payload,
        ...rest
    };
    return JSON.stringify(Object.keys({
        ...payload,
        ...rest
    }).sort().map((key)=>sanitizedEvent[key]));
};
cache_get = function() {
    const cacheString = localStorage.getItem(chunk_7ELT755Q_privateGet(this, _storageKey));
    if (!cacheString) {
        return {};
    }
    return JSON.parse(cacheString);
};
isValidBrowser_get = function() {
    if (true) {
        return false;
    }
    const storage = window.localStorage;
    if (!storage) {
        return false;
    }
    try {
        const testKey = "test";
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    } catch (err) {
        const isQuotaExceededError = err instanceof DOMException && // Check error names for different browsers
        (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED");
        if (isQuotaExceededError && storage.length > 0) {
            storage.removeItem(chunk_7ELT755Q_privateGet(this, _storageKey));
        }
        return false;
    }
};
// src/telemetry/collector.ts
var DEFAULT_CONFIG = {
    samplingRate: 1,
    maxBufferSize: 5,
    // Production endpoint: https://clerk-telemetry.com
    // Staging endpoint: https://staging.clerk-telemetry.com
    // Local: http://localhost:8787
    endpoint: "https://clerk-telemetry.com"
};
var _config, _eventThrottler, _metadata, _buffer, _pendingFlush, _TelemetryCollector_instances, shouldRecord_fn, shouldBeSampled_fn, scheduleFlush_fn, flush_fn, logEvent_fn, getSDKMetadata_fn, preparePayload_fn;
var chunk_L6WULBPV_TelemetryCollector = class {
    constructor(options){
        __privateAdd(this, _TelemetryCollector_instances);
        __privateAdd(this, _config);
        __privateAdd(this, _eventThrottler);
        __privateAdd(this, _metadata, {});
        __privateAdd(this, _buffer, []);
        __privateAdd(this, _pendingFlush);
        __privateSet(this, _config, {
            maxBufferSize: options.maxBufferSize ?? DEFAULT_CONFIG.maxBufferSize,
            samplingRate: options.samplingRate ?? DEFAULT_CONFIG.samplingRate,
            disabled: options.disabled ?? false,
            debug: options.debug ?? false,
            endpoint: DEFAULT_CONFIG.endpoint
        });
        if (!options.clerkVersion && "undefined" === "undefined") {
            __privateGet(this, _metadata).clerkVersion = "";
        } else {
            __privateGet(this, _metadata).clerkVersion = options.clerkVersion ?? "";
        }
        __privateGet(this, _metadata).sdk = options.sdk;
        __privateGet(this, _metadata).sdkVersion = options.sdkVersion;
        __privateGet(this, _metadata).publishableKey = options.publishableKey ?? "";
        const parsedKey = parsePublishableKey(options.publishableKey);
        if (parsedKey) {
            __privateGet(this, _metadata).instanceType = parsedKey.instanceType;
        }
        if (options.secretKey) {
            __privateGet(this, _metadata).secretKey = options.secretKey.substring(0, 16);
        }
        __privateSet(this, _eventThrottler, new TelemetryEventThrottler());
    }
    get isEnabled() {
        if (__privateGet(this, _metadata).instanceType !== "development") {
            return false;
        }
        if (__privateGet(this, _config).disabled || typeof process !== "undefined" && isTruthy(process.env.CLERK_TELEMETRY_DISABLED)) {
            return false;
        }
        if (false) {}
        return true;
    }
    get isDebug() {
        return __privateGet(this, _config).debug || typeof process !== "undefined" && isTruthy(process.env.CLERK_TELEMETRY_DEBUG);
    }
    record(event) {
        const preparedPayload = __privateMethod(this, _TelemetryCollector_instances, preparePayload_fn).call(this, event.event, event.payload);
        __privateMethod(this, _TelemetryCollector_instances, logEvent_fn).call(this, preparedPayload.event, preparedPayload);
        if (!__privateMethod(this, _TelemetryCollector_instances, shouldRecord_fn).call(this, preparedPayload, event.eventSamplingRate)) {
            return;
        }
        __privateGet(this, _buffer).push(preparedPayload);
        __privateMethod(this, _TelemetryCollector_instances, scheduleFlush_fn).call(this);
    }
};
_config = new WeakMap();
_eventThrottler = new WeakMap();
_metadata = new WeakMap();
_buffer = new WeakMap();
_pendingFlush = new WeakMap();
_TelemetryCollector_instances = new WeakSet();
shouldRecord_fn = function(preparedPayload, eventSamplingRate) {
    return this.isEnabled && !this.isDebug && chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, shouldBeSampled_fn).call(this, preparedPayload, eventSamplingRate);
};
shouldBeSampled_fn = function(preparedPayload, eventSamplingRate) {
    const randomSeed = Math.random();
    const toBeSampled = randomSeed <= chunk_7ELT755Q_privateGet(this, _config).samplingRate && (typeof eventSamplingRate === "undefined" || randomSeed <= eventSamplingRate);
    if (!toBeSampled) {
        return false;
    }
    return !chunk_7ELT755Q_privateGet(this, _eventThrottler).isEventThrottled(preparedPayload);
};
scheduleFlush_fn = function() {
    if (true) {
        chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
        return;
    }
    const isBufferFull = chunk_7ELT755Q_privateGet(this, _buffer).length >= chunk_7ELT755Q_privateGet(this, _config).maxBufferSize;
    if (isBufferFull) {
        if (chunk_7ELT755Q_privateGet(this, _pendingFlush)) {
            const cancel = typeof cancelIdleCallback !== "undefined" ? cancelIdleCallback : clearTimeout;
            cancel(chunk_7ELT755Q_privateGet(this, _pendingFlush));
        }
        chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
        return;
    }
    if (chunk_7ELT755Q_privateGet(this, _pendingFlush)) {
        return;
    }
    if ("requestIdleCallback" in window) {
        chunk_7ELT755Q_privateSet(this, _pendingFlush, requestIdleCallback(()=>{
            chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
        }));
    } else {
        chunk_7ELT755Q_privateSet(this, _pendingFlush, setTimeout(()=>{
            chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
        }, 0));
    }
};
flush_fn = function() {
    fetch(new URL("/v1/event", chunk_7ELT755Q_privateGet(this, _config).endpoint), {
        method: "POST",
        // TODO: We send an array here with that idea that we can eventually send multiple events.
        body: JSON.stringify({
            events: chunk_7ELT755Q_privateGet(this, _buffer)
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(()=>void 0).then(()=>{
        chunk_7ELT755Q_privateSet(this, _buffer, []);
    }).catch(()=>void 0);
};
/**
 * If running in debug mode, log the event and its payload to the console.
 */ logEvent_fn = function(event, payload) {
    if (!this.isDebug) {
        return;
    }
    if (typeof console.groupCollapsed !== "undefined") {
        console.groupCollapsed("[clerk/telemetry]", event);
        console.log(payload);
        console.groupEnd();
    } else {
        console.log("[clerk/telemetry]", event, payload);
    }
};
/**
 * If in browser, attempt to lazily grab the SDK metadata from the Clerk singleton, otherwise fallback to the initially passed in values.
 *
 * This is necessary because the sdkMetadata can be set by the host SDK after the TelemetryCollector is instantiated.
 */ getSDKMetadata_fn = function() {
    let sdkMetadata = {
        name: chunk_7ELT755Q_privateGet(this, _metadata).sdk,
        version: chunk_7ELT755Q_privateGet(this, _metadata).sdkVersion
    };
    if (false) {}
    return sdkMetadata;
};
/**
 * Append relevant metadata from the Clerk singleton to the event payload.
 */ preparePayload_fn = function(event, payload) {
    const sdkMetadata = chunk_7ELT755Q_privateMethod(this, _TelemetryCollector_instances, getSDKMetadata_fn).call(this);
    return {
        event,
        cv: chunk_7ELT755Q_privateGet(this, _metadata).clerkVersion ?? "",
        it: chunk_7ELT755Q_privateGet(this, _metadata).instanceType ?? "",
        sdk: sdkMetadata.name,
        sdkv: sdkMetadata.version,
        ...chunk_7ELT755Q_privateGet(this, _metadata).publishableKey ? {
            pk: chunk_7ELT755Q_privateGet(this, _metadata).publishableKey
        } : {},
        ...chunk_7ELT755Q_privateGet(this, _metadata).secretKey ? {
            sk: chunk_7ELT755Q_privateGet(this, _metadata).secretKey
        } : {},
        payload
    };
};
// src/telemetry/events/component-mounted.ts
var EVENT_COMPONENT_MOUNTED = "COMPONENT_MOUNTED";
var EVENT_COMPONENT_OPENED = "COMPONENT_OPENED";
var EVENT_SAMPLING_RATE = 0.1;
function createPrebuiltComponentEvent(event) {
    return function(component, props, additionalPayload) {
        return {
            event,
            eventSamplingRate: EVENT_SAMPLING_RATE,
            payload: {
                component,
                appearanceProp: Boolean(props?.appearance),
                baseTheme: Boolean(props?.appearance?.baseTheme),
                elements: Boolean(props?.appearance?.elements),
                variables: Boolean(props?.appearance?.variables),
                ...additionalPayload
            }
        };
    };
}
function eventPrebuiltComponentMounted(component, props, additionalPayload) {
    return createPrebuiltComponentEvent(EVENT_COMPONENT_MOUNTED)(component, props, additionalPayload);
}
function eventPrebuiltComponentOpened(component, props, additionalPayload) {
    return createPrebuiltComponentEvent(EVENT_COMPONENT_OPENED)(component, props, additionalPayload);
}
function eventComponentMounted(component, props = {}) {
    return {
        event: EVENT_COMPONENT_MOUNTED,
        eventSamplingRate: EVENT_SAMPLING_RATE,
        payload: {
            component,
            ...props
        }
    };
}
// src/telemetry/events/method-called.ts
var EVENT_METHOD_CALLED = "METHOD_CALLED";
function eventMethodCalled(method, payload) {
    return {
        event: EVENT_METHOD_CALLED,
        payload: {
            method,
            ...payload
        }
    };
}
// src/telemetry/events/framework-metadata.ts
var EVENT_FRAMEWORK_METADATA = "FRAMEWORK_METADATA";
var EVENT_SAMPLING_RATE2 = 0.1;
function eventFrameworkMetadata(payload) {
    return {
        event: EVENT_FRAMEWORK_METADATA,
        eventSamplingRate: EVENT_SAMPLING_RATE2,
        payload
    };
}
 //# sourceMappingURL=chunk-L6WULBPV.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/telemetry.mjs







 //# sourceMappingURL=telemetry.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/index.mjs





// src/index.ts

var verifyToken2 = withLegacyReturn(verifyToken);
function createClerkClient(options) {
    const opts = {
        ...options
    };
    const apiClient = createBackendApiClient(opts);
    const requestState = createAuthenticateRequest({
        options: opts,
        apiClient
    });
    const telemetry = new TelemetryCollector({
        ...options.telemetry,
        publishableKey: opts.publishableKey,
        secretKey: opts.secretKey,
        samplingRate: 0.1,
        ...opts.sdkMetadata ? {
            sdk: opts.sdkMetadata.name,
            sdkVersion: opts.sdkMetadata.version
        } : {}
    });
    return {
        ...apiClient,
        ...requestState,
        telemetry
    };
}
 //# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/buildAccountsBaseUrl.mjs

// src/buildAccountsBaseUrl.ts
function buildAccountsBaseUrl_buildAccountsBaseUrl(frontendApi) {
    if (!frontendApi) {
        return "";
    }
    const accountsBaseUrl = frontendApi.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
    return `https://${accountsBaseUrl}`;
}
 //# sourceMappingURL=buildAccountsBaseUrl.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/shared/dist/authorization-errors.mjs


 //# sourceMappingURL=authorization-errors.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/backend/dist/internal.mjs




// src/createRedirect.ts

var buildUrl = (_baseUrl, _targetUrl, _returnBackUrl, _devBrowserToken)=>{
    if (_baseUrl === "") {
        return legacyBuildUrl(_targetUrl.toString(), _returnBackUrl?.toString());
    }
    const baseUrl = new URL(_baseUrl);
    const returnBackUrl = _returnBackUrl ? new URL(_returnBackUrl, baseUrl) : void 0;
    const res = new URL(_targetUrl, baseUrl);
    if (returnBackUrl) {
        res.searchParams.set("redirect_url", returnBackUrl.toString());
    }
    if (_devBrowserToken && baseUrl.hostname !== res.hostname) {
        res.searchParams.set(constants.QueryParameters.DevBrowser, _devBrowserToken);
    }
    return res.toString();
};
var legacyBuildUrl = (targetUrl, redirectUrl)=>{
    let url;
    if (!targetUrl.startsWith("http")) {
        if (!redirectUrl || !redirectUrl.startsWith("http")) {
            throw new Error("destination url or return back url should be an absolute path url!");
        }
        const baseURL = new URL(redirectUrl);
        url = new URL(targetUrl, baseURL.origin);
    } else {
        url = new URL(targetUrl);
    }
    if (redirectUrl) {
        url.searchParams.set("redirect_url", redirectUrl);
    }
    return url.toString();
};
var createRedirect = (params)=>{
    const { publishableKey, redirectAdapter, signInUrl, signUpUrl, baseUrl, sessionStatus } = params;
    const parsedPublishableKey = parsePublishableKey(publishableKey);
    const frontendApi = parsedPublishableKey?.frontendApi;
    const isDevelopment = parsedPublishableKey?.instanceType === "development";
    const accountsBaseUrl = buildAccountsBaseUrl(frontendApi);
    const hasPendingStatus = sessionStatus === "pending";
    const redirectToTasks = (url, { returnBackUrl })=>{
        return redirectAdapter(buildUrl(baseUrl, `${url}/tasks`, returnBackUrl, isDevelopment ? params.devBrowserToken : null));
    };
    const redirectToSignUp = ({ returnBackUrl } = {})=>{
        if (!signUpUrl && !accountsBaseUrl) {
            errorThrower.throwMissingPublishableKeyError();
        }
        const accountsSignUpUrl = `${accountsBaseUrl}/sign-up`;
        function buildSignUpUrl(signIn) {
            if (!signIn) {
                return;
            }
            const url = new URL(signIn, baseUrl);
            url.pathname = `${url.pathname}/create`;
            return url.toString();
        }
        const targetUrl = signUpUrl || buildSignUpUrl(signInUrl) || accountsSignUpUrl;
        if (hasPendingStatus) {
            return redirectToTasks(targetUrl, {
                returnBackUrl
            });
        }
        return redirectAdapter(buildUrl(baseUrl, targetUrl, returnBackUrl, isDevelopment ? params.devBrowserToken : null));
    };
    const redirectToSignIn = ({ returnBackUrl } = {})=>{
        if (!signInUrl && !accountsBaseUrl) {
            errorThrower.throwMissingPublishableKeyError();
        }
        const accountsSignInUrl = `${accountsBaseUrl}/sign-in`;
        const targetUrl = signInUrl || accountsSignInUrl;
        if (hasPendingStatus) {
            return redirectToTasks(targetUrl, {
                returnBackUrl
            });
        }
        return redirectAdapter(buildUrl(baseUrl, targetUrl, returnBackUrl, isDevelopment ? params.devBrowserToken : null));
    };
    return {
        redirectToSignUp,
        redirectToSignIn
    };
};
// src/util/decorateObjectWithResources.ts
var decorateObjectWithResources = async (obj, authObj, opts)=>{
    const { loadSession, loadUser, loadOrganization } = opts || {};
    const { userId, sessionId, orgId } = authObj;
    const { sessions, users, organizations } = createBackendApiClient({
        ...opts
    });
    const [sessionResp, userResp, organizationResp] = await Promise.all([
        loadSession && sessionId ? sessions.getSession(sessionId) : Promise.resolve(void 0),
        loadUser && userId ? users.getUser(userId) : Promise.resolve(void 0),
        loadOrganization && orgId ? organizations.getOrganization({
            organizationId: orgId
        }) : Promise.resolve(void 0)
    ]);
    const resources = stripPrivateDataFromObject({
        session: sessionResp,
        user: userResp,
        organization: organizationResp
    });
    return Object.assign(obj, resources);
};
function stripPrivateDataFromObject(authObject) {
    const user = authObject.user ? {
        ...authObject.user
    } : authObject.user;
    const organization = authObject.organization ? {
        ...authObject.organization
    } : authObject.organization;
    prunePrivateMetadata(user);
    prunePrivateMetadata(organization);
    return {
        ...authObject,
        user,
        organization
    };
}
function prunePrivateMetadata(resource) {
    if (resource) {
        if ("privateMetadata" in resource) {
            delete resource["privateMetadata"];
        }
        if ("private_metadata" in resource) {
            delete resource["private_metadata"];
        }
    }
    return resource;
}
// src/internal.ts

 //# sourceMappingURL=internal.mjs.map

;// CONCATENATED MODULE: ./node_modules/@clerk/nextjs/dist/esm/server/index.js










 //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/exports/next-response.js
// This file is for modularized imports for next/server to get fully-treeshaking.
 //# sourceMappingURL=next-response.js.map

;// CONCATENATED MODULE: ./middleware.ts


/* harmony default export */ const middleware = ((0,server_namespaceObject.withClerkMiddleware)((req)=>{
    return NextResponse.next();
}));
const config = {
    matcher: [
        "/((?!_next|favicon.ico|.*..*).*)"
    ]
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CAKhal%5COneDrive%5CDokumente%5CGitHub%5Cmvp_gpt&matchers=W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFfbmV4dHxmYXZpY29uLmljb3wuKi4uKikuKikpKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLygoPyFfbmV4dHxmYXZpY29uLmljb3wuKi4uKikuKikifV0%3D&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFfbmV4dHxmYXZpY29uLmljb3wuKi4uKikuKikpKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiLygoPyFfbmV4dHxmYXZpY29uLmljb3wuKi4uKikuKikifV19!


// Import the userland code.

const mod = {
    ...middleware_namespaceObject
};
const handler = mod.middleware || mod.default;
const page = "/middleware";
if (typeof handler !== "function") {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return adapter({
        ...opts,
        page,
        handler
    });
}

//# sourceMappingURL=middleware.js.map

/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = parse;
__webpack_unused_export__ = serialize;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */ const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */ const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (()=>{
    const C = function() {};
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */ function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break; // No more cookie pairs.
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (obj[key] === undefined) {
            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            let valEndIdx = endIndex(str, endIdx, valStartIdx);
            const value = dec(str.slice(valStartIdx, valEndIdx));
            obj[key] = value;
        }
        index = endIdx + 1;
    }while (index < len);
    return obj;
}
function startIndex(str, index, max) {
    do {
        const code = str.charCodeAt(index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index;
    }while (++index < max);
    return max;
}
function endIndex(str, index, min) {
    while(index > min){
        const code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 */ function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options) return str;
    if (options.maxAge !== undefined) {
        if (!Number.isInteger(options.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
            throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
    }
    if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
            throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
    }
    if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
        str += "; HttpOnly";
    }
    if (options.secure) {
        str += "; Secure";
    }
    if (options.partitioned) {
        str += "; Partitioned";
    }
    if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : undefined;
        switch(priority){
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
    }
    if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch(sameSite){
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */ function decode(str) {
    if (str.indexOf("%") === -1) return str;
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */ function isDate(val) {
    return __toString.call(val) === "[object Date]";
} //# sourceMappingURL=index.js.map


/***/ }),

/***/ 625:
/***/ ((module) => {

"use strict";

const isObject = (value)=>typeof value === "object" && value !== null;
const mapObjectSkip = Symbol("skip");
// Customized for this use-case
const isObjectCustom = (value)=>isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
const mapObject = (object, mapper, options, isSeen = new WeakMap())=>{
    options = {
        deep: false,
        target: {},
        ...options
    };
    if (isSeen.has(object)) {
        return isSeen.get(object);
    }
    isSeen.set(object, options.target);
    const { target } = options;
    delete options.target;
    const mapArray = (array)=>array.map((element)=>isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);
    if (Array.isArray(object)) {
        return mapArray(object);
    }
    for (const [key, value] of Object.entries(object)){
        const mapResult = mapper(key, value, object);
        if (mapResult === mapObjectSkip) {
            continue;
        }
        let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
        // Drop `__proto__` keys.
        if (newKey === "__proto__") {
            continue;
        }
        if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
            newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper, options, isSeen);
        }
        target[newKey] = newValue;
    }
    return target;
};
module.exports = (object, mapper, options)=>{
    if (!isObject(object)) {
        throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
    }
    return mapObject(object, mapper, options);
};
module.exports.mapObjectSkip = mapObjectSkip;


/***/ }),

/***/ 492:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 842:
/***/ ((module) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();


/***/ }),

/***/ 130:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  snakeCase: () => (/* binding */ snakeCase)
});

;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
/** @deprecated */ function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
/** @deprecated */ function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
/* harmony default export */ const tslib_es6 = ({
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
});

;// CONCATENATED MODULE: ./node_modules/lower-case/dist.es2015/index.js
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */ var SUPPORTED_LOCALE = {
    tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
            İ: "i",
            I: "ı",
            İ: "i"
        }
    },
    az: {
        regexp: /\u0130/g,
        map: {
            İ: "i",
            I: "ı",
            İ: "i"
        }
    },
    lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
            I: "i̇",
            J: "j̇",
            Į: "į̇",
            Ì: "i̇̀",
            Í: "i̇́",
            Ĩ: "i̇̃"
        }
    }
};
/**
 * Localized lower case.
 */ function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang) return lowerCase(str.replace(lang.regexp, function(m) {
        return lang.map[m];
    }));
    return lowerCase(str);
}
/**
 * Lower case as a function.
 */ function lowerCase(str) {
    return str.toLowerCase();
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/no-case/dist.es2015/index.js

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [
    /([a-z0-9])([A-Z])/g,
    /([A-Z])([A-Z][a-z])/g
];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */ function noCase(input, options) {
    if (options === void 0) {
        options = {};
    }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\x00$2"), stripRegexp, "\x00");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while(result.charAt(start) === "\x00")start++;
    while(result.charAt(end - 1) === "\x00")end--;
    // Transform each token independently.
    return result.slice(start, end).split("\x00").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */ function replace(input, re, value) {
    if (re instanceof RegExp) return input.replace(re, value);
    return re.reduce(function(input, re) {
        return input.replace(re, value);
    }, input);
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/dot-case/dist.es2015/index.js


function dotCase(input, options) {
    if (options === void 0) {
        options = {};
    }
    return noCase(input, __assign({
        delimiter: "."
    }, options));
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/snake-case/dist.es2015/index.js


function snakeCase(input, options) {
    if (options === void 0) {
        options = {};
    }
    return dotCase(input, __assign({
        delimiter: "_"
    }, options));
} //# sourceMappingURL=index.js.map


/***/ }),

/***/ 543:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const map = __webpack_require__(625);
const { snakeCase } = __webpack_require__(130);
const PlainObjectConstructor = {}.constructor;
module.exports = function(obj, options) {
    if (Array.isArray(obj)) {
        if (obj.some((item)=>item.constructor !== PlainObjectConstructor)) {
            throw new Error("obj must be array of plain objects");
        }
    } else {
        if (obj.constructor !== PlainObjectConstructor) {
            throw new Error("obj must be an plain object");
        }
    }
    options = Object.assign({
        deep: true,
        exclude: [],
        parsingOptions: {}
    }, options);
    return map(obj, function(key, val) {
        return [
            matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),
            val,
            mapperOptions(key, val, options)
        ];
    }, options);
};
function matches(patterns, value) {
    return patterns.some(function(pattern) {
        return typeof pattern === "string" ? pattern === value : pattern.test(value);
    });
}
function mapperOptions(key, val, options) {
    return options.shouldRecurse ? {
        shouldRecurse: options.shouldRecurse(key, val)
    } : undefined;
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(474));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_middleware = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map