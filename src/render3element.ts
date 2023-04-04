import {Bounds, parseBounds, parseDocumentSize} from './css/layout/bounds';
import {color, Color, COLORS, isTransparent} from './css/types/color';
import {Parser} from './css/syntax/parser';
import {Logger} from './core/logger';
import {CloneOptions, DocumentCloner3} from './dom/document-cloner3';
import {isBodyElement, isHTMLElement, parseTree} from './dom/node-parser';
import {CacheStorage, ResourceOptions} from './core/cache-storage';
import {CanvasRenderer, RenderOptions} from './render/canvas/canvas-renderer';
import {ForeignObjectRenderer} from './render/canvas/foreignobject-renderer';

export type Options = CloneOptions &
    RenderOptions &
    ResourceOptions & {
        backgroundColor: string | null;
        foreignObjectRendering: boolean;
        logging: boolean;
        removeContainer?: boolean;
        elements?: any;
        canvass?: any;
        size: any[];
    };

const parseColor = (value: string): Color => color.parse(Parser.create(value).parseComponentValue());

if (typeof window !== 'undefined') {
    CacheStorage.setContext(window);
}

const render3Element = async (element: HTMLElement, opts: Partial<Options>): Promise<any> => {
    const ownerDocument = element.ownerDocument;
    if (!ownerDocument) {
        throw new Error(`Element is not attached to a Document`);
    }
    const defaultView = ownerDocument.defaultView;
    if (!defaultView) {
        throw new Error(`Document is not attached to a Window`);
    }
    const instanceName = (Math.round(Math.random() * 1000) + Date.now()).toString(16);

    const {width, height, left, top} = getDomRect(element);
    function getDomRect(element: HTMLElement) {
        if (!ownerDocument) throw new Error(`Element is not attached to a Document`);
        const {width, height, left, top} =
            isBodyElement(element) || isHTMLElement(element) ? parseDocumentSize(ownerDocument) : parseBounds(element);

        return {width, height, left, top};
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  defaultResourceOptions
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const defaultResourceOptions = {
        allowTaint: false,
        imageTimeout: 15000,
        proxy: undefined,
        useCORS: false
    };

    const resourceOptions: ResourceOptions = {...defaultResourceOptions, ...opts};

    const defaultOptions = {
        backgroundColor: '#ffffff',
        cache: opts.cache ? opts.cache : CacheStorage.create(instanceName, resourceOptions),
        logging: true,
        removeContainer: true,
        foreignObjectRendering: false,
        scale: defaultView.devicePixelRatio || 1,
        windowWidth: defaultView.innerWidth,
        windowHeight: defaultView.innerHeight,
        scrollX: defaultView.pageXOffset,
        scrollY: defaultView.pageYOffset,
        x: left,
        y: top,
        width: Math.ceil(width),
        height: Math.ceil(height),
        id: instanceName
    };

    const options: Options = {size: [], ...defaultOptions, ...resourceOptions, ...opts};

    const windowBounds = new Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);
    Logger.create({id: instanceName, enabled: options.logging});
    Logger.getInstance(instanceName).debug(`Starting document clone`);

    const documentCloner = new DocumentCloner3(element, {
        id: instanceName,
        onclone: options.onclone,
        elements: options.elements,
        ignoreElements: options.ignoreElements,
        inlineImages: options.foreignObjectRendering,
        copyStyles: options.foreignObjectRendering
    });

    const clonedElements = documentCloner.clonedReferenceElements;
    const container = await documentCloner.toIFrame(ownerDocument, windowBounds);

    const documentBackgroundColor = ownerDocument.documentElement
        ? parseColor(getComputedStyle(ownerDocument.documentElement).backgroundColor as string)
        : COLORS.TRANSPARENT;
    const bodyBackgroundColor = ownerDocument.body
        ? parseColor(getComputedStyle(ownerDocument.body).backgroundColor as string)
        : COLORS.TRANSPARENT;

    const bgColor = opts.backgroundColor;
    const defaultBackgroundColor =
        typeof bgColor === 'string' ? parseColor(bgColor) : bgColor === null ? COLORS.TRANSPARENT : 0xffffffff;

    const backgroundColor =
        element === ownerDocument.documentElement
            ? isTransparent(documentBackgroundColor)
                ? isTransparent(bodyBackgroundColor)
                    ? defaultBackgroundColor
                    : bodyBackgroundColor
                : documentBackgroundColor
            : defaultBackgroundColor;

    let canvass = {};

    function getRenderOptions(i: any) {
        const element = options.elements[i];
        const canvas = options.canvass ? options.canvass[i] : null;
        let {width, height, left, top} = getDomRect(element);

        width = options.size && options.size.length ? options.size[i][0] : width;
        height = options.size && options.size.length ? options.size[i][1] : height;
        width = Math.floor(width);
        height = Math.floor(height);

        let renderOptions = {
            id: instanceName + i.toString(),
            index: i,
            cache: options.cache,
            canvas,
            backgroundColor,
            scale: options.scale,
            x: left,
            y: top,
            scrollX: options.scrollX,
            scrollY: options.scrollY,
            width,
            height,
            windowWidth: options.windowWidth,
            windowHeight: options.windowHeight
        };

        return renderOptions;
    }

    if (options.foreignObjectRendering) {
        for (let i = 0; i < clonedElements.length; i++) {
            const ele = clonedElements[i] as HTMLElement;
            if (!ele) continue;

            const opts = getRenderOptions(i);
            const renderer = new ForeignObjectRenderer(opts);
            const canvas = await renderer.render(ele);
            Object(canvass)[opts.index] = canvas;
        }
    } else {
        for (let i = 0; i < clonedElements.length; i++) {
            const ele = clonedElements[i] as HTMLElement;
            if (!ele) continue;

            CacheStorage.attachInstance(options.cache);
            const root = parseTree(ele);
            CacheStorage.detachInstance();

            if (backgroundColor === root.styles.backgroundColor) {
                root.styles.backgroundColor = COLORS.TRANSPARENT;
            }
            const opts = getRenderOptions(i);
            const renderer = new CanvasRenderer(opts);
            const canvas = await renderer.render(root);
            Object(canvass)[opts.index] = canvas;
        }
    }

    if (options.removeContainer === true) {
        DocumentCloner3.destroy(container);
    }

    CacheStorage.destroy(instanceName);

    return Object.values(canvass);
};

export default render3Element;
