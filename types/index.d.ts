declare module '@knovator/novu-connector' {
    export declare function addUser(admin: AdminInfo, user: UserInviteInfo): Promise<string>;
    export declare function login(email?: string | void, password?: string | void): Promise<{
        token: string;
        user: User;
    }>;
    export declare function setConfig(baseUrl?: string, log?: boolean): void;    
}
interface User {
    _id: string
    id: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
}
interface AdminInfo {
    email: string
    password: string
}
type role = 'member' | 'admin';
interface UserInfo {
    email: string
    role: role
}
interface UserInviteInfo {
    email: string
    password: string
    firstName: string
    lastName: string
    role: role
}
interface RegisterUserInfo {
    firstName: string
    lastName: string
    email: string
    password: string
}
interface InviteInfo {
    token: string
    _inviterId: string
    email: string
    invitationDate: string
    answerDate: string
}
type MemberStatus = 'active' | 'invited'
interface MemberInfo {
    roles: role[],
    _id: string
    _userId: string
    memberStatus: MemberStatus
    _organizationId: string
    createdAt: string
    updatedAt: string
    _userId: string
    id: string
    user: User
    invite: InviteInfo
}
interface ErrorResponseType {
    statusCode: number
    message: string
}