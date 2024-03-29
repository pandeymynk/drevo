declare interface AgoraApiExecutor<T> {
    onSuccess: (result: T) => void;
    onError: (err: Error) => void;
}

export declare abstract class AudioExtension<Q extends AudioProcessor> extends Extension<Q> implements IAudioExtension<Q> {
}

export declare abstract class AudioProcessor extends BaseProcessor implements IAudioProcessor {
    get kind(): Kind;
    protected inputNode?: AudioNode;
    protected outputNode?: AudioNode;
    protected destination?: IBaseProcessor;
    protected context?: IAudioProcessorContext;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    protected output(output: MediaStreamTrack | AudioNode, context: IAudioProcessorContext): void;
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IAudioProcessorContext;
    }): void;
    reset(): void;
    /**
     * methods implemented by extension developer
     * */
    protected onNode?(audioNode: AudioNode, context: IProcessorContext): void | Promise<void>;
}

export declare type AutoAdjustConfig = {
    checkDuration: number;
    checkTimes: number;
    targetAverageTime: number;
    targetFps: number;
};

declare abstract class BaseProcessor extends EventEmitter_2 implements IBaseProcessor {
    protected inputTrack?: MediaStreamTrack;
    protected outputTrack?: MediaStreamTrack;
    protected _enabled: boolean;
    _source?: BaseProcessor;
    readonly ID: string;
    abstract get kind(): Kind;
    get enabled(): boolean;
    protected output(track: MediaStreamTrack, context: IProcessorContext): void;
    protected destination?: IBaseProcessor;
    protected context?: IProcessorContext;
    constructor();
    enable(): void | Promise<void>;
    disable(): void | Promise<void>;
    /**
     * methods/properties called by SDK/extension user
     * */
    abstract pipe(processor: IBaseProcessor): IBaseProcessor;
    abstract unpipe(): void;
    abstract updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IProcessorContext;
    }): void;
    abstract reset(): void;
    /**
     * methods implemented by extension developer
     * */
    abstract name: string;
    protected onTrack?(track: MediaStreamTrack, context: IProcessorContext): void | Promise<void>;
    protected onEnableChange?(enabled: boolean): void | Promise<void>;
    protected onPiped?(context: IProcessorContext): void;
    protected onUnpiped?(context?: IProcessorContext): void;
}

export declare function CreateAutoAdjuster(backend: 'cpu' | 'gpu', direction: 'local' | 'remote', procecssor: BaseProcessor, config: AutoAdjustConfig): IAutoAdjuster;

declare interface EventEmitter {
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
}

/**
 * @ignore
 */
/** @en
 * @ignore
 */
declare class EventEmitter_2 {
    private _events;
    /**
     * 指定一个事件名，获取当前所有监听这个事件的回调函数。
     *
     * @param event - 事件名称。
     */
    /** @en
     * Gets all the listeners for a specified event.
     *
     * @param event The event name.
     */
    getListeners(event: string): Function[];
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    /** @en
     * Listens for a specified event.
     *
     * When the specified event happens, the SDK triggers the callback that you pass.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    on(event: string, listener: Function): void;
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * 当监听后事件第一次触发时，该监听和回调函数就会被立刻移除，也就是只监听一次指定事件。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    /** @en
     * Listens for a specified event once.
     *
     * When the specified event happens, the SDK triggers the callback that you pass and then removes the listener.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    once(event: string, listener: Function): void;
    /**
     * 取消一个指定事件的监听。
     *
     * @param event - 指定事件的名称。
     * @param listener - 监听事件时传入的回调函数。
     */
    /** @en
     * Removes the listener for a specified event.
     *
     * @param event The event name.
     * @param listener The callback that corresponds to the event listener.
     */
    off(event: string, listener: Function): void;
    /**
     * 指定一个事件，取消其所有的监听。
     *
     * @param event - 指定事件的名称，如果没有指定事件，则取消所有事件的所有监听。
     */
    /** @en
     * Removes all listeners for a specified event.
     *
     * @param event The event name. If left empty, all listeners for all events are removed.
     */
    removeAllListeners(event?: string): void;
    private _indexOfListener;
    emitAsPromise<T = any>(event: string, ...args: any[]): Promise<T>;
    emitAsPromiseNoResponse(event: string, ...args: any[]): Promise<void>;
}

export declare abstract class Extension<T extends BaseProcessor> implements IExtension<T> {
    protected readonly __registered__: boolean;
    private logger;
    private reporter;
    protected parameters: IExtensionParameters;
    protected abstract _createProcessor(): T;
    checkCompatibility?(): boolean;
    createProcessor(): T;
    static setLogLevel(level: number): void;
}

export declare interface IAudioExtension<T extends IAudioProcessor> extends IExtension<T> {
    createProcessor(): T;
}

export declare interface IAudioProcessor extends IBaseProcessor {
    /** @ignore */
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IAudioProcessorContext;
    }): void;
}

export declare interface IAudioProcessorContext extends IProcessorContext {
    getAudioContext(): AudioContext;
}

export declare interface IAutoAdjuster {
    setConfig(config: AutoAdjustConfig): void;
    reset(): void;
    setMediaStreamTrackInfo(id: string, framerate?: number): void;
    getTrackFramerate(): number;
    onProcessFrame(startTime: number, endTime: number): Promise<boolean>;
    shouldDisableProcessor(startTime: number, endTime: number): Promise<boolean>;
    disableProcessor(): Promise<void>;
}

export declare interface IBaseProcessor extends EventEmitter {
    /**
     * 处理器的名称。
     */
    /**
     * @en
     * The name of this processor.
     */
    readonly name: string;
    /**
     * 处理器的 ID。
     */
    /**
     * @en
     * The ID of this processor.
     */
    readonly ID: string;
    /**
     * 处理器的类型，标识用于视频或者音频。
     */
    /**
     * @en
     * The type of processor, identify it is to process audio or video.
     */
    kind: "video" | "audio";
    /**
     * 标识处理器的状态。
     */
    /**
     * @en
     * The enabled state of processor.
     */
    enabled: boolean;
    /**
     * 连接下一个处理器或者音频/视频输出。
     * @param processor 下一个处理器或者音频/视频输出终点。
     */
    /**
     * @en
     * Pipe the next processor or audio/video destination.
     * @param processor The next processor or audio/video destination.
     */
    pipe(processor: IBaseProcessor): IBaseProcessor;
    /**
     * 取消当前处理器到下一个的连接。
     */
    /**
     * @en
     * Unpipe this processor to the next one.
     */
    unpipe(): void;
    /**
     * 禁用当前处理器，将当前处理器的输入作为输出。
     */
    /**
     * @en
     * Disable this processor, make the input of this processor as the output.
     */
    disable(): void | Promise<void>;
    /**
     * 启用当前处理器。
     */
    /**
     * @en
     * Enable the current processor.
     */
    enable(): void | Promise<void>;
    /** @ignore */
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IProcessorContext;
    }): void;
    /** @ignore */
    reset(): void;
}

export declare interface IExtension<T extends IBaseProcessor> {
    createProcessor(): T;
    checkCompatibility?(): boolean;
}

export declare interface IExtensionLogger {
    debug(...args: any): void;
    info(...args: any): void;
    warning(...args: any): void;
    error(...args: any): void;
    setLogLevel(level: number): void;
}

declare interface IExtensionParameters {
    [key: string]: any;
}

export declare interface IExtensionReporter {
    reportApiInvoke<T>(params: ReportApiInvokeParams, throttleTime?: number): AgoraApiExecutor<T>;
}

export declare interface IProcessorContext {
    getConstraints(): Promise<MediaTrackConstraints>;
    requestApplyConstraints(constraints: MediaTrackConstraints, processor: IBaseProcessor): Promise<void>;
    requestRevertConstraints(processor: IBaseProcessor): Promise<void>;
    registerStats(processor: IBaseProcessor, type: string, cb: () => any): void;
    unregisterStats(processor: IBaseProcessor, type: string): void;
    gatherStats(): ProcessorStats[];
    registerUsage(processor: IBaseProcessor, cb: () => Usage | Promise<Usage>): void;
    unregisterUsage(processor: IBaseProcessor): void;
    getDirection(): "local" | "remote";
    gatherUsage(): Promise<UsageWithDirection[]>;
}

export declare type Kind = "video" | "audio";

declare class Logger implements IExtensionLogger {
    private logLevel;
    private hookLog?;
    /**
     * 设置 SDK 的日志输出级别
     * @param level - SDK 日志级别依次为 NONE(4)，ERROR(3)，WARNING(2)，INFO(1)，DEBUG(0)。选择一个级别，
     * 你就可以看到在该级别及该级别以上所有级别的日志信息。
     *
     * 例如，如果你输入代码 Logger.setLogLevel(1);，就可以看到 INFO，ERROR 和 WARNING 级别的日志信息。
     */
    setLogLevel(level: number): void;
    debug(...args: any): void;
    info(...args: any): void;
    warning(...args: any): void;
    error(...args: any): void;
    private log;
}

export declare const logger: Logger;

export declare interface ProcessorStats {
    processorID: string;
    processorName: string;
    type: string;
    stats: any;
}

export declare class PromiseMutex {
    private lockingPromise;
    private locks;
    private name;
    private lockId;
    constructor(name?: string);
    get isLocked(): boolean;
    lock(info?: string): Promise<() => void>;
}

declare interface ReportApiInvokeParams {
    name: string;
    options: any;
    reportResult?: boolean;
    timeout?: number;
}

declare class Reporter implements IExtensionReporter {
    private apiInvokeMsgQueue;
    private hookApiInvoke?;
    reportApiInvoke<T>(params: ReportApiInvokeParams): AgoraApiExecutor<T>;
    private sendApiInvoke;
}

export declare const reporter: Reporter;

export declare class Ticker {
    type: TICKER_TYPE;
    interval: number;
    private fn?;
    private _running;
    get running(): boolean;
    private _osc?;
    constructor(type: TICKER_TYPE, interval: number);
    add(fn: Function): void;
    remove(): void;
    start(): void;
    stop(): void;
}

declare type TICKER_TYPE = "Timer" | "RAF" | "Oscillator";

export declare interface Usage {
    id: string;
    value: number;
    level: number;
}

export declare interface UsageWithDirection extends Usage {
    direction: "local" | "remote";
}

export declare abstract class VideoProcessor extends BaseProcessor {
    get kind(): Kind;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IProcessorContext;
    }): void;
    reset(): void;
}

export { }
