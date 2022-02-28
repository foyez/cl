import { useSelector } from "react-redux";
import { RootState } from "store";

const selectMemberState = (state: RootState) => state.member;

export const useMember = () => useSelector(selectMemberState);
