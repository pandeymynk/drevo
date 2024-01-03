/// <reference types="node" />
import EventEmitter from 'events';
import { IDebugger } from 'debug';

/** @zh-cn
 * 连接状态改变原因
 */
/**
 * Reasons for a connection state change.
 */
declare type ConnectionChangeReason = 'CONNECTING'
/** @zh-cn
 * SDK 登录 Agora RTM 系统成功。
 */
/**
 * The SDK has logged in the Agora RTM system.
 */
 | 'LOGIN_SUCCESS'
/** @zh-cn
 * SDK 登录 Agora RTM 系统失败。
 */
/**
 * The SDK fails to log in the Agora RTM system, because, for example, the token has expired.
 */
 | 'REJECTED_BY_SERVER'
/** @zh-cn
 * SDK 无法登录 Agora RTM 系统超过 6 秒，停止登录。
 */
/**
 * The login has timed out, and the SDK stops logging in. The current login timeout is set as six seconds.
 */
 | 'LOST'
/** @zh-cn
 * SDK 与 Agora RTM 系统的连接被中断超过 4 秒。
 */
/**
 * The connection between the SDK and the Agora RTM system is interrupted for more than four seconds.
 */
 | 'INTERRUPTED'
/** @zh-cn
 * SDK 已登出 Agora RTM 系统。
 */
/**
 * The SDK has logged out of the Agora RTM system.
 */
 | 'LOGOUT'
/** @zh-cn
 * SDK 被服务器禁止登录 Agora RTM 系统。
 */
/**
 * Login is banned by the Agora RTM server.
 */
/** @zh-cn
 * 另一个用户正以相同的 uid 登陆 Agora RTM 系统。
 */
/**
 * Another instance has logged in the Agora RTM system with the same uid.
 */
 | 'SAME_UID_LOGIN'
/** @zh-cn
 * 用户使用的token已过期。
 */
/**
 * The token used by the user has expired.
 */
 | 'TOKEN_EXPIRED';
/** @zh-cn
 * SDK 与 Agora RTM 系统的连接状态类型
 */
/**
 * Connection states between the SDK and the Agora RTM system.
 */
declare type ConnectionState = 
/** @zh-cn
 * 初始状态。SDK 未连接到 Agora RTM 系统。
 *
 * App 调用方法 {@link RTMClient.login} 时，SDK 开始登录 Agora RTM 系统，触发回调 {@link RTMEvents.status}，并切换到 {@link CONNECTING} 状态。
 *
 */
/**
 * When the app calls the {@link RTMClient.login} method, the SDK logs in the Agora RTM system, triggers the {@link RTMEvents.status} callback, and switches to the {@link CONNECTING} state.
 */
'DISCONNECTED'
/** @zh-cn
 * SDK 正在登录 Agora RTM 系统。
 *
 * - 方法调用成功时，SDK 会触发回调 {@link RTMEvents.status}，并切换到 {@link CONNECTED} 状态。</li>
 * - 法调用失败，SDK 会触发回调 {@link RTMEvents.status}，并切换到 {@link DISCONNECTED} 状态。</li>
 *
 */
/**
 * The SDK has logged in the Agora RTM system.
 * <ul>
 *     <li>Success = the SDK triggers the {@link RTMEvents.status} callback and switches to the {@link CONNECTED} state.</li,
 *     <li>Failure = the SDK triggers the {@link RTMEvents.status} callback and switches to the {@link DISCONNECTED} state.</li,
 * </ul>
 */
 | 'CONNECTING'
/** @zh-cn
 * SDK 已登录 Agora RTM 系统。
 * <ul>
 *     <li>如果 SDK 与 Agora RTM 系统的连接由于网络问题中断，SDK 会触发回调 {@link RTMEvents.status}，并切换到 {@link RECONNECTING} 状态。</li>
 *     <li>如果 SDK 因为相同 ID 已在其他实例或设备中登录等原因被服务器禁止登录，会触发回调 {@link RTMEvents.status}，并切换到 {@link FAILED} 状态。</li>
 *     <li>如果 App 调用方法 {@link RTMClient.logout}，SDK 登出 Agora RTM 系统成功，会触发回调 {@link RTMEvents.status}，并切换到 {@link DISCONNECTED} 状态。</li>
 * </ul>
 */
/**
 * The SDK has logged in the Agora RTM system.
 * <ul>
 *     <li>If the connection between the SDK and the Agora RTM system is interrupted because of network issues, the SDK triggers the {@link RTMEvents.status} callback and switches to the {@link RECONNECTING} state.</li>
 *     <li>If the login is banned by the server, for example, another instance has logged in with the same uid from a different device, the SDK triggers the {@link RTMEvents.status} callback and switches to the {@link FAILED} state.</li>
 *     <li>If the app calls the {@link RTMClient.logout} method and the SDK successfully logs out of the Agora RTM system, the SDK triggers the {@link RTMEvents.status} callback and switches to the {@link DISCONNECTED} state.</li>
 * </ul>
 */
 | 'RECONNECTING'
/** @zh-cn
 * SDK 正在重新登录 Agora RTM 系统。
 *
 * <ul>
 *     <li>如果 SDK 重新登录 Agora RTM 系统成功，会触发回调 {@link RTMEvents.status}，并切换到 {@link CONNECTED} 状态。</li>
 *     <li>如果 SDK 重新登录 Agora RTM 系统失败，会保持  {@link RECONNECTING} 状态。</li>
 *     <li>如果登录被服务器拒绝，SDK 会触发回调 {@link RTMEvents.status}，并切换到 {@link FAILED} 状态。</li>
 * </ul>
 *
 */
/**
 * The SDK keeps logging in the Agora RTM system.
 * <ul>
 *     <li>If the SDK successfully logs in the Agora RTM system again, it triggers the {@link  RTMEvents.status} callback and switches to the {@link CONNECTED} state.</li>
 *     <li>If the SDK fails to log in the Agora RTM system again, the SDK stays in the {@link RECONNECTING} state. </li>
 *     <li>If the login is rejected by the server, the SDK triggers the {@link  RTMEvents.status} callback and switches to the {@link FAILED} state.</li>
 * </ul>
 */
 | 'CONNECTED'
/** @zh-cn
 * SDK 停止登录 Agora RTM 系统。
 *
 * <p>原因可能为：</p>
 * <p><ul>
 * <li>另一实例已经以同一用户 ID 登录 Agora RTM 系统。</li>
 * <li>token 已过期。</li></ul></p>
 * 请在调用方法 {@link RTMClient.logout} 后，调用方法 {@link RTMClient.login} 登录 Agora RTM 系统。</p>
 */
/**
 * The SDK gives up logging in the Agora RTM system, possibly because another instance has logged in the Agora RTM system with the same uid.
 *
 * <p>Call the {@link RTMClient.logout} method before calling the {@link RTMClient.login} method to log in the Agora RTM system again.</p>
 */
 | 'FAILED';
/** @zh-cn
 * 用户元数据订阅状态。
 */
/**
 * The subscribed state of the user.
 */
declare enum subscribedState {
    /** @zh-cn
     * 0: 用户取消订阅了对应用户。
     */
    /**
     * 0:The user unsubscribes the corresponding user
     */
    UNSUBSCRIBED = "UNSUBSCRIBED",
    /** @zh-cn
     * 1: 用户订阅了对应用户。
     */
    /**
     * 1: The user subscribes to the corresponding user.
     */
    SUBSCRIBED = "SUBSCRIBED"
}
/** @zh-cn
 * 消息类型。
 */
/**
 * Message types.
 */
declare enum MessageType {
    /** @zh-cn
     * 文本消息。
     */
    /**
     * A strig message.
     */
    STRING = "STRING",
    /** @zh-cn
     * 自定义二进制消息。
     */
    /**
     * A binary message.
     */
    BINARY = "BINARY"
}
/** @ignore */
declare enum LegacyAreaCode {
    /** @zh-cn
     * 中国大陆。
     */
    /**
     * Mainland China.
     */
    CN = "CN",
    /** @zh-cn
     * 北美区域。
     */
    /**
     * North America.
     */
    NA = "NA",
    /** @zh-cn
     * 欧洲区域。
     */
    /**
     * Europe.
     */
    EU = "EU",
    /** @zh-cn
     * 除中国大陆以外的亚洲区域。
     */
    /**
     * Asia excluding mainland China.
     */
    AS = "AS",
    /** @japan
     * 日本。
     */
    /**
     * Japan.
     */
    JP = "JP",
    /** @india
     * 印度。
     */
    /**
     * India.
     */
    IN = "IN",
    /** @global
     * （默认）全球。
     */
    /**
     * (Default) Global.
     */
    GLOB = "GLOB",
    /** @Oceania
     * 大洋洲。
     */
    OC = "OC",
    /** @South America
     * 南美洲。
     */
    SA = "SA",
    /** @Africa
     * 非洲。
     */
    AF = "AF",
    /** @south korea
     * 南韩。
     */
    KR = "KR",
    /** @us
     * 美国。
     */
    US = "US",
    /** @oversea
     * 海外。
     */
    OVS = "OVS"
}
/** @zh-cn
 * Agora RTM 服务的限定区域。设置限定区域之后，Agora RTM SDK 只能连接位于限定区域的 Agora RTM 服务。
 */
/**
 * Region for the Agora RTM service. After setting a region, the Agora RTM SDK can only connect to the Agora RTM service in the specified region.
 */
declare enum AreaCode {
    /** @zh-cn
     * （默认）全球。
     */
    /**
     * (Default) Global.
     */
    GLOBAL = "GLOBAL",
    /** @zh-cn
     * 印度。
     */
    /**
     * India.
     */
    INDIA = "INDIA",
    /** @zh-cn
     * 日本。
     */
    /**
     * Japan.
     */
    JAPAN = "JAPAN",
    /** @zh-cn
     * 除中国大陆以外的亚洲区域。
     */
    /**
     * Asia excluding mainland China.
     */
    ASIA = "ASIA",
    /** @zh-cn
     * 欧洲区域。
     */
    /**
     * Europe.
     */
    EUROPE = "EUROPE",
    /** @zh-cn
     * 中国大陆。
     */
    /**
     * Mainland China.
     */
    CHINA = "CHINA",
    /**
     * 北美区域。
     */
    /**
     * North America.
     */
    NORTH_AMERICA = "NORTH_AMERICA"
}
declare type EncryptionMode = 'NONE' | 'AES_128_GCM' | 'AES_256_GCM';
declare type StorageType = 'NONE' | 'USER' | 'CHANNEL';
declare type PresenceEventType = 
/**
 * 0: The presence none of this channel
 */
'NONE'
/**
 * 1: The presence snapshot of this channel
 */
 | 'SNAPSHOT'
/**
 * 2: The presence event triggered in interval mode
 */
 | 'INTERVAL'
/**
 * 3: Triggered when remote user join channel
 */
 | 'REMOTE_JOIN'
/**
 * 4: Triggered when remote user leave channel
 */
 | 'REMOTE_LEAVE'
/**
 * 5: Triggered when remote user's connection timeout
 */
 | 'REMOTE_TIMEOUT'
/**
 * 5: Triggered when user changed state
 */
 | 'REMOTE_STATE_CHANGED'
/**
 * 6: Triggered when user joined channel without presence service
 */
 | 'ERROR_OUT_OF_SERVICE';
declare type TopicEventType = 'NONE'
/**
 * REMOTE_JOIN_TOPIC: Triggered when remote user join a topic
 */
 | 'REMOTE_JOIN'
/**
 * REMOTE_LEAVE_TOPIC: Triggered when remote user leave a topic
 */
 | 'REMOTE_LEAVE'
/**
 * REMOTE_SNAPSHOT: The topic snapshot of this channel
 */
 | 'SNAPSHOT';
declare type StorageEventType = 'NONE' | 'SET' | 'SNAPSHOT' | 'REMOVE' | 'UPDATE';
declare type LockEventType = 'NONE' | 'SET' | 'REMOVED' | 'ACQUIRED' | 'RELEASED' | 'SNAPSHOT' | 'EXPIRED';

type ConstantsType_ConnectionChangeReason = ConnectionChangeReason;
type ConstantsType_ConnectionState = ConnectionState;
type ConstantsType_subscribedState = subscribedState;
declare const ConstantsType_subscribedState: typeof subscribedState;
type ConstantsType_MessageType = MessageType;
declare const ConstantsType_MessageType: typeof MessageType;
type ConstantsType_LegacyAreaCode = LegacyAreaCode;
declare const ConstantsType_LegacyAreaCode: typeof LegacyAreaCode;
type ConstantsType_AreaCode = AreaCode;
declare const ConstantsType_AreaCode: typeof AreaCode;
type ConstantsType_EncryptionMode = EncryptionMode;
type ConstantsType_StorageType = StorageType;
type ConstantsType_PresenceEventType = PresenceEventType;
type ConstantsType_TopicEventType = TopicEventType;
type ConstantsType_StorageEventType = StorageEventType;
type ConstantsType_LockEventType = LockEventType;
declare namespace ConstantsType {
  export {
    ConstantsType_ConnectionChangeReason as ConnectionChangeReason,
    ConstantsType_ConnectionState as ConnectionState,
    ConstantsType_subscribedState as subscribedState,
    ConstantsType_MessageType as MessageType,
    ConstantsType_LegacyAreaCode as LegacyAreaCode,
    ConstantsType_AreaCode as AreaCode,
    ConstantsType_EncryptionMode as EncryptionMode,
    ConstantsType_StorageType as StorageType,
    ConstantsType_PresenceEventType as PresenceEventType,
    ConstantsType_TopicEventType as TopicEventType,
    ConstantsType_StorageEventType as StorageEventType,
    ConstantsType_LockEventType as LockEventType,
  };
}

declare function setArea({ areaCodes, excludedArea, }: {
    areaCodes: AreaCode[];
    excludedArea?: AreaCode;
}): void;

interface BaseResponse {
    timeToken: number;
}
declare type ChannelType = 'STREAM' | 'MESSAGE' | 'NONE';

interface ILogger {
    info: IDebugger;
    warn: IDebugger;
    logError: IDebugger;
    loggerId: number;
    genTracker: (type: TrackType) => (formatter: any, ...args: any[]) => void;
    genLogger: (prefix: string, customPrefix?: string) => (formatter: any, ...args: any[]) => void;
}
declare class EventBase<T = {}> extends EventEmitter {
    logError: IDebugger;
    invokeTracker: (formatter: any, ...args: any[]) => void;
    resultTracker: (formatter: any, ...args: any[]) => void;
    errorTracker: (formatter: any, ...args: any[]) => void;
    eventTracker: (formatter: any, ...args: any[]) => void;
    protected info: IDebugger;
    protected warn: IDebugger;
    protected log: (formatter: any, ...args: any[]) => void;
    protected genLogger: (prefix: string, customPrefix?: string) => (formatter: any, ...args: any[]) => void;
    protected loggerId: number;
    readonly logger: ILogger;
    readonly name: string;
    constructor(logger: ILogger, name: string, trackEmit?: boolean);
}
declare type TrackType = 'Invoke' | 'Result' | 'Event' | 'Error';

/**
 * Reason for the disconnection.
 */
declare enum ConnectionDisconnectedReason {
    /**
     * The user has left the channel.
     */
    LEAVE = "LEAVE",
    /**
     * The network is down, and cannot recover after retry.
     */
    NETWORK_ERROR = "NETWORK_ERROR",
    /**
     * The server returns an error. This is usually caused by incorrect parameter settings.
     */
    SERVER_ERROR = "SERVER_ERROR",
    /**
     * The user is banned.
     */
    UID_BANNED = "UID_BANNED",
    /**
     * The IP is banned.
     */
    IP_BANNED = "IP_BANNED",
    /**
     * The channel is banned.
     */
    CHANNEL_BANNED = "CHANNEL_BANNED",
    FALLBACK = "FALLBACK",
    LICENSE_MISSING = "LICENSE_MISSING",
    LICENSE_EXPIRED = "LICENSE_EXPIRED",
    LICENSE_MINUTES_EXCEEDED = "LICENSE_MINUTES_EXCEEDED",
    LICENSE_PERIOD_INVALID = "LICENSE_PERIOD_INVALID",
    LICENSE_MULTIPLE_SDK_SERVICE = "LICENSE_MULTIPLE_SDK_SERVICE",
    LICENSE_ILLEGAL = "LICENSE_ILLEGAL"
}
/**
 * Connection state between the SDK and Agora's edge server.
 *
 * You can get the connection state through [connectionState]{@link RTMEvents.status}.
 *
 * The connection between the SDK and the edge server has the following states:
 * - `"DISCONNECTED"`: The SDK is disconnected from the server.
 *  - This is the initial state until you call [join]{@link StreamChannel.join}.
 *  - The SDK also enters this state after you call [leave]{@link StreamChannel.leave}, when the user is banned, or when the connection fails.
 * - `"CONNECTING"`: The SDK is connecting to the server. The SDK enters this state when you call [join]{@link StreamChannel.join}.
 * - `"CONNECTED"`: The SDK is connected to the server and joins a channel. The user can now publish streams or subscribe to streams in the channel.
 * - `"RECONNECTING"`: The SDK is reconnecting to the server. If the connection is lost because the network is down or switched, the SDK enters this state.
 * - `"DISCONNECTING"`: The SDK is disconnecting from the server. The SDK enters this state when you call [leave]{@link StreamChannel.leave}.
 */
declare type ConnectionState$1 = 'DISCONNECTED' | 'CONNECTING' | 'RECONNECTING' | 'CONNECTED' | 'DISCONNECTING';

interface LockDetail {
    /**@zh-cn
     * 分布式锁名称。
     */
    /**
     * Distributed lock name.
     */
    lockName: string;
    /**@zh-cn
     * 分布式锁的占有者。
     */
    /**
     * The owner of the distributed lock.
     */
    owner: string;
    /**@zh-cn
     * 锁的过期时间。
     */
    /**
     * The expiration time of the lock.
     */
    ttl: number;
}
interface GetLockResponse extends BaseResponse {
    /**@zh-cn
     * 此频道包含的锁数量。
     */
    /**
     * The number of locks contained in the channel.
     */
    totalLocks: number;
    /**@zh-cn
     * 每把锁的信息。
     */
    /**
     * The infos of every lock. See {@link LockDetail}
     */
    lockDetails: LockDetail[];
    channelName: string;
    channelType: ChannelType;
}
interface LockOperationResponse extends BaseResponse {
    channelName: string;
    channelType: ChannelType;
    lockName: string;
}
interface SetLockResponse extends LockOperationResponse {
}
interface RemoveLockResponse extends LockOperationResponse {
}
interface RevokeLockResponse extends LockOperationResponse {
}
interface ReleaseLockResponse extends LockOperationResponse {
}
interface AcquireLockResponse extends LockOperationResponse {
}
declare class RTMLock {
    /**@zh-cn
     * 设置指定频道的分布式锁。
     * @param options.ttl 可选的 ttl ，表示拥有这把锁的用户掉线后，为其保留多长时间。若超过此时间用户没能恢复链接，锁将会被释放。 默认值 10s。@default 10
     * 最小值 10 秒.(默认值)
     * 最大值 300 秒.
     */
    /**
     * Set a distributed lock for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     * @param lockName The lockName you wants to operate.
     * @param options.ttl An optional ttl indicates how long to keep the lock after the user who owns the lock goes offline. If the user fails to restore the connection after this time, the lock will be released. It is set to `10` by default. @default 10
     * Min 10 seconds.(default)
     * 300 seconds Maximum.
     */
    setLock(channelName: string, channelType: ChannelType, lockName: string, options?: {
        ttl?: number;
    }): Promise<SetLockResponse>;
    /**@zh-cn
     * 删除指定频道的分布式锁。
     */
    /**
     * Delete a distributed lock for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     * @param lockName The lockName you wants to operate.
     */
    removeLock(channelName: string, channelType: ChannelType, lockName: string): Promise<RemoveLockResponse>;
    /**@zh-cn
     * 获取指定频道的分布式锁。
     * @param options.retry 可选的 retry ，当获取的锁被占用时是否继续尝试，直到成功获取或退出频道为止。 默认值 false。@default false
     */
    /**
     * Set a distributed lock for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     * @param lockName The lockName you wants to operate.
     * @param options.retry An Optional retry , whether to keep trying when the acquired lock is occupied, until it is successfully acquired or the channel is exited. It is set to `false` by default. @default false
     */
    acquireLock(channelName: string, channelType: ChannelType, lockName: string, options?: {
        retry?: boolean;
    }): Promise<AcquireLockResponse>;
    /**@zh-cn
     * 释放指定频道的分布式锁。
     */
    /**
     * Release a distributed lock for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     * @param lockName The lockName you wants to operate.
     */
    releaseLock(channelName: string, channelType: ChannelType, lockName: string): Promise<ReleaseLockResponse>;
    /**@zh-cn
     * 剥夺指定频道的某个用户的分布式锁。
     */
    /**
     * Revoke a distributed lock of a user for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     * @param lockName The lockName you wants to operate.
     * @param owner The owner of the lock you wants to revoke.
     */
    revokeLock(channelName: string, channelType: ChannelType, lockName: string, owner: string): Promise<RevokeLockResponse>;
    /**@zh-cn
     * 查询指定频道的分布式锁。
     */
    /**
     * Get all distributed locks for the specified channel.
     * @param channelName A channel that needs to be specified.
     * @param channelType ChannelType for this channel. See {@link ChannelType}
     */
    getLock(channelName: string, channelType: ChannelType): Promise<GetLockResponse>;
}

interface StateDetail {
    [key: string]: string;
}
interface OccupancyDetail {
    states: StateDetail;
    userId: string;
    statesCount: number;
}
interface WhoNowResponse extends BaseResponse {
    totalOccupancy: number;
    occupants: OccupancyDetail[];
    nextPage: string;
}
interface getOnlineUsersResponse extends WhoNowResponse {
}
interface WhoNowOptions {
    includedUserId?: boolean;
    includedState?: boolean;
    page?: string;
}
interface GetOnlineUsersOptions extends WhoNowOptions {
}
interface ChannelDetail {
    channelName: string;
    channelType: ChannelType;
}
interface WhereNowResponse extends BaseResponse {
    channels: ChannelDetail[];
    totalChannel: number;
}
interface GetUserChannelsResponse extends WhereNowResponse {
}
interface SetStateResponse extends BaseResponse {
}
interface GetStateResponse extends OccupancyDetail, BaseResponse {
    statesCount: number;
    states: StateDetail;
    userId: string;
}
interface RemoveStateResponse extends BaseResponse {
}
declare class RTMPresence {
    /**@zh-cn
     * 查询目标频道内的用户。
     *
     */
    /**
     * Query the users in the target channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param options Options for this presence operation. See {@link WhoNowOptions}.
     */
    whoNow(channelName: string, channelType: ChannelType, options?: WhoNowOptions): Promise<WhoNowResponse>;
    /**@zh-cn
     * 查询目标频道内的用户。
     *
     */
    /**
     * Query the users in the target channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param options Options for this presence operation. See {@link GetOnlineUsersOptions}.
     */
    getOnlineUsers(channelName: string, channelType: ChannelType, options?: GetOnlineUsersOptions): Promise<getOnlineUsersResponse>;
    /**@zh-cn
     * 查询目标用户加入的频道。
     *
     */
    /**
     * Query the channels that the target user has joined.
     *
     * @param userId A user that needs to be specified.
     */
    whereNow(userId: string): Promise<WhereNowResponse>;
    /**@zh-cn
     * 查询目标用户加入的频道。
     *
     */
    /**
     * Query the channels that the target user has joined.
     *
     * @param userId A user that needs to be specified.
     */
    getUserChannels(userId: string): Promise<GetUserChannelsResponse>;
    /**@zh-cn
     * 设置用户在某频道下的临时状态。
     *
     */
    /**
     * Set the temporary state of the user in the target channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param state the items user wants to operate, each item must has unique key. The item type please see {@link StateDetail}.
     */
    setState(channelName: string, channelType: ChannelType, state: StateDetail): Promise<SetStateResponse>;
    /**@zh-cn
     * 查询用户在某频道下的临时状态。
     *
     */
    /**
     * Query the temporary state of the user in the target channel.
     *
     * @param userId A user that needs to be specified.
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     */
    getState(userId: string, channelName: string, channelType: ChannelType): Promise<GetStateResponse>;
    /**@zh-cn
     * 删除用户在某频道下的临时状态。
     *
     */
    /**
     * Remove the temporary state of the user in the target channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param options
     * @param options.states Need to provide the state key, if not provided, all states will be deleted.
     */
    removeState(channelName: string, channelType: ChannelType, options?: {
        states?: string[];
    }): Promise<RemoveStateResponse>;
}

/**@zh-cn
 * 元数据项的定义。
 */
/**
 * the define of metadata's item.
 */
interface MetadataItem {
    /**@zh-cn
     * 元数据项的名称。
     */
    /**
     * Name of metadata item.
     */
    key: string;
    /**@zh-cn
     * 元数据项的值。
     */
    /**
     * Value of metadata item.
     */
    value: string;
    /**@zh-cn
     * 元数据项的版本号。
     * -1 表示此属性可竞争读写最后更新者得，
     * 0 表示此属性只有在不存在时才创建，
     * 正整数表示只有版本号匹配时此属性才能被操作成功。
     */
    /**
     * Revision of metadata item. It is set to `-1` by default.
     * @default -1
     */
    revision?: number;
}
interface StorageData {
    /**@zh-cn
     * 此频道包含的属性组个数。
     */
    /**
     * The number of attribute groups contained in the channel.
     */
    totalCount: number;
    /**@zh-cn
     * 元数据的总版本号。
     */
    /**
     * The Revision of metadata.
     */
    majorRevision: number;
    /**@zh-cn
     * 元数据的信息。
     */
    /**
     * The infos of metadata.
     */
    metadata: Record<string, MetaDataDetail>;
}
interface ChannelMetadataOperationResponse extends BaseResponse {
    channelName: string;
    channelType: ChannelType;
}
interface UserMetadataOperationResponse extends BaseResponse {
    userId: string;
}
interface SetChannelMetadataResponse extends ChannelMetadataOperationResponse {
    /**@zh-cn
     * 此频道包含的属性组个数。
     */
    /**
     * The number of attribute groups contained in the channel.
     */
    totalCount: number;
}
interface SetUserMetadataResponse extends UserMetadataOperationResponse {
    /**@zh-cn
     * 此用户的属性组个数。
     */
    /**
     * The number of attribute groups of the user.
     */
    totalCount: number;
}
interface UpdateChannelMetadataResponse extends ChannelMetadataOperationResponse {
    /**@zh-cn
     * 此频道包含的属性组个数。
     */
    /**
     * The number of attribute groups contained in the channel.
     */
    totalCount: number;
}
interface UpdateUserMetadataResponse extends UserMetadataOperationResponse {
    /**@zh-cn
     * 此用户的属性组个数。
     */
    /**
     * The number of attribute groups of the user.
     */
    totalCount: number;
}
interface MetaDataDetail {
    /**@zh-cn
     * 元数据项的值。
     */
    /**
     * Value of metadata item.
     */
    value: string;
    /**@zh-cn
     * 元数据项的版本号。
     */
    /**
     * Revision of metadata item.
     */
    revision: number;
    /**@zh-cn
     * 元数据项最后一次被修改的时间戳。
     */
    /**
     * The timestamp when the metadata item was last modified.
     */
    updated: number;
    /**@zh-cn
     * 最后一次修改元数据项的用户。
     */
    /**
     * The user who last modified the metadata item.
     */
    authorUid: string;
}
interface GetChannelMetadataResponse extends StorageData, ChannelMetadataOperationResponse {
}
interface GetUserMetadataResponse extends StorageData, UserMetadataOperationResponse {
}
interface RemoveChannelMetadataResponse extends ChannelMetadataOperationResponse {
    /**@zh-cn
     * 此频道包含的属性组个数。
     */
    /**
     * The number of attribute groups contained in the channel.
     */
    totalCount: number;
}
interface RemoveUserMetadataResponse extends UserMetadataOperationResponse {
    /**@zh-cn
     * 此用户的属性组个数。
     */
    /**
     * The number of attribute groups of the user.
     */
    totalCount: number;
}
interface SubscribeUserMetaResponse extends UserMetadataOperationResponse {
}
interface UnsubscribeUserMetaResponse extends UserMetadataOperationResponse {
}
interface MetadataOptions {
    /**@zh-cn
     * 元数据的总版本号。
     * -1 表示此属性可竞争读写最后更新者得，
     * 0 表示此属性只有在不存在时才创建，
     * 正整数表示只有版本号匹配时此属性才能被操作成功。
     */
    /**
     * Revision of metadata. It is set to `1` by default.
     * @default -1
     */
    majorRevision?: number;
    /**@zh-cn
     * 分布式锁名称。如果设置，只有获得此锁的用户才有权限进行操作。
     */
    /**
     * Distributed lock name. If set, only the user who has acquired this lock will have permission to perform the operation. It is set to `''` by default.
     * @default ''
     */
    lockName?: string;
    /**@zh-cn
     * 本次操作是否在每个属性中添加服务器时间戳。
     */
    /**
     * Whether this operation adds server timestamp to each attribute. It is set to `false` by default.
     * @default false
     */
    addTimeStamp?: boolean;
    /**@zh-cn
     * 本次操作是否在每个属性中添加编辑者id。
     */
    /**
     * Whether to add editor id to each property in this operation. It is set to `false` by default.
     * @default false
     */
    addUserId?: boolean;
}
interface RemoveUserMetadataOptions extends MetadataOptions {
    /**
     * A user that needs to be specified. If you don't provide, this param default value is yourself.
     */
    userId?: string;
    /**
     * the items user wants to operate, each item must has unique key. If you don't provide this param, default clear all items. The item type please see {@link MetadataItem}.
     */
    data?: MetadataItem[];
}
interface RemoveChannelMetadataOptions extends MetadataOptions {
    /**
     * the items user wants to operate, each item must has unique key. If you don't provide this param, default clear all items. The item type please see {@link MetadataItem}.
     */
    data?: MetadataItem[];
}
interface SetOrUpdateUserMetadataOptions extends MetadataOptions {
    /**
     * A user that needs to be specified. If you don't provide, this param default value is yourself.
     */
    userId?: string;
}
declare class RTMStorage {
    /**@zh-cn
     * 设置频道的元数据项。
     *
     */
    /**
     * set the metadata of a specific channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param data the items user wants to operate, each item must has unique key. The item type please see {@link MetadataItem}.
     * @param options Options for this metadata operation. See {@link MetadataOptions}.
     */
    setChannelMetadata(channelName: string, channelType: ChannelType, data: MetadataItem[], options?: MetadataOptions): Promise<SetChannelMetadataResponse>;
    /**@zh-cn
     * 获取指定频道的元数据项。
     *
     */
    /**
     * get all metadata items of the channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     */
    getChannelMetadata(channelName: string, channelType: ChannelType): Promise<GetChannelMetadataResponse>;
    /**@zh-cn
     * 删除频道的元数据项。
     *
     */
    /**
     * delete metadata items of the channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param options Options for this metadata operation. See {@link RemoveChannelMetadataOptions}.
     */
    removeChannelMetadata(channelName: string, channelType: ChannelType, options?: RemoveChannelMetadataOptions): Promise<RemoveChannelMetadataResponse>;
    /**@zh-cn
     * 更新指定频道的元数据项。
     *
     */
    /**
     * Update metadata items of the channel.
     *
     * @param channelName A channel that needs to be specified.
     * @param channelType channelType for this channel. See {@link ChannelType}
     * @param data the items user wants to operate, each item must has unique key. The item type please see {@link MetadataItem}.
     * @param options Options for this metadata operation. See {@link MetadataOptions}.
     */
    updateChannelMetadata(channelName: string, channelType: ChannelType, data: MetadataItem[], options?: MetadataOptions): Promise<UpdateChannelMetadataResponse>;
    /**@zh-cn
     * 设置指定用户的元数据项。如果用户之前没有属性，则自动创建用户属性。如果用户之前已有属性，将会根据需要设置的每组属性中"name"字段进行检索，如果原本用户属性中有"name"属性组则覆盖，如果没有则追加。
     *
     */
    /**
     * Set a specific user’s metadata. Automatically creates user attributes if the user has no attributes before. If the user has an attribute before, it will be retrieved according to the "name" field in each set of attributes that needs to be set. If there is a "name" attribute group in the original user attribute, it will be overwritten, and if not, it will be appended.
     *
     * @param data the items user wants to operate, each item must has unique key. The item type please see {@link MetadataItem}.
     * @param options Options for this metadata operation. See {@link SetOrUpdateUserMetadataOptions}.
     */
    setUserMetadata(data: MetadataItem[], options?: SetOrUpdateUserMetadataOptions): Promise<SetUserMetadataResponse>;
    /**@zh-cn
     * 获取指定用户的用户元数据项。
     *
     */
    /**
     * Get the user’s metadata of a specified user.
     * @param userId The userId of the user logging in the Agora RTM system.
     */
    getUserMetadata(options?: {
        userId?: string;
    }): Promise<GetUserMetadataResponse>;
    /**@zh-cn
     * 删除指定用户的元数据项。
     *
     */
    /**
     * Delete a specific user’s metadata items.
     *
     * @param options Options for this metadata operation. See {@link RemoveUserMetadataOptions}.
     *
     */
    removeUserMetadata(options?: RemoveUserMetadataOptions): Promise<RemoveUserMetadataResponse>;
    /**@zh-cn
     * 更新指定用户的元数据项。
     *
     */
    /**
     * Update a specific user’s metadata items.
     *
     * @param data the items user wants to operate, each item must has unique key. The item type please see {@link MetadataItem}.
     * @param options Options for this metadata operation. See {@link SetOrUpdateUserMetadataOptions}.
     */
    updateUserMetadata(data: MetadataItem[], options?: SetOrUpdateUserMetadataOptions): Promise<UpdateUserMetadataResponse>;
    /**@zh-cn
     * 订阅特定用户的用户元数据更新事件。
     *
     */
    /**
     * Subscribe to user metadata update events for a specific users.
     * @param userId The userId of the user logging in the Agora RTM system.
     */
    subscribeUserMetadata(userId: string): Promise<SubscribeUserMetaResponse>;
    /**@zh-cn
     * 取消订阅特定用户的用户元数据更新事件。
     *
     */
    /**
     * Unsubscribe to user metadata update events for a specific users.
     * @param userId The userId of the user logging in the Agora RTM system.
     */
    unsubscribeUserMetadata(userId: string): Promise<UnsubscribeUserMetaResponse>;
}

declare namespace RTMEvents {
    interface PublishInfo {
        /**
         * The publisher user ID
         */
        publisherUserId: string;
        /**
         * The metadata of the publisher
         */
        publisherMeta: string;
    }
    interface topicDetail {
        /**
         * The name of the topic
         */
        topicName: string;
        /**
         * The publisher array
         */
        publishers: PublishInfo[];
        /**
         * The count of publisher in current topic
         */
        totalPublisher: number;
    }
    interface UserState {
        /**
         * The user id.
         */
        userId: string;
        /**
         * The user states.
         */
        states: StateDetail;
        statesCount: number;
    }
    interface UserList {
        /**
         * The list of users.
         */
        users: string[];
        /**
         * The number of users.
         */
        userCount: number;
    }
    interface IntervalDetail {
        /**
         * Joined users during this interval
         */
        join: UserList;
        /**
         * Left users during this interval
         */
        leave: UserList;
        /**
         * Timeout users during this interval
         */
        timeout: UserList;
        /**
         * The user state changed during this interval
         */
        userStateList: UserState[];
    }
    interface PresenceEvent {
        eventType: PresenceEventType;
        channelType: ChannelType;
        channelName: string;
        publisher: string;
        stateChanged: StateDetail;
        interval: IntervalDetail | null;
        snapshot: UserState[] | null;
    }
    interface StreamChannelConnectionStatusChangeEvent {
        channelName: string;
        state: ConnectionState$1;
        reason: ConnectionDisconnectedReason | string;
    }
    interface RTMConnectionStatusChangeEvent {
        state: ConnectionState;
        reason: ConnectionChangeReason;
    }
    interface MessageEvent {
        channelType: ChannelType;
        channelName: string;
        topicName: string;
        messageType: 'STRING' | 'BINARY';
        customType: string;
        message: string | Uint8Array;
        publisher: string;
        publishTime?: number;
    }
    interface StorageEvent {
        channelType: ChannelType;
        channelName: string;
        publisher: string;
        storageType: StorageType;
        eventType: StorageEventType;
        data: StorageData;
    }
    interface LockEvent {
        channelType: ChannelType;
        channelName: string;
        eventType: LockEventType;
        lockName: string;
        ttl: number;
        publisher: string;
        snapshot: LockDetail[];
    }
    interface TopicEvent {
        /**
         * Indicate topic event type
         */
        eventType: TopicEventType;
        /**
         * The channel which the topic event was triggered
         */
        channelName: string;
        /**
         * The publisher which the topic event was triggered
         */
        publisher: string;
        /**
         * Topic information array.
         */
        topicInfos: topicDetail[];
        /**
         * The count of topicInfos.
         */
        totalTopics: number;
    }
    interface RTMClientEventMap {
        /** @zh-cn
         * 通知 SDK 与 Agora RTM 系统的连接状态发生了改变。
         * @event
         * @param connectionStatus.newState 新的连接状态
         * @param connectionStatus.reason 状态改变的原因
         */
        /**
         * Occurs when the connection state changes between the SDK and the Agora RTM system.
         * @event
         * @param connectionStatus.newState The new connection state.
         * @param connectionStatus.reason Reasons for the connection state change.
         */
        status: (connectionStatus: RTMConnectionStatusChangeEvent | StreamChannelConnectionStatusChangeEvent) => void;
        presence: (presenceData: PresenceEvent) => void;
        message: (message: MessageEvent) => void;
        storage: (storageData: StorageEvent) => void;
        lock: (lockInfo: LockEvent) => void;
        topic: (topicEvent: TopicEvent) => void;
        /** @zh-cn
         *   当前使用的 RTM Token 登录权限还有 30 秒就会超过签发有效期。
         *
         * - 收到该回调时，请尽快在你的业务服务端生成新的 Token 并调用 {@link RTMClient.renewToken} 方法把新的 Token 传给 Token 验证服务器。
         */
        /**
         * The currently used RTM Token login permission will expire after 30 seconds.
         *
         * - When receiving this callback, generate a new RTM Token on the server and call the {@link RTMClient.renewToken} method to pass the new Token on to the server.
         */
        tokenPrivilegeWillExpire: (chanelName: string) => void;
    }
}

interface StreamChannelOperationResponse extends BaseResponse {
    topicName: string;
}
interface JoinChannelResponse extends BaseResponse {
}
interface LeaveChannelResponse extends JoinChannelResponse {
}
interface JoinTopicResponse extends StreamChannelOperationResponse {
}
interface LeaveTopicResponse extends JoinTopicResponse {
}
interface PublishTopicMessageResponse extends StreamChannelOperationResponse {
}
declare namespace RTMStreamChannelStatusCode {
    const enum SubscribeTopicErrorCode {
        NO_ERROR = 0,
        PARTIALLY_SUCCESSFUL = 1,
        ALL_FAILED = 2,
        UNKNOWN_ERROR = 3,
        INVALID_PARAMS = 4,
        REMOTE_USER_IS_NOT_PUBLISHED = 5,
        INVALID_REMOTE_USER = 6,
        TIMEOUT = 7,
        ALREADY_SUBSCRIBED_USER = 20001,
        SUB_USER_EXCEED_LIMITATION = 20003,
        NOT_SUBSCRIBED_USER = 20004
    }
}
interface SubscribedFailedReason extends StreamChannelOperationResponse {
    /**@zh-cn
     * 订阅/退订 topic 里的用户失败。
     */
    /**
     * Failed to subscribe/unsubscribe users in topic.
     */
    user: string;
    /**@zh-cn
     * 操作对应的错误码。
     */
    /**
     * Error code of the operation. See {@link RTMStreamChannelStatusCode.SubscribeTopicErrorCode}
     */
    errorCode?: RTMStreamChannelStatusCode.SubscribeTopicErrorCode;
    /**@zh-cn
     * 失败原因。
     */
    /**
     * The failure reason.
     */
    reason?: string;
}
interface SubscribeTopicResponse extends StreamChannelOperationResponse {
    /**@zh-cn
     * 订阅成功的用户列表。
     */
    /**
     * List of successfully subscribed users.
     */
    succeedUsers: string[];
    /**@zh-cn
     * 订阅失败的用户列表及错误码。
     */
    /**
     * List of users whose subscription failed and error codes. See {@link SubscribedFailedReason}
     */
    failedUsers: string[];
    failedDetails: SubscribedFailedReason[];
}
interface UnsubscribeTopicResponse extends BaseResponse {
}
interface GetSubscribedUserListResponse extends StreamChannelOperationResponse {
    /**@zh-cn
     * 已经订阅的用户列表。
     */
    /**
     * List of subscribed users.
     */
    subscribed: string[];
}
declare class RTMStreamChannel {
    readonly channelName: string;
    /**@zh-cn
     * 加入此频道。
     * @param token 登入 rtc 的 token。若未开启 token 功能则需要设置为 null。
     * @param options.withLock 可选参数，是否同时订阅分布式锁更新事件。默认值为 false。
     * @param options.withMetadata 可选参数，是否同时订阅频道属性。 默认值为 false。
     * @param options.withPresence 可选参数，是否同时订阅频道出席事件。 默认值为 true。
     */
    /**
     * Join this channel.
     * @param token Login token of rtc. If the token function is not enabled, it needs to be set to null.
     * @param options.withLock Optional parameter, whether to subscribe to the distributed lock update event at the same time. The default value is false. @default false
     * @param options.withMetadata Optional parameter, whether to subscribe to channel properties at the same time. The default value is false. @default false
     * @param options.withPresence Optional parameter, whether to subscribe to channel presence event at the same time. The default value is true. @default true
     */
    join(options?: {
        token?: string;
        withPresence?: boolean;
        withMetadata?: boolean;
        withLock?: boolean;
    }): Promise<JoinChannelResponse>;
    /**@zh-cn
     * 离开此频道
     */
    /**
     * Leave this channel.
     */
    leave(): Promise<LeaveChannelResponse>;
    /**@zh-cn
     * 加入指定 topic。
     * @param topicName 要加入的 topic 名称。
     */
    /**
     * Join a specific topic.
     * @param topicName The topic name to join.
     * @param options.meta @default ''
     */
    joinTopic(topicName: string, options?: {
        meta?: any;
    }): Promise<JoinTopicResponse>;
    /**@zh-cn
     * 在指定 topic 内发消息。
     * @param topicName 指定的 topic 名称。
     * @param message 要发送的消息，支持文本消息和二进制消息。
     */
    /**
     * Send a message in the specified topic.
     * @param topicName The specified topic name.
     * @param message The message to send, supports text messages and binary messages.
     */
    publishTopicMessage(topicName: string, message: string | Uint8Array, options?: {
        /**@zh-cn
         * 自定义消息负载结构
         */
        /**
         * type of message payload
         */
        customType?: string;
    }): Promise<PublishTopicMessageResponse>;
    /**@zh-cn
     * 离开指定 topic 。
     */
    /**
     * Leave a specified topic.
     * @param topicName The topic name to leave.
     */
    leaveTopic(topicName: string): Promise<LeaveTopicResponse>;
    /**@zh-cn
     * 订阅指定 topic 内的用户。
     * @param options.users users 为空时，默认订阅这个 topic 所有 user，当列表超出 64 人，随机订阅 64 人。
     */
    /**
     * Subscribe users in the specified topic.
     * @param options.users When users is empty, all users of this topic will be subscribed by default. When the list exceeds 64 users, 64 users will be randomly subscribed.
     */
    subscribeTopic(topicName: string, options?: {
        users?: string[];
    }): Promise<SubscribeTopicResponse>;
    /**@zh-cn
     * 退订指定 topic 内的用户。
     * @param options.users users 为空时，默认取消订阅这个 topic 所有 user。
     */
    /**
     * Unsubscribe users in the specified topic.
     * @param options.users When users is empty, all users of this topic will be unsubscribed by default.
     */
    unsubscribeTopic(topicName: string, options?: {
        users?: string[];
    }): Promise<UnsubscribeTopicResponse>;
    /**@zh-cn
     * 获取订阅了频道内指定 topic 下的哪些用户 。
     */
    /**
     * Get which users under the specified topic in the channel are subscribed..
     * @param topicName The specified topic name.
     */
    getSubscribedUserList(topicName: string): GetSubscribedUserListResponse;
}

interface SubscribeOptions {
    /**@zh-cn
     * 可选参数，是否订阅频道消息。默认值为 true。
     */
    /**
     * Optional parameter, whether to subscribe to channel messages. The default value is true. @default true
     */
    withMessage?: boolean;
    /**@zh-cn
     * 可选参数，是否同时订阅频道出席事件。 默认值为 true
     */
    /**
     * Optional parameter, whether to subscribe to channel presence event at the same time. The default value is true. @default true
     */
    withPresence?: boolean;
    /**@zh-cn
     * 可选参数，是否同时订阅频道属性。 默认值为 false
     */
    /**
     * Optional parameter, whether to subscribe to channel properties at the same time. The default value is false. @default false
     */
    withMetadata?: boolean;
    /**@zh-cn
     * 可选参数，是否同时订阅分布式锁更新事件。默认值为 false
     */
    /**
     * Optional parameter, whether to subscribe to the distributed lock update event at the same time. The default value is false. @default false
     */
    withLock?: boolean;
}
interface RTMConfig {
    /**@zh-cn
     * 可选的动态密钥，一般由客户的服务端获取。
     */
    /**
     * An optional token generated by the app server.
     */
    token?: string;
    /**@zh-cn
     * 可选参数，消息加密方式，若不设置或设置为 ConstantsType.EncryptionMode.NONE ，则表示不启用加密功能。
     */
    /**
     * Optional parameter, message encryption mode, if not set or set to ConstantsType.EncryptionMode.NONE , it means that the encryption function is not enabled. The default value is ConstantsType.EncryptionMode.NONE. @default ConstantsType.EncryptionMode.NONE See {@link ConstantsType.EncryptionMode}
     */
    encryptionMode?: EncryptionMode;
    /**@zh-cn
     * 可选参数，加密需要用到的 salt，必须为 32 字节的二进制数组。若启用了加密功能，此参数必须提供。
     */
    /**
     * Optional parameter, the salt required for encryption, must be a 32-byte binary array. If encryption is enabled, this parameter must be provided.
     */
    salt?: Uint8Array;
    /**@zh-cn
     * 可选参数，加解密需要用到的密钥。若启用了加密功能，此参数必须提供。
     */
    /**
     * Optional parameter, the key needed for encryption and decryption. If encryption is enabled, this parameter must be provided.
     */
    cipherKey?: string;
    presenceTimeout?: number;
    /** @zh-cn
     * 是否上传日志。默认关闭。
     * - `true`: 启用日志上传；
     * - `false`: （默认）关闭日志上传。
     */
    /**
     * Whether to enable log upload. It is set to `false` by default.
     * - `true`: Enable log upload,
     * - `false`: (Default) Disable log upload.
     */
    logUpload?: boolean;
    /**
     * Whether to enable cloud proxy.
     */
    cloudProxy?: boolean;
    /**
     * Whether using string uid, if you set false, it translated to a number.
     */
    useStringUserId?: boolean;
    /** @zh-cn
     * 日志输出等级。
     *
     * 设置 SDK 的输出日志输出等级。不同的输出等级可以单独或组合使用。日志级别顺序依次为 NONE、ERROR、WARN、INFO 和 DEBUG。选择一个级别，你就可以看到在该级别之前所有级别的日志信息。例如，你选择 WARNING 级别，就可以看到在 ERROR 和 WARNING 级别上的所有日志信息。
     *
     */
    /**
     * Output log level of the SDK.
     *
     * You can use one or a combination of the filters. The log level follows the sequence of NONE, ERROR, WARN, INFO and DEBUG. Choose a level to see the logs preceding that level. If, for example, you set the log level to WARNING, you see the logs within levels ERROR and WARNING.
     *
     */
    logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'none';
}
interface RTMOperationResponse extends BaseResponse {
    channelName: string;
}
interface SubscribeResponse extends RTMOperationResponse {
}
interface UnsubscribeResponse extends RTMOperationResponse {
}
interface LoginResponse extends BaseResponse {
}
interface LogoutResponse extends BaseResponse {
}
interface PublishResponse extends RTMOperationResponse {
}
interface RenewTokenResponse extends BaseResponse {
}
interface UpdateConfigResponse extends BaseResponse {
}
declare class RTMClient extends EventBase<RTMEvents.RTMClientEventMap> {
    constructor(
    /**@zh-cn
     * 传入项目的 App ID。必须是 ASCII 编码，长度为 32 个字符。
     */
    /**
     * Pass in the project's App ID. Must be ASCII encoded and 32 characters long.
     */
    appId: string, 
    /**@zh-cn
     * 登录 Agora RTM 系统的用户 ID。该字符串不可超过 64 字节。以下为支持的字符集范围:<ul>
     * <li>26 个小写英文字母 a-z</li>
     * <li>26 个大写英文字母 A-Z</li>
     * <li>10 个数字 0-9</li>
     * <li>空格</li>
     * <li>"!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","</li>
     * </ul>
     * <p><b>Note</b></p><ul>
     * <li>请不要将 uid 设为空、null，或字符串 "null"。</li>
     * <li>uid 不支持 <code>number</code> 类型。建议调用 <code>toString()</code> 方法转化非 string 型 uid。</li>
     * </ul>
     */
    /**
     * The uid of the user logging in the Agora RTM system. The string length must be less than 64 bytes with the following character scope:<ul>
     * <li>All lowercase English letters: a to z</li>
     * <li>All uppercase English letters: A to Z</li>
     * <li>All numeric characters: 0 to 9</li>
     * <li>The space character.</li>
     * <li>Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","</li>
     * </ul>
     * <p><b>Note</b></p><ul>
     * <li>The uid cannot be empty, or set as null or "null".</li>
     * <li>We do not support uids of the <code>number</code> type and recommend using the <code>toString()</code> method to convert your non-string uid.</li>
     * </ul>
     */
    userId: string, 
    /**@zh-cn
     * 可选参数。
     */
    /**
     * Optional parameter. See {@link RTMConfig}
     */
    rtmConfig?: RTMConfig);
    readonly appId: string;
    readonly cipherKey?: string;
    readonly logUpload?: boolean;
    readonly userId: string;
    readonly ssl?: boolean;
    readonly presenceTimeout?: number;
    presence: RTMPresence;
    /**@zh-cn
     * storage 实例，用于操作频道或用户属性。
     */
    /**
     * storage instance for manipulating channel or user properties. See {@link RTMStorage}
     */
    storage: RTMStorage;
    /**@zh-cn
     * lock 实例，用于操作频道的分布式锁。
     */
    /**
     * lock instance, used to operate the channel's distributed lock. See {@link RTMLock}
     */
    lock: RTMLock;
    /** @zh-cn
     * 用户登录 Agora RTM 系统。
     * @note 在 RTM 和 RTC 结合使用的场景下，Agora 推荐你错时进行登录 RTM 系统和加入 RTC 频道的操作。
     * @note 如果用户在不同的 RtmClient 实例中以相同用户 ID 登录，之前的登录将会失效，用户会被踢出之前加入的频道。
     * @return 该 Promise 会在登录成功后 resolve。
     */
    /**
     * Logs in to the Agora RTM system.
     *
     * @note If you use the Agora RTM SDK together with the Agora RTC SDK, Agora recommends that you avoid logging in to the RTM system and joining the RTC channel at the same time.
     * @note If the user logs in with the same uid from a different instance, the user will be kicked out of your previous login and removed from previously joined channels.
     * @return The Promise resolves after the user logs in to the Agora RTM system successfully.
     */
    login(): Promise<LoginResponse>;
    /** @zh-cn
     * 退出登录，退出后自动断开连接和销毁回调监听。
     * @return 该 Promise 会在登出成功并断开 WebSocket 连接后 resolve。
     */
    /**
     * Allows a user to log out of the Agora RTM system.
     *
     * After the user logs out of the Agora RTM system, the SDK disconnects from the Agora RTM system and destroys the corresponding event listener.
     * @return The Promises resolves after the user logs out of the Agora RTM system and disconnects from WebSocket.
     */
    logout(): Promise<LogoutResponse>;
    /** @zh-cn
     * 向指定频道发送消息，支持文本消息与二进制消息。
     * @param channelName 指定的频道名
     * @param message 要发送的消息内容
     */
    /**
     * Send a message to a specified channel, supporting text messages and binary messages.
     * @param channelName Name of specific channel.
     * @param message Message you wants to send.
     */
    publish(channelName: string, message: string | Uint8Array, options?: {
        /**@zh-cn
         * 自定义消息负载结构
         */
        /**
         * type of message payload
         */
        customType?: string;
    }): Promise<PublishResponse>;
    /** @zh-cn
     * 调用该方法订阅指定频道，订阅频道成功后可收到该频道消息，频道属性更新，锁事件。
     *
     * 你最多可以订阅 100 个频道。
     * @return 该 Promise 会在订阅频道成功后 resolve。
     */
    /**
     * Call this method to subscribe to the specified channel. After successfully subscribing to the channel, you can receive the channel message, channel attribute update, and lock event.
     *
     * You can subscribe a maximum of 100 channels.
     * @return The Promise resolves after the user successfully subscribes the channel.
     */
    subscribe(channelName: string, options?: SubscribeOptions): Promise<SubscribeResponse>;
    /** @zh-cn
     * 调用该方法退订指定频道，包括退订频道属性，用户属性，锁更新事件。
     * @return 该 Promise 会在退订频道成功后 resolve。
     */
    /**
     * Adjust to use this method to unsubscribe from the specified channel, including unsubscribe channel attributes, user attributes, and lock update events.
     * @param channelName Name of a specific channel.
     * @return The Promise resolves after the user successfully unsubscribes the channel.
     */
    unsubscribe(channelName: string): Promise<UnsubscribeResponse>;
    /** @zh-cn
     * 该方法创建一个 {@link RTMStreamChannel} 实例。
     * @param channelName 频道名称。该字符串不可超过 64 字节。以下为支持的字符集范围:<ul>
     * <li>26 个小写英文字母 a-z</li>
     * <li>26 个大写英文字母 A-Z</li>
     * <li>10 个数字 0-9</li>
     * <li>空格</li>
     * <li>"!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","</li>
     * </ul>
     * <p><b>Note:</b></p><ul>
     * <li>请不要将 channelName 设为空、null，或字符串 "null"。</li></ul>
     * @return 一个 {@link RTMStreamChannel} 实例。
     */
    /**
     * Creates an {@link channelName} instance.
     * @param channelName The unique channel name of the Agora RTM stream channel. The string length must be less than 64 bytes with the following character scope:<ul>
     * <li>All lowercase English letters: a to z</li>
     * <li>All uppercase English letters: A to Z</li>
     * <li>All numeric characters: 0 to 9</li>
     * <li>The space character.</li>
     * <li>Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","</li>
     * </ul>
     * <p><b>Note:</b></p><ul>
     * <li>The channelName cannot be empty, null, or "null".</li></ul>
     * @return An {@link RTMStreamChannel} instance.
     */
    createStreamChannel(channelName: string): RTMStreamChannel;
    /** @zh-cn
     * 更新当前 Token。
     *
     * @param token 新的 Token。
     */
    /**
     * Renews the token.
     *
     * @param token Your new Token.
     */
    renewToken(token: string, options?: {
        channelName?: string;
    }): Promise<RenewTokenResponse>;
    /** @zh-cn
     * 修改 `RtmClient` 实例配置。修改实时生效。
     *
     * @param config 设置 SDK 是否上传日志以及日志的输出等级。
     */
    /**
     * Modifies the `RtmClient` instance configuration. The changes take effect immediately.
     *
     * @param config Sets whether the SDK uploads logs, and sets the output level of logs.
     */
    updateConfig(config: Pick<RTMConfig, 'logLevel' | 'logUpload' | 'cloudProxy'>): Promise<UpdateConfigResponse>;
    /** @zh-cn
     * 在 RTM 实例上添加 `listener` 函数到名为 `eventName` 的事件。其他 `RTMClient` 实例上的事件方法请参考 [`EventEmitter` API 文档](https://nodejs.org/docs/latest/api/events.html#events_class_eventemitter)。
     * @param eventName RTM 客户端事件的名称。事件列表请参考 {@link RTMEvents.RTMClientEventMap} 中的属性名。
     * @param listener 事件的回调函数。
     */
    /**
     * Adds the `listener` function to the RTM instance for the event named `eventName`. See [the `EventEmitter` API documentation](https://nodejs.org/docs/latest/api/events.html#events_class_eventemitter) for other event methods on the `RTMClient` instance.
     * @param eventName The name of the RTM client event. See the property names in the {@link RTMEvents.RTMClientEventMap} for the list of events.
     * @param listener The callback function of the RTM client event.
     */
    addEventListener<EventName extends keyof RTMEvents.RTMClientEventMap>(eventName: EventName, listener: RTMEvents.RTMClientEventMap[EventName]): void;
    /** @zh-cn
     * 删除 RTM 实例上 `eventName` 事件上注册的 `listener` 函数。其他 `RTMClient` 实例上的事件方法请参考 [`EventEmitter` API 文档](https://nodejs.org/docs/latest/api/events.html#events_class_eventemitter)。
     * @param eventName RTM 客户端事件的名称。事件列表请参考 {@link RTMEvents.RTMClientEventMap} 中的属性名。
     * @param listener 事件的回调函数。
     */
    /**
     * Deletes the `listener` function on the RTM instance for the event named `eventName`. See [the `EventEmitter` API documentation](https://nodejs.org/docs/latest/api/events.html#events_class_eventemitter) for other event methods on the `RTMClient` instance.
     * @param eventName The name of the RTM client event. See the property names in the {@link RTMEvents.RTMClientEventMap} for the list of events.
     * @param listener The callback function of the RTM client event.
     */
    removeEventListener<EventName extends keyof RTMEvents.RTMClientEventMap>(eventName: EventName, listener: RTMEvents.RTMClientEventMap[EventName]): void;
}
interface ErrorInfo {
    error: boolean;
    reason: string;
    operation: string;
    errorCode: number;
}

declare class StreamChannel extends EventBase implements RTMStreamChannel {
    readonly channelName: string;
    join(options?: {
        token?: string;
        withPresence?: boolean;
        withMetadata?: boolean;
        withLock?: boolean;
    }): Promise<JoinChannelResponse>;
    renewStreamChannelToken(token: string): Promise<void>;
    leave(): Promise<LeaveChannelResponse>;
    joinTopic(topicName: string, options?: {
        meta?: any;
        qos?: boolean;
    }): Promise<JoinTopicResponse>;
    publishTopicMessage(topicName: string, message: string | Uint8Array, options?: {
        customType?: string;
    }): Promise<PublishTopicMessageResponse>;
    leaveTopic(topicName: string): Promise<LeaveTopicResponse>;
    subscribeTopic(topicName: string, options?: {
        users?: string[];
    }): Promise<SubscribeTopicResponse>;
    unsubscribeTopic(topicName: string, options?: {
        users?: string[];
    }): Promise<UnsubscribeTopicResponse>;
    getSubscribedUserList(topicName: string): GetSubscribedUserListResponse;
}
declare function setRTCParameter(key: string, value: any): void;

declare class Presence extends EventBase implements RTMPresence {
    whoNow(channelName: string, channelType: ChannelType, options?: WhoNowOptions): Promise<WhoNowResponse>;
    getOnlineUsers(channelName: string, channelType: ChannelType, options?: GetOnlineUsersOptions): Promise<getOnlineUsersResponse>;
    whereNow(userId: string): Promise<WhereNowResponse>;
    getUserChannels(userId: string): Promise<GetUserChannelsResponse>;
    setState(channelName: string, channelType: ChannelType, state: StateDetail): Promise<SetStateResponse>;
    getState(userId: string, channelName: string, channelType: ChannelType): Promise<GetStateResponse>;
    removeState(channelName: string, channelType: ChannelType, options?: {
        states?: string[];
    }): Promise<RemoveStateResponse>;
}

declare class Lock extends EventBase implements RTMLock {
    setLock(channelName: string, channelType: ChannelType, lockName: string, options?: {
        ttl?: number;
    }): Promise<SetLockResponse>;
    removeLock(channelName: string, channelType: ChannelType, lockName: string): Promise<RemoveLockResponse>;
    acquireLock(channelName: string, channelType: ChannelType, lockName: string, options?: {
        retry?: boolean;
    }): Promise<AcquireLockResponse>;
    releaseLock(channelName: string, channelType: ChannelType, lockName: string): Promise<ReleaseLockResponse>;
    revokeLock(channelName: string, channelType: ChannelType, lockName: string, owner: string): Promise<RevokeLockResponse>;
    getLock(channelName: string, channelType: ChannelType): Promise<GetLockResponse>;
}

declare class Storage extends EventBase implements RTMStorage {
    setChannelMetadata(channelName: string, channelType: ChannelType, data: MetadataItem[], options?: MetadataOptions): Promise<SetChannelMetadataResponse>;
    getChannelMetadata(channelName: string, channelType: ChannelType): Promise<GetChannelMetadataResponse>;
    removeChannelMetadata(channelName: string, channelType: ChannelType, options?: RemoveChannelMetadataOptions): Promise<RemoveChannelMetadataResponse>;
    updateChannelMetadata(channelName: string, channelType: ChannelType, data: MetadataItem[], options?: MetadataOptions): Promise<UpdateChannelMetadataResponse>;
    setUserMetadata(data: MetadataItem[], options?: SetOrUpdateUserMetadataOptions): Promise<SetUserMetadataResponse>;
    getUserMetadata(options?: {
        userId?: string;
    }): Promise<GetUserMetadataResponse>;
    removeUserMetadata(options?: RemoveUserMetadataOptions): Promise<RemoveUserMetadataResponse>;
    updateUserMetadata(data: MetadataItem[], options?: SetOrUpdateUserMetadataOptions): Promise<UpdateUserMetadataResponse>;
    subscribeUserMetadata(userId: string): Promise<SubscribeUserMetaResponse>;
    unsubscribeUserMetadata(userId: string): Promise<UnsubscribeUserMetaResponse>;
}

declare class RTM extends EventBase<RTMEvents.RTMClientEventMap> implements RTMClient {
    readonly userId: string;
    readonly appId: string;
    private stChannelInstances;
    readonly cipherKey: string | undefined;
    readonly cloudProxy?: boolean | undefined;
    readonly presenceTimeout: number;
    presence: Presence;
    storage: Storage;
    lock: Lock;
    readonly encryptionMode: EncryptionMode | undefined;
    readonly salt: Uint8Array | undefined;
    readonly initEncryption: boolean;
    readonly useStringUserId: boolean;
    connectionState: ConnectionState;
    syncConnectionState: ConnectionState;
    firstSubscribeUser: Set<string>;
    firstSubscribeChannel: Set<string>;
    constructor(appId: string, userId: string, rtmConfig?: RTMConfig);
    renewToken(token: string, options?: {
        channelName?: string;
    }): Promise<RenewTokenResponse>;
    updateConfig(params: Pick<RTMConfig, 'cloudProxy' | 'logUpload' | 'logLevel'>): Promise<UpdateConfigResponse>;
    login(): Promise<LoginResponse>;
    logout(): Promise<LogoutResponse>;
    publish(channelName: string, message: string | Uint8Array, options?: {
        customType?: string;
    }): Promise<PublishResponse>;
    subscribe(channelName: string, options?: SubscribeOptions): Promise<SubscribeResponse>;
    unsubscribe(channelName: string): Promise<UnsubscribeResponse>;
    createStreamChannel(channelName: string): StreamChannel;
    addEventListener<EventName extends keyof RTMEvents.RTMClientEventMap>(eventName: EventName, listener: RTMEvents.RTMClientEventMap[EventName]): void;
    removeEventListener<EventName extends keyof RTMEvents.RTMClientEventMap>(eventName: EventName, listener: RTMEvents.RTMClientEventMap[EventName]): void;
    private checkVid;
}

declare interface IAgoraRTM {
    /** @zh-cn
     * Agora RTM SDK 的编译信息。
     */
    /**
     * Compilation information of the Agora RTM SDK.
     * @example `AgoraRTM.BUILD`
     */
    BUILD: string;
    RTM: typeof RTMClient;
    /** @zh-cn
     * Agora RTM SDK 的版本号。
     */
    /**
     * Version of the Agora RTM SDK.
     * @example `AgoraRTM.VERSION`
     */
    VERSION: string;
    processId: string;
    setArea({ areaCodes, excludedArea, }: {
        areaCodes: AreaCode[];
        excludedArea?: AreaCode;
    }): void;
    constantsType: typeof ConstantsType;
}

declare const _default: {
    BUILD: string;
    VERSION: string;
    processId: string;
    RTM: typeof RTM;
    getParameter: (key: any) => any;
    setArea: typeof setArea;
    setParameter: (key: any, value: any) => void;
    setRTCParameter: typeof setRTCParameter;
    constantsType: typeof ConstantsType;
};

export default _default;
export { ChannelType, ConstantsType, ErrorInfo, GetChannelMetadataResponse, GetLockResponse, GetStateResponse, GetSubscribedUserListResponse, GetUserMetadataResponse, IAgoraRTM, LoginResponse, LogoutResponse, MetadataItem, MetadataOptions, RTMClient, RTMConfig, RTMEvents, RTMLock, RTMPresence, RTMStorage, RTMStreamChannel, RTMStreamChannelStatusCode, StateDetail, WhereNowResponse, WhoNowOptions, WhoNowResponse };
