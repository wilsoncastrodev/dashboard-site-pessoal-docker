import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../stores/store";
import { getProfileById } from "../../stores/features/profileSlice";

const ProfilePage: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const profile = useAppSelector((state: RootState) => state.profile.profile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfileById(user.profile._id));
    }, []);

    return (
        <div>Página de Profile</div>
    )
};

export default ProfilePage;
