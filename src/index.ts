import axios, { AxiosError } from 'axios';

const config = {
  BASE_URL: 'http://localhost:3000',
  log: false,
};

const URLS = {
  REGISTER: (baseUrl: string) => `${baseUrl}/v1/auth/register`,
  LOGIN: (baseUrl: string) => `${baseUrl}/v1/auth/login`,
  CREATE_ORGANIZATION: (baseUrl: string) => `${baseUrl}/v1/organizations`,
  ME: (baseUrl: string) => `${baseUrl}/v1/users/me`,
  SWITCH_ORGANIZATION: (baseUrl: string, userId: string) =>
    `${baseUrl}/v1/auth/organizations/${userId}/switch`,
  SEND_INVITE: (baseUrl: string) => `${baseUrl}/v1/invites`,
  ORGANIZATION_MEMBERS: (baseUrl: string) =>
    `${baseUrl}/v1/organizations/members`,
  ACCEPT_INVITE: (baseUrl: string, invitationid: string) =>
    `${baseUrl}/v1/invites/${invitationid}/accept`,
};

function isRequired(key: string) {
  throw new Error(`${key} is required but not provided!`);
}

// export async function getMeInfo(token: string) {
//     // getting user data
//     let meUrl = URLS.ME(config.BASE_URL);
//     let meResponse = await axios.get(meUrl, {
//         headers: {
//             Authorization: token
//         }
//     });
//     let meData = meResponse.data;
//     if(meResponse.status !== 200)
//         throw new Error(meData.message);

//     return meData.data;
// }

async function sendInvite(
  token: string,
  user: UserInfo
): Promise<{ success: boolean }> {
  let url = URLS.SEND_INVITE(config.BASE_URL);
  let response = await axios.post(
    url,
    { email: user.email, role: user.role || 'member' },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  let inviteInfo = response.data;
  return inviteInfo.data;
}

async function getMembers(token: string) {
  let url = URLS.ORGANIZATION_MEMBERS(config.BASE_URL);
  let response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  let membersInfo = response.data;
  if (response.status !== 200) throw new Error(membersInfo.message);

  return membersInfo.data;
}

async function acceptInvite(token: string, inviteId: string) {
  let url = URLS.ACCEPT_INVITE(config.BASE_URL, inviteId);
  let response = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  let acceptInfo = response.data;
  return acceptInfo.data;
}

async function registerUser(user: RegisterUserInfo) {
  let RegisterURL = URLS.REGISTER(config.BASE_URL);
  let userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  };
  let registerResponse = await axios.post(RegisterURL, userData);
  let registerData = registerResponse.data;
  return registerData.data;
}

export async function addUser(admin: AdminInfo, user: UserInviteInfo) {
  try {
    let adminInfo = await login(admin.email, admin.password);
    let token = `Bearer ${adminInfo.token}`;
    if (config.log) console.log(`🚑 Sending Invitation...`);
    let inviteInfo = await sendInvite(token, user);
    if (inviteInfo && inviteInfo.success) {
      if (config.log) console.log(`🌱 Invitation sent, Getting members`);
      let members: MemberInfo[] = await getMembers(token);
      let invitedMember = members.find(
        (member) =>
          member.invite &&
          member.invite.email === user.email &&
          member.memberStatus === 'invited'
      );
      if (config.log) console.log(`💥 Registering User`);
      let registerInfo = await registerUser(user);
      if (registerInfo.token) {
        if (config.log) console.log(`🚀 User Registered`);
        token = `Bearer ${registerInfo.token}`;
        if (invitedMember) {
          if (config.log)
            console.log(`✨ Member Found, accepting invitation...`);
          await acceptInvite(token, invitedMember.invite.token);
          if (config.log)
            console.log(`✅ Accepted invitation, user is ready to go...`);
        }
      }
    }
    return 'User Added';
  } catch (error) {
    if (
      (error as AxiosError).response &&
      (error as AxiosError).response?.data
    ) {
      throw new Error(
        ((error as AxiosError).response?.data as ErrorResponseType).message
      );
    } else throw new Error((error as Error).message);
  }
}

export async function login(
  email: string | void = isRequired('Email'),
  password: string | void = isRequired('Password')
): Promise<{ token: string }> {
  let url = URLS.LOGIN(config.BASE_URL);
  let response = await axios.post(url, { email, password });
  let loginData = response.data;
  if (response.status !== 201) throw new Error(loginData.message);

  return loginData.data;
}

export function setConfig(baseUrl?: string, log?: boolean) {
  if (baseUrl) config.BASE_URL = baseUrl;
  if (log) config.log = log;
}
