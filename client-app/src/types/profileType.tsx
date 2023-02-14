export type ProfileResponseType = {
    user: any,
    name: string,
    profession: string,
    aboutMe: string,
    characteristic: string[],
    education: any,
    experiences: any,
    interests: any,
    sourcesKnowledge: any,
    skills: any,
    knowledge: any,
    messages: any,
    contacts: any,
    social: any,
    cv: any
};

export type ProfileStateType = {
    profile: ProfileResponseType | any,
    errors: any,
    isLoading: boolean,
};
